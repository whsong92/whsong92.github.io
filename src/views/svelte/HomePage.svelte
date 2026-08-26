<script>
    import { onMount } from "svelte";
    import { fetchPostList, fetchPostContent } from "@/lib/github";
    import SvelteEditorModal from "@/components/svelte/SvelteEditorModal.svelte";

    let posts = [];
    let selectedPost = null;
    let loading = false;
    let isModalOpen = false;

    async function loadPosts() {
        posts = await fetchPostList();
    }

    onMount(loadPosts);

    async function handleRead(url) {
        loading = true;
        selectedPost = await fetchPostContent(url);
        loading = false;
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between border-b pb-4">
        <div>
            <h2 class="text-2xl font-bold text-amber-600">Svelte Blog Hub</h2>
            <div class="flex gap-2 mt-2">
                <a
                    href="/"
                    class="text-xs px-2.5 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >Astro 메인</a
                >
                <a
                    href="/react"
                    class="text-xs px-2.5 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >React 허브</a
                >
                <a
                    href="/vue"
                    class="text-xs px-2.5 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                    >Vue 허브</a
                >
            </div>
        </div>
        <button
            on:click={() => (isModalOpen = true)}
            class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold rounded-xl shadow cursor-pointer"
        >
            + 새 글 작성
        </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="space-y-2">
            <h3 class="text-sm font-bold text-gray-500 uppercase">
                Articles ({posts.length})
            </h3>
            {#each posts as p}
                <button
                    on:click={() => handleRead(p.download_url)}
                    class="w-full text-left p-3 rounded-lg border bg-white hover:border-amber-400 transition shadow-sm"
                >
                    <div class="font-semibold text-gray-800 text-sm">
                        {p.name}
                    </div>
                    <div class="text-xs text-amber-600 mt-1">읽기 &rarr;</div>
                </button>
            {/each}
        </div>

        <div
            class="md:col-span-2 bg-white border rounded-xl p-6 min-h-[300px] shadow-sm"
        >
            {#if loading}
                <p class="text-gray-400">로딩 중...</p>
            {:else if selectedPost}
                <article>
                    <h1 class="text-2xl font-extrabold border-b pb-3 mb-4">
                        {selectedPost.title}
                    </h1>
                    <div class="prose max-w-none text-gray-800">
                        {@html selectedPost.html}
                    </div>
                </article>
            {:else}
                <p class="text-gray-400 text-center py-12">
                    글을 선택해 주세요.
                </p>
            {/if}
        </div>
    </div>

    <SvelteEditorModal
        isOpen={isModalOpen}
        on:close={() => (isModalOpen = false)}
        on:success={loadPosts}
    />
</div>
