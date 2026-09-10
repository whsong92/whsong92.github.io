import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.resolve(process.cwd(), "src/content/posts");
const OUTPUT_DIR = path.resolve(process.cwd(), "public/data");
const LISTS_DIR = path.resolve(OUTPUT_DIR, "lists");
const POSTS_OUTPUT_DIR = path.resolve(OUTPUT_DIR, "posts");

export type Category = "learning" | "ai" | "etc";
const CATEGORIES: Category[] = ["learning", "ai", "etc"];

export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    category: Category;
    subject: string;
    subjectId: string;
    description?: string;
}

export interface CategoryPayload {
    category: Category;
    total: number;
    bySubject: Record<string, PostMeta[]>;
    posts: PostMeta[];
}

export interface PostDetail extends PostMeta {
    content: string;
    prevPost?: { slug: string; title: string } | null;
    nextPost?: { slug: string; title: string } | null;
}

interface RawPostItem extends PostMeta {
    rawDate: number;
    fileCreatedAt: number;
    content: string;
}

async function generatePosts() {
    console.log("⚡ [GENERATE-POSTS] Scanning categorized posts and building JSON payloads...");

    [OUTPUT_DIR, LISTS_DIR, POSTS_OUTPUT_DIR].forEach((dir) => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });

    const allPosts: RawPostItem[] = [];

    function processFile(filePath: string, category: Category, defaultSubject: string, filename: string) {
        const rawContent = fs.readFileSync(filePath, "utf-8");
        const fileStat = fs.statSync(filePath);
        const { data, content } = matter(rawContent);
        const slug = filename.replace(/\.md$/, "");

        // 파일 생성 시간(birthtimeMs), OS에 따라 미지원 시 mtimeMs로 fallback
        const fileCreatedAt = fileStat.birthtimeMs > 0 ? fileStat.birthtimeMs : fileStat.mtimeMs;

        // frontmatter의 date가 유효하면 타임스탬프로, 없으면 파일 생성 시간 기준
        const rawDate = data.date ? new Date(data.date).getTime() : fileCreatedAt;
        const formattedDate = data.date ? String(data.date) : new Date(fileCreatedAt).toISOString().slice(0, 10);

        allPosts.push({
            slug,
            title: data.title || slug,
            date: formattedDate,
            category,
            subject: data.subject || defaultSubject.toUpperCase(),
            subjectId: defaultSubject.toLowerCase(),
            description: data.description || "",
            rawDate: isNaN(rawDate) ? fileCreatedAt : rawDate,
            fileCreatedAt,
            content: content.trim(),
        });
    }

    // 1. 카테고리 디렉토리 순회
    for (const cat of CATEGORIES) {
        const catDir = path.join(POSTS_DIR, cat);
        if (!fs.existsSync(catDir)) {
            fs.mkdirSync(catDir, { recursive: true });
            continue;
        }

        const entries = fs.readdirSync(catDir, { withFileTypes: true });

        for (const entry of entries) {
            if (entry.isDirectory()) {
                // category/subject/*.md 구조
                const subjectDirName = entry.name;
                const subjectPath = path.join(catDir, subjectDirName);
                const mdFiles = fs.readdirSync(subjectPath).filter((f) => f.endsWith(".md"));

                for (const filename of mdFiles) {
                    const filePath = path.join(subjectPath, filename);
                    processFile(filePath, cat, subjectDirName, filename);
                }
            } else if (entry.isFile() && entry.name.endsWith(".md")) {
                // category/*.md fallback 구조
                const filePath = path.join(catDir, entry.name);
                processFile(filePath, cat, "General", entry.name);
            }
        }
    }

    // 2. 다단계 정렬: 1차 Frontmatter 날짜 -> 2차 파일 생성 시간 -> 3차 slug
    allPosts.sort((a, b) => {
        if (b.rawDate !== a.rawDate) {
            return b.rawDate - a.rawDate;
        }
        if (b.fileCreatedAt !== a.fileCreatedAt) {
            return b.fileCreatedAt - a.fileCreatedAt;
        }
        return b.slug.localeCompare(a.slug);
    });

    // 3. 인덱스 목록 초기화
    const payloads: Record<Category, CategoryPayload> = {
        learning: { category: "learning", total: 0, bySubject: {}, posts: [] },
        ai: { category: "ai", total: 0, bySubject: {}, posts: [] },
        etc: { category: "etc", total: 0, bySubject: {}, posts: [] },
    };

    const allMetaList: PostMeta[] = [];

    for (const post of allPosts) {
        const { rawDate, fileCreatedAt, content, ...meta } = post;
        allMetaList.push(meta);

        const catTarget = payloads[meta.category];
        catTarget.total += 1;
        catTarget.posts.push(meta);

        if (!catTarget.bySubject[meta.subject]) {
            catTarget.bySubject[meta.subject] = [];
        }
        catTarget.bySubject[meta.subject].push(meta);
    }

    // 4. JSON 파일 쓰기 (all.json 및 3종 카테고리)
    fs.writeFileSync(path.join(LISTS_DIR, "all.json"), JSON.stringify(allMetaList, null, 2), "utf-8");
    CATEGORIES.forEach((cat) => {
        fs.writeFileSync(path.join(LISTS_DIR, `${cat}.json`), JSON.stringify(payloads[cat], null, 2), "utf-8");
    });

    // 5. 개별 포스트 On-demand payload 생성 (카테고리 내 이전글/다음글 연동)
    allPosts.forEach((post) => {
        const sameCatPosts = allPosts.filter((p) => p.category === post.category);
        const idx = sameCatPosts.findIndex((p) => p.slug === post.slug);

        const prevPost = sameCatPosts[idx + 1] ? { slug: sameCatPosts[idx + 1].slug, title: sameCatPosts[idx + 1].title } : null;
        const nextPost = sameCatPosts[idx - 1] ? { slug: sameCatPosts[idx - 1].slug, title: sameCatPosts[idx - 1].title } : null;

        const detail: PostDetail = {
            slug: post.slug,
            title: post.title,
            date: post.date,
            category: post.category,
            subject: post.subject,
            subjectId: post.subjectId,
            description: post.description,
            content: post.content,
            prevPost,
            nextPost,
        };

        fs.writeFileSync(path.join(POSTS_OUTPUT_DIR, `${post.slug}.json`), JSON.stringify(detail, null, 2), "utf-8");
    });

    console.log(`✅ [GENERATE-POSTS] Successfully built index lists and ${allPosts.length} post payloads.`);
}

generatePosts().catch(console.error);