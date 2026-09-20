import React from 'react';
import { HubHeader } from '@/components/react/HubHeader';
import { PostViewer } from '@/components/react/PostViewer';

interface ReactPcProps {
    listData: { total: number; bySubject: Record<string, any[]> };
    currentPost: any;
    loading: boolean;
    onSelectPost: (slug: string) => void;
    className?: string;
}

export const ReactPc: React.FC<ReactPcProps> = ({
    listData,
    currentPost,
    loading,
    onSelectPost,
    className = "",
}) => {
    return (
        <div className={`w-full flex-col ${className}`}>
            {/* PC Header */}
            <HubHeader subject={currentPost?.subject} date={currentPost?.date} />

            {/* PC Main Split Layout */}
            <div className="w-full flex min-h-[calc(100vh-8rem)]">
                {/* Left Sidebar */}
                <aside className="w-64 shrink-0 border-r border-[#1f242c] bg-[#0a0c10] flex flex-col justify-between">
                    <div className="p-4 space-y-5 overflow-y-auto">
                        <div className="text-[11px] font-mono text-[#6e7681] uppercase tracking-wider">
                            SUBJECT TREE ({listData.total})
                        </div>

                        {Object.entries(listData.bySubject).map(([subject, items]) => (
                            <div key={subject} className="space-y-1">
                                <div className="px-2 py-1 text-xs font-mono text-[#8b949e] bg-[#11141b]/60 border-l border-[#30363d] font-bold">
                  // {subject} <span className="text-[10px] text-[#6e7681]">({items.length})</span>
                                </div>
                                <ul className="space-y-0.5 pt-1 pl-1">
                                    {items.map((item: any) => (
                                        <li key={item.slug}>
                                            <button
                                                type="button"
                                                onClick={() => onSelectPost(item.slug)}
                                                className={`w-full text-left px-2 py-1.5 text-xs rounded truncate font-mono block transition-colors ${currentPost?.slug === item.slug
                                                        ? 'bg-[#161b22] text-topic-ai font-bold border border-[#1f242c]'
                                                        : 'text-[#8b949e] hover:bg-[#11141a]'
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
                <main className="w-full flex-1 bg-[#07080b] p-8 lg:p-12 overflow-y-auto">
                    {loading ? (
                        <div className="font-mono text-xs text-[#8b949e] animate-pulse">
                            FETCHING PAYLOAD FROM CDN...
                        </div>
                    ) : currentPost ? (
                        <PostViewer post={currentPost} onSelectPost={onSelectPost} />
                    ) : (
                        <div className="font-mono text-xs text-[#6e7681]">SELECT_A_POST_FROM_TREE</div>
                    )}
                </main>
            </div>
        </div>
    );
};