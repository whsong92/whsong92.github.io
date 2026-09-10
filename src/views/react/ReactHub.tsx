import React, { useState, useEffect } from "react";

interface ListData {
    total: number;
    bySubject: Record<string, any[]>;
}

export default function ReactHub() {
    const [listData, setListData] = useState<ListData>({ total: 0, bySubject: {} });
    const [currentPost, setCurrentPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const formatImageMarkdown = (text: string) => {
        if (!text) return "";
        return text.replace(
            /!\[(.*?)\]\((.*?)\)/g,
            `<figure class="my-6 border border-[#1f242c] bg-[#0c0e12] p-2 rounded text-center">
        <div class="overflow-hidden rounded bg-[#050608]">
          <img src="$2" alt="$1" class="w-full max-h-[520px] object-cover block" loading="lazy" />
        </div>
        <figcaption class="mt-2 text-[11px] font-mono text-[#8b949e] uppercase flex items-center justify-center gap-1">
          <span class="text-[#58a6ff] font-bold">// FIG.</span> $1
        </figcaption>
      </figure>`
        );
    };

    const loadPost = async (slug: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/data/posts/${slug}.json`);
            const data = await res.json();
            setCurrentPost(data);
            window.history.replaceState(null, "", `?slug=${slug}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch("/data/lists/ai.json")
            .then((res) => res.json())
            .then((data: ListData) => {
                setListData(data);
                const urlParams = new URLSearchParams(window.location.search);
                const targetSlug = urlParams.get("slug") || Object.values(data.bySubject)[0]?.[0]?.slug;
                if (targetSlug) loadPost(targetSlug);
                else setLoading(false);
            });
    }, []);

    return (
        <div className="w-full max-w-none flex flex-col bg-[#090a0f] text-[#c9d1d9] font-sans border-x border-[#1f242c]">
            {/* Top Sub-Header */}
            <div className="border-b border-[#1f242c] bg-[#0b0c12] px-4 py-2.5 flex items-center justify-between font-mono text-xs text-[#8b949e]">
                <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-topic-ai"></span>
                    <span className="text-[#f0f6fc] font-bold tracking-wider uppercase">HUB_AI // REACT 19</span>
                    <span className="text-[#30363d]">/</span>
                    <span className="text-topic-ai">#{currentPost?.subject || "INDEX"}</span>
                </div>
                <span className="text-[11px]">DATE: {currentPost?.date || "STANDBY"}</span>
            </div>

            {/* Mobile Accordion Directory */}
            <details className="lg:hidden border-b border-[#1f242c] bg-[#0e1017] text-xs font-mono group">
                <summary className="px-4 py-3 cursor-pointer list-none flex items-center justify-between text-[#8b949e]">
                    <span className="flex items-center gap-2 font-bold text-topic-ai">
                        <span>📁</span> SUBJECT DIRECTORY ({listData.total})
                    </span>
                    <span className="text-[10px] text-[#484f58] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 border-t border-[#1f242c] space-y-3 bg-[#0a0c10]">
                    {Object.entries(listData.bySubject).map(([subject, items]) => (
                        <div key={subject} className="space-y-1">
                            <div className="text-[11px] font-bold text-[#e6edf3]">// {subject}</div>
                            <ul className="pl-2 space-y-1">
                                {items.map((item) => (
                                    <li key={item.slug}>
                                        <button
                                            type="button"
                                            onClick={() => loadPost(item.slug)}
                                            className={`w-full text-left py-1 text-xs truncate font-mono ${currentPost?.slug === item.slug ? "text-topic-ai font-bold" : "text-[#8b949e]"
                                                }`}
                                        >
                                            {currentPost?.slug === item.slug ? `▸ ${item.title}` : item.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </details>

            {/* Main Split Layout */}
            <div className="flex w-full min-h-[calc(100vh-8rem)]">
                {/* Left Sidebar (PC) */}
                <aside className="hidden lg:flex w-64 border-r border-[#1f242c] bg-[#0a0c10] flex-col justify-between shrink-0">
                    <div className="p-4 space-y-5 overflow-y-auto">
                        <div className="text-[11px] font-mono text-[#6e7681] uppercase tracking-wider">SUBJECT TREE ({listData.total})</div>
                        {Object.entries(listData.bySubject).map(([subject, items]) => (
                            <div key={subject} className="space-y-1">
                                <div className="px-2 py-1 text-xs font-mono text-[#8b949e] bg-[#11141b]/60 border-l border-[#30363d] font-bold">
                  // {subject} <span className="text-[10px] text-[#6e7681]">({items.length})</span>
                                </div>
                                <ul className="space-y-0.5 pt-1 pl-1">
                                    {items.map((item) => (
                                        <li key={item.slug}>
                                            <button
                                                type="button"
                                                onClick={() => loadPost(item.slug)}
                                                className={`w-full text-left px-2 py-1.5 text-xs rounded truncate font-mono block ${currentPost?.slug === item.slug
                                                    ? "bg-[#161b22] text-topic-ai font-bold border border-[#1f242c]"
                                                    : "text-[#8b949e] hover:bg-[#11141a]"
                                                    }`}
                                            >
                                                {currentPost?.slug === item.slug ? `▸ ${item.title}` : item.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-[#1f242c] bg-[#090a0f] text-[10px] font-mono text-[#484f58]">
                        RUNTIME: REACT 19 SPA
                    </div>
                </aside>

                {/* Right Reading Terminal */}
                <main className="flex-1 w-full bg-[#07080b] p-6 sm:p-10 lg:p-14 overflow-y-auto">
                    {loading ? (
                        <div className="font-mono text-xs text-[#8b949e] animate-pulse">FETCHING PAYLOAD FROM CDN...</div>
                    ) : currentPost ? (
                        <div className="max-w-5xl xl:max-w-6xl mx-auto space-y-6">
                            <div className="flex items-center gap-2 font-mono text-xs text-[#6e7681]">
                                <span>INDEX</span>
                                <span>&gt;</span>
                                <span className="text-[#8b949e] uppercase">{currentPost.category}</span>
                                <span>&gt;</span>
                                <span className="text-topic-ai">{currentPost.subject}</span>
                            </div>

                            <header className="border-b border-[#1f242c] pb-6">
                                <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f6fc] tracking-tight mb-3">{currentPost.title}</h1>
                                <div className="flex items-center gap-3 text-xs font-mono text-[#6e7681]">
                                    <time dateTime={currentPost.date}>DATE: {currentPost.date}</time>
                                    <span>•</span>
                                    <span className="text-topic-ai">RUNTIME: VERIFIED</span>
                                </div>
                                {currentPost.description && (
                                    <p className="mt-4 text-sm text-[#8b949e] bg-[#0e1117] p-3.5 border-l-2 border-topic-ai rounded-r leading-relaxed">
                                        {currentPost.description}
                                    </p>
                                )}
                            </header>

                            <article
                                className="text-[#c9d1d9] text-[15px] sm:text-base leading-relaxed whitespace-pre-line space-y-4"
                                dangerouslySetInnerHTML={{ __html: formatImageMarkdown(currentPost.content) }}
                            />

                            <footer className="mt-14 pt-6 border-t border-[#1f242c] grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                                <div>
                                    {currentPost.prevPost && (
                                        <button
                                            type="button"
                                            onClick={() => loadPost(currentPost.prevPost.slug)}
                                            className="w-full text-left p-3 bg-[#0d0f14] border border-[#1f242c] rounded block hover:border-topic-ai"
                                        >
                                            <span className="text-[#6e7681] block mb-1">← PREV_DISPATCH</span>
                                            <span className="text-[#c9d1d9] truncate font-sans block">{currentPost.prevPost.title}</span>
                                        </button>
                                    )}
                                </div>
                                <div>
                                    {currentPost.nextPost && (
                                        <button
                                            type="button"
                                            onClick={() => loadPost(currentPost.nextPost.slug)}
                                            className="w-full text-left sm:text-right p-3 bg-[#0d0f14] border border-[#1f242c] rounded block hover:border-topic-ai"
                                        >
                                            <span className="text-[#6e7681] block mb-1">NEXT_DISPATCH →</span>
                                            <span className="text-[#c9d1d9] truncate font-sans block">{currentPost.nextPost.title}</span>
                                        </button>
                                    )}
                                </div>
                            </footer>
                        </div>
                    ) : null}
                </main>
            </div>
        </div>
    );
}