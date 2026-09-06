import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category'); // 'dev' | 'ai' | 'etc'
    const slug = url.searchParams.get('slug');

    const allPosts = (await getCollection('posts')).sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );

    // 1. 단일 글 상세 조회 (우측 본문 뷰어용 + 이전/다음 글)
    if (slug) {
        const post = allPosts.find((p) => p.id === slug);
        if (!post) {
            return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
        }

        const categoryPosts = allPosts.filter((p) => p.data.category === post.data.category);
        const currentIndex = categoryPosts.findIndex((p) => p.id === slug);

        const prevPost = currentIndex > 0 ? {
            id: categoryPosts[currentIndex - 1].id,
            title: categoryPosts[currentIndex - 1].data.title
        } : null;

        const nextPost = currentIndex < categoryPosts.length - 1 ? {
            id: categoryPosts[currentIndex + 1].id,
            title: categoryPosts[currentIndex + 1].data.title
        } : null;

        return new Response(JSON.stringify({
            id: post.id,
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
            category: post.data.category,
            readTime: post.data.readTime,
            body: post.body,
            prevPost,
            nextPost,
        }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // 2. 도메인별 목록 조회 (좌측 메뉴 색인용)
    const filtered = category ? allPosts.filter((p) => p.data.category === category) : allPosts;

    const list = filtered.map((p) => ({
        id: p.id,
        title: p.data.title,
        description: p.data.description,
        pubDate: p.data.pubDate,
        category: p.data.category,
        readTime: p.data.readTime,
    }));

    return new Response(JSON.stringify(list), {
        headers: { 'Content-Type': 'application/json' },
    });
};