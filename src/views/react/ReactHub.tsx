import React, { useEffect } from 'react';
import { usePostStore } from '@/stores/react/usePostStore';

export default function ReactHub() {
    const { posts, selectedPost, loading, isModalOpen, loadPosts, selectPost, setModalOpen } = usePostStore();
    const isDev = import.meta.env.DEV;

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    return (
        <div class="w-full space-y-6 font-sans">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-silver-line gap-3">
                <div>
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-topic-ai led-ai"></span>
                        <h1 class="text-xl sm:text-2xl font-heading font-bold text-paper uppercase tracking-tight">
                            TOPIC: 02 // AI RUNTIME (REACT)
                        </h1>
                    </div>
                    <p class="text-xs font-mono text-silver-muted mt-0.5">
                        {isDev ? 'SYS.MOCK_DATA // LOCAL_MODE' : 'STATE: ZUSTAND // ISOLATED_STORE'}
                    </p>
                </div>

                {!isDev && (
                    <button
                        onClick={() => setModalOpen(true)}
                        class="px-3 py-1.5 bg-topic-ai/10 border border-topic-ai text-topic-ai text-xs font-mono font-bold hover:bg-topic-ai hover:text-carbon transition"
                    >
                        + WRITE_POST
                    </button>
                )}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="space-y-2">
                    <span class="text-[10px] font-mono text-silver-muted uppercase tracking-wider block">POST INDEX</span>
                    {posts.map((p) => (
                        <button
                            key={p.slug}
                            onClick={() => selectPost(p.download_url)}
                            class="w-full text-left p-3 border border-silver-line bg-carbon hover:border-topic-ai hover:bg-[#14151A] transition flex flex-col gap-1"
                        >
                            <div class="font-medium text-xs sm:text-sm text-paper truncate">{p.name}</div>
                            <span class="text-[10px] font-mono text-silver-muted">{p.slug}</span>
                        </button>
                    ))}
                </div>

                <div class="md:col-span-2 border border-silver-line bg-carbon p-4 sm:p-6 min-h-[350px]">
                    {loading ? (
                        <div class="text-silver-muted text-xs font-mono text-center py-20 animate-pulse">
                            LOADING DISPATCH...
                        </div>
                    ) : selectedPost ? (
                        <article class="space-y-4">
                            <h2 class="text-lg sm:text-xl font-heading font-bold text-paper border-b border-silver-line pb-3">
                                {selectedPost.title}
                            </h2>
                            <div
                                class="prose prose-invert max-w-none text-xs sm:text-sm text-silver-muted leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: selectedPost.html }}
                            />
                        </article>
                    ) : (
                        <div class="text-silver-muted text-xs font-mono text-center py-20">
                            SELECT A DISPATCH FROM THE INDEX
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}