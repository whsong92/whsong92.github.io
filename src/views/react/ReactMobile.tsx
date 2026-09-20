import React from 'react';
import { HubHeader } from '@/components/react/HubHeader';
import { PostViewer } from '@/components/react/PostViewer';

interface ReactMobileProps {
    listData: { total: number; bySubject: Record<string, any[]> };
    currentPost: any;
    loading: boolean;
    onSelectPost: (slug: string) => void;
    className?: string;
}

export const ReactMobile: React.FC<ReactMobileProps> = ({
    listData,
    currentPost,
    loading,
    onSelectPost,
    className = "",
}) => {
    return (
        <div className={`w-full flex-col min-h-[calc(100vh-8rem)] ${className}`}>
            {/* Header */}
            <HubHeader subject={currentPost?.subject} date={currentPost?.date} />

            {/* Mobile Directory Accordion */}
            <details className="w-full border-b border-[#1f242c] bg-[#0e1017] text-xs font-mono group">
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
                                {items.map((item: any) => (
                                    <li key={item.slug}>
                                        <button
                                            type="button"
                                            onClick={() => onSelectPost(item.slug)}
                                            className={`w-full text-left py-1 text-xs truncate font-mono ${currentPost?.slug === item.slug ? 'text-topic-ai font-bold' : 'text-[#8b949e]'
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

            {/* Mobile Contents Area */}
            <main className="w-full flex-1 p-4 overflow-y-auto">
                {loading ? (
                    <div className="font-mono text-xs text-[#8b949e] animate-pulse">
                        FETCHING PAYLOAD FROM CDN...
                    </div>
                ) : currentPost ? (
                    <PostViewer post={currentPost} onSelectPost={onSelectPost} />
                ) : (
                    <div className="font-mono text-xs text-[#6e7681]">NO_PAYLOAD_SELECTED</div>
                )}
            </main>

            {/* 모바일 하단 상태 바닥 */}
            <div className="p-3 border-t border-[#1f242c] bg-[#090a0f] text-[10px] font-mono text-[#484f58] text-center">
                RUNTIME: REACT 19 SPA // MOBILE VIEW
            </div>
        </div>
    );
};