import { create } from 'zustand';
import { fetchPostList, fetchPostContent, type PostItem, type PostDetail } from '../../lib/github';

interface PostState {
    posts: PostItem[];
    selectedPost: PostDetail | null;
    loading: boolean;
    isModalOpen: boolean;
    loadPosts: () => Promise<void>;
    selectPost: (downloadUrl: string) => Promise<void>;
    setModalOpen: (open: boolean) => void;
}

export const usePostStore = create<PostState>((set, get) => ({
    posts: [],
    selectedPost: null,
    loading: false,
    isModalOpen: false,

    loadPosts: async () => {
        set({ loading: true });
        try {
            // React Hub는 'ai' 카테고리/폴더를 구독
            const list = await fetchPostList('ai');
            set({ posts: list });

            // 첫 번째 포스트 자동 선택
            if (list.length > 0 && !get().selectedPost) {
                await get().selectPost(list[0].download_url);
            }
        } catch (err) {
            console.error('Failed to load React/AI posts:', err);
        } finally {
            set({ loading: false });
        }
    },

    selectPost: async (downloadUrl: string) => {
        set({ loading: true });
        try {
            const detail = await fetchPostContent(downloadUrl);
            set({ selectedPost: detail });
        } catch (err) {
            console.error('Failed to fetch post detail:', err);
        } finally {
            set({ loading: false });
        }
    },

    setModalOpen: (open: boolean) => set({ isModalOpen: open }),
}));