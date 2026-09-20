import React from 'react';

interface PostDetail {
    slug: string;
    title: string;
    date: string;
    category: string;
    subject: string;
    content: string;
    description?: string;
    prevPost?: { slug: string; title: string } | null;
    nextPost?: { slug: string; title: string } | null;
}

interface PostViewerProps {
    post: PostDetail;
    onSelectPost: (slug: string) => void;
}

function formatImageMarkdown(text: string) {
    if (!text) return "";
    return text.replace(
        /!\[(.*?)\]\((.*?)\)/g,
        `<figure class="my-6 border border-[#1f242c] bg-[#0c0e12] p-2 rounded text-center">
      <div class="overflow-hidden rounded bg-[#050608]">
        <img src="$2" alt="$1" class="w-full max-h-[520px] object-cover block" loading="lazy" />
      </div>
      <figcaption class="mt-2 text-[11px] font-mono text-[#8b949e] uppercase flex items-center justify-center gap-1">
        <span class="text-topic-ai font-bold">// FIG.</span> $1
      </figcaption>
    </figure>`
    );
}

export const PostViewer: React.FC<PostViewerProps> = ({ post, onSelectPost }) => {
    return (
        <div className="w-full max-w-5xl mx-auto space-y-6">
            {/* 상단 Breadcrumb */}
            <div className="w-full flex items-center gap-2 font-mono text-xs text-[#6e7681]">
                <span>INDEX</span>
                <span>&gt;</span>
                <span className="text-[#8b949e] uppercase">{post.category}</span>
                <span>&gt;</span>
                <span className="text-topic-ai">{post.subject}</span>
            </div>

            {/* 포스트 메인 헤더 */}
            <header className="w-full border-b border-[#1f242c] pb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f6fc] tracking-tight mb-3">
                    {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#6e7681]">
                    <time dateTime={post.date}>DATE: {post.date}</time>
                    <span>•</span>
                    <span className="text-topic-ai">RUNTIME: VERIFIED</span>
                </div>
                {post.description && (
                    <p className="mt-4 text-sm text-[#8b949e] bg-[#0e1117] p-3.5 border-l-2 border-topic-ai rounded-r leading-relaxed">
                        {post.description}
                    </p>
                )}
            </header>

            {/* 본문 렌더링 영역 */}
            <article
                className="w-full prose prose-invert max-w-none text-[#c9d1d9] text-[15px] sm:text-base leading-relaxed whitespace-pre-line space-y-4"
                dangerouslySetInnerHTML={{ __html: formatImageMarkdown(post.content) }}
            />

            {/* 하단 이전글 / 다음글 Footer 네비게이션 */}
            <footer className="w-full mt-14 pt-6 border-t border-[#1f242c] grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                    {post.prevPost ? (
                        <button
                            type="button"
                            onClick={() => onSelectPost(post.prevPost!.slug)}
                            className="w-full text-left p-3 bg-[#0d0f14] border border-[#1f242c] rounded block hover:border-topic-ai transition-colors"
                        >
                            <span className="text-[#6e7681] block mb-1">← PREV_DISPATCH</span>
                            <span className="text-[#c9d1d9] truncate font-sans block">{post.prevPost.title}</span>
                        </button>
                    ) : (
                        <div className="hidden sm:block"></div>
                    )}
                </div>
                <div>
                    {post.nextPost && (
                        <button
                            type="button"
                            onClick={() => onSelectPost(post.nextPost!.slug)}
                            className="w-full text-left sm:text-right p-3 bg-[#0d0f14] border border-[#1f242c] rounded block hover:border-topic-ai transition-colors"
                        >
                            <span className="text-[#6e7681] block mb-1">NEXT_DISPATCH →</span>
                            <span className="text-[#c9d1d9] truncate font-sans block">{post.nextPost.title}</span>
                        </button>
                    )}
                </div>
            </footer>
        </div>
    );
};