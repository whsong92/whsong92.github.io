import { defineStore } from 'pinia';

export interface PostItem {
    id: string;
    title: string;
    description: string;
    pubDate: string;
    category: string;
    readTime: string;
}

export interface PostDetail extends PostItem {
    body: string;
    prevPost: { id: string; title: string } | null;
    nextPost: { id: string; title: string } | null;
}

export const useVuePostStore = defineStore('vuePosts', {
    state: () => ({
        posts: [] as PostItem[],
        selectedPost: null as PostDetail | null,
        loading: false,
        isModalOpen: false,
    }),
    actions: {
        async loadPosts(initialSlug?: string | null) {
            this.loading = true;
            try {
                // etc 도메인 글 목록 호출
                const res = await fetch('/api/posts?category=etc');
                if (!res.ok) throw new Error('Failed to fetch posts');
                const list: PostItem[] = await res.json();
                this.posts = list;

                // URL 쿼리에 지정된 글이 있거나 목록이 존재할 경우 해당 글 로드
                const targetSlug = initialSlug || (list.length > 0 ? list[0].id : null);
                if (targetSlug) {
                    await this.selectPost(targetSlug);
                }
            } catch (err) {
                console.error('Failed to load Vue posts:', err);
            } finally {
                this.loading = false;
            }
        },

        async selectPost(slug: string) {
            this.loading = true;
            try {
                const res = await fetch(`/api/posts?slug=${encodeURIComponent(slug)}`);
                if (!res.ok) throw new Error('Failed to fetch post detail');
                const detail: PostDetail = await res.json();
                this.selectedPost = detail;

                // 브라우저 URL 쿼리 갱신
                if (typeof window !== 'undefined') {
                    window.history.pushState({}, '', `/vue?slug=${encodeURIComponent(slug)}`);
                }
            } catch (err) {
                console.error('Failed to fetch post detail:', err);
            } finally {
                this.loading = false;
            }
        },

        setModalOpen(open: boolean) {
            this.isModalOpen = open;
        },
    },
});