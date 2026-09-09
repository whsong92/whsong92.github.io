import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.resolve(process.cwd(), "src/content/posts");
const OUTPUT_DIR = path.resolve(process.cwd(), "public/data");
const LISTS_DIR = path.resolve(OUTPUT_DIR, "lists");
const POSTS_OUTPUT_DIR = path.resolve(OUTPUT_DIR, "posts");

export type Category = "learning" | "ai" | "etc";

export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    category: Category;
    subject: string;
    description?: string;
    readTime?: string;
}

export interface CategoryPayload {
    category: Category;
    total: number;
    bySubject: Record<string, PostMeta[]>;
    posts: PostMeta[];
}

export interface PostDetail extends PostMeta {
    content: string; // 마크다운 원문 그대로 저장
    prevPost?: { slug: string; title: string } | null;
    nextPost?: { slug: string; title: string } | null;
}

async function generatePosts() {
    console.log("⚡ [GENERATE-POSTS] Building minimal JSON payloads...");

    [OUTPUT_DIR, LISTS_DIR, POSTS_OUTPUT_DIR].forEach((dir) => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });

    if (!fs.existsSync(POSTS_DIR)) {
        fs.mkdirSync(POSTS_DIR, { recursive: true });
    }

    const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
    const allPosts: (PostMeta & { rawDate: number; content: string })[] = [];

    for (const filename of files) {
        const filePath = path.join(POSTS_DIR, filename);
        const rawContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(rawContent);

        const slug = filename.replace(/\.md$/, "");

        allPosts.push({
            slug,
            title: data.title || slug,
            date: data.date ? String(data.date) : new Date().toISOString().slice(0, 10),
            category: (data.category as Category) || "etc",
            subject: data.subject || "일반",
            description: data.description || "",
            readTime: data.readTime || "05 MIN READ",
            rawDate: new Date(data.date || 0).getTime(),
            content: content.trim(),
        });
    }

    // 최신순 정렬
    allPosts.sort((a, b) => b.rawDate - a.rawDate);

    // 1. 목록 4종 초기화 (all, learning, ai, etc)
    const categories: Category[] = ["learning", "ai", "etc"];
    const payloads: Record<Category, CategoryPayload> = {
        learning: { category: "learning", total: 0, bySubject: {}, posts: [] },
        ai: { category: "ai", total: 0, bySubject: {}, posts: [] },
        etc: { category: "etc", total: 0, bySubject: {}, posts: [] },
    };

    const allMetaList: PostMeta[] = [];

    for (const post of allPosts) {
        const { rawDate, content, ...meta } = post;
        allMetaList.push(meta);

        const catTarget = payloads[meta.category] || payloads.etc;
        catTarget.total += 1;
        catTarget.posts.push(meta);

        if (!catTarget.bySubject[meta.subject]) {
            catTarget.bySubject[meta.subject] = [];
        }
        catTarget.bySubject[meta.subject].push(meta);
    }

    // 2. 인덱스 JSON 파일 4개 저장
    fs.writeFileSync(path.join(LISTS_DIR, "all.json"), JSON.stringify(allMetaList, null, 2), "utf-8");
    categories.forEach((cat) => {
        fs.writeFileSync(path.join(LISTS_DIR, `${cat}.json`), JSON.stringify(payloads[cat], null, 2), "utf-8");
    });

    // 3. 개별 본문 On-demand 파일 생성 (content 원문 포함)
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
            description: post.description,
            readTime: post.readTime,
            content: post.content,
            prevPost,
            nextPost,
        };

        fs.writeFileSync(
            path.join(POSTS_OUTPUT_DIR, `${post.slug}.json`),
            JSON.stringify(detail, null, 2),
            "utf-8"
        );
    });

    console.log(`✅ [GENERATE-POSTS] Successfully built 4 index lists and ${allPosts.length} post payloads.`);
}

generatePosts().catch(console.error);