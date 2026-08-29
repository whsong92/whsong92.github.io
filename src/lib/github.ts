import { Octokit } from '@octokit/rest';
import { marked } from 'marked';

export const GITHUB_CONFIG = {
    owner: 'whsong92',
    repo: 'whsong92.github.io',
    branch: 'main',
    blogPath: 'src/content/blog',
};

const TOKEN_KEY = 'swh_blog_admin_token';

// 1. 관리자 토큰 관리 (나만 작성 가능하도록 localStorage 활용)
export function getAdminToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function isOwner(): boolean {
    return !!getAdminToken();
}

// 2. 글 목록 불러오기 (GitHub API 공개 접근)
export interface PostMeta {
    name: string;
    slug: string;
    download_url: string;
}

export async function fetchPostList(): Promise<PostMeta[]> {
    try {
        const res = await fetch(
            `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.blogPath}`
        );
        if (!res.ok) return [];
        const files = await res.json();
        return files
            .filter((file: any) => file.name.endsWith('.md'))
            .map((file: any) => ({
                name: file.name.replace(/\.md$/, ''),
                slug: file.name,
                download_url: file.download_url,
            }));
    } catch (e) {
        console.error('글 목록 로드 실패:', e);
        return [];
    }
}

// 3. 단일 글 본문 불러오기 및 마크다운 파싱
export async function fetchPostContent(downloadUrl: string): Promise<{ title: string; html: string; raw: string }> {
    const res = await fetch(downloadUrl);
    const raw = await res.text();

    // Frontmatter 간단 파싱
    const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    let title = '제목 없음';
    let body = raw;

    if (frontmatterMatch) {
        const header = frontmatterMatch[1];
        body = frontmatterMatch[2];
        const titleMatch = header.match(/title:\s*["']?(.*?)["']?$/m);
        if (titleMatch) title = titleMatch[1];
    }

    const html = await marked.parse(body);
    return { title, html, raw: body };
}

// 4. 새 글 GitHub에 커밋 및 푸시 (관리자 토큰 필요)
export async function pushNewPost(title: string, slug: string, content: string): Promise<boolean> {
    const token = getAdminToken();
    if (!token) throw new Error('관리자 권한이 없습니다. 먼저 토큰을 등록해 주세요.');

    const octokit = new Octokit({ auth: token });
    const filename = slug.endsWith('.md') ? slug : `${slug}.md`;
    const fileContent = `---\ntitle: "${title}"\ndate: "${new Date().toISOString().split('T')[0]}"\n---\n\n${content}`;

    // UTF-8 base64 인코딩
    const encoded = btoa(unescape(encodeURIComponent(fileContent)));

    await octokit.repos.createOrUpdateFileContents({
        owner: GITHUB_CONFIG.owner,
        repo: GITHUB_CONFIG.repo,
        path: `${GITHUB_CONFIG.blogPath}/${filename}`,
        message: `docs: new post - ${title}`,
        content: encoded,
        branch: GITHUB_CONFIG.branch,
    });

    return true;
}