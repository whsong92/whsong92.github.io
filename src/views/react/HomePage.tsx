import React, { useEffect, useState } from 'react';
import { fetchPostList, fetchPostContent, PostMeta } from '@/lib/github';
import ReactEditorModal from '@/components/react/ReactEditorModal';

export default function HomePage() {
    const [posts, setPosts] = useState<PostMeta[]>([]);
    const [selectedPost, setSelectedPost] = useState<{ title: string; html: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadPosts = async () => {
        const list = await fetchPostList();
        setPosts(list);
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const handleRead = async (url: string) => {
        setLoading(true);
        const content = await fetchPostContent(url);
        setSelectedPost(content);
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* 상단 네비게이션 */}
            <div className="flex items-center justify-between border-b pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-blue-600">React Blog Hub</h2>
                    <div className="flex gap-2 mt-2">
                        <a href="/" className="text-xs px-2.5 py-1 bg-gray-200 rounded hover:bg-gray-300">Astro 메인</a>
                        <a href="/vue" className="text-xs px-2.5 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700">Vue 허브</a>
                        <a href="/svelte" className="text-xs px-2.5 py-1 bg-amber-600 text-white rounded hover:bg-amber-700">Svelte 허브</a>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow cursor-pointer"
                >
                    + 새 글 작성
                </button>
            </div>

            {/* 본문 영역: 목록과 상세 뷰 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 글 목록 */}
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Articles ({posts.length})</h3>
                    {posts.length === 0 ? (
                        <p className="text-sm text-gray-400">등록된 글이 없습니다.</p>
                    ) : (
                        posts.map((p) => (
                            <button
                                key={p.slug}
                                onClick={() => handleRead(p.download_url)}
                                className="w-full text-left p-3 rounded-lg border bg-white hover:border-blue-400 transition shadow-sm"
                            >
                                <div className="font-semibold text-gray-800 text-sm">{p.name}</div>
                                <div className="text-xs text-blue-500 mt-1">읽기 &rarr;</div>
                            </button>
                        ))
                    )}
                </div>

                {/* 글 읽기 뷰어 */}
                <div className="md:col-span-2 bg-white border rounded-xl p-6 min-h-[300px] shadow-sm">
                    {loading ? (
                        <p className="text-gray-400">글을 불러오는 중...</p>
                    ) : selectedPost ? (
                        <article>
                            <h1 className="text-2xl font-extrabold text-gray-900 border-b pb-3 mb-4">{selectedPost.title}</h1>
                            <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: selectedPost.html }} />
                        </article>
                    ) : (
                        <p className="text-gray-400 text-center py-12">왼쪽 목록에서 읽을 글을 선택하세요.</p>
                    )}
                </div>
            </div>

            <ReactEditorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={loadPosts}
            />
        </div>
    );
}