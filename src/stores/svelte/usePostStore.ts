import { writable, get } from 'svelte/store';
import { fetchPostList, fetchPostContent, type PostItem, type PostDetail } from '../../lib/github';

export const posts = writable<PostItem[]>([]);
export const selectedPost = writable<PostDetail | null>(null);
export const loading = writable<boolean>(false);
export const isModalOpen = writable<boolean>(false);

export async function loadPosts() {
    loading.set(true);
    try {
        const list = await fetchPostList('dev');
        posts.set(list);
        if (list.length > 0 && !get(selectedPost)) {
            await selectPost(list[0].download_url);
        }
    } catch (err) {
        console.error('Failed to load Svelte posts:', err);
    } finally {
        loading.set(false);
    }
}

export async function selectPost(downloadUrl: string) {
    loading.set(true);
    try {
        const detail = await fetchPostContent(downloadUrl);
        selectedPost.set(detail);
    } catch (err) {
        console.error('Failed to fetch post detail:', err);
    } finally {
        loading.set(false);
    }
}