import React, { useState, useEffect, useCallback } from 'react';
import { ReactMobile } from './ReactMobile';
import { ReactPc } from './ReactPc';

interface ListData {
    total: number;
    bySubject: Record<string, any[]>;
}

export const ReactHub: React.FC = () => {
    const [listData, setListData] = useState<ListData>({ total: 0, bySubject: {} });

    const [currentPost, setCurrentPost] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const loadPost = useCallback(async (slug: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/data/posts/${slug}.json`);
            const post = await res.json();
            setCurrentPost(post);
            window.history.replaceState(null, "", `?slug=${slug}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            console.error("[REACT-HUB] Failed to fetch post:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const initHub = async () => {
            try {
                const res = await fetch("/data/lists/ai.json");
                const list = await res.json() as ListData;
                setListData(list);

                const urlParams = new URLSearchParams(window.location.search);
                const targetSlug =
                    urlParams.get("slug") || Object.values(list.bySubject)[0]?.[0]?.slug;

                if (targetSlug) {
                    await loadPost(targetSlug);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                console.error("[REACT-HUB] Init failed:", err);
                setLoading(false);
            }
        };

        initHub();
    }, [loadPost]);

    return (
        <div className="w-full max-w-none bg-[#090a0f] text-[#c9d1d9] font-sans border-x border-[#1f242c]">
            {/* 모바일 쉘 (폭 < 1024px) */}
            <ReactMobile
                className="block lg:hidden"
                listData={listData}
                currentPost={currentPost}
                loading={loading}
                onSelectPost={loadPost}
            />

            {/* PC 쉘 (폭 >= 1024px) */}
            <ReactPc
                className="hidden lg:flex"
                listData={listData}
                currentPost={currentPost}
                loading={loading}
                onSelectPost={loadPost}
            />
        </div>
    );
};

export default ReactHub;