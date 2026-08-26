import React, { useState } from 'react';
import { getAdminToken, setAdminToken, clearAdminToken, pushNewPost } from '@/lib/github';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ReactEditorModal({ isOpen, onClose, onSuccess }: Props) {
    const [tokenInput, setTokenInput] = useState(getAdminToken() || '');
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tokenInput) {
            alert('GitHub Personal Access Token(PAT)을 입력해야 저장할 수 있습니다.');
            return;
        }
        setAdminToken(tokenInput);
        setLoading(true);

        try {
            await pushNewPost(title, slug, content);
            alert('GitHub에 성공적으로 푸시되었습니다!');
            setTitle('');
            setSlug('');
            setContent('');
            onSuccess();
            onClose();
        } catch (err: any) {
            alert(`푸시 실패: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="font-bold text-lg text-gray-900">새 글 작성 (React Studio)</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
                </div>

                <form onSubmit={handleSave} className="space-y-3">
                    <div>
                        <label className="text-xs font-bold text-gray-500">GitHub PAT (나만의 비밀 키 - 브라우저 저장)</label>
                        <div className="flex gap-2">
                            <input
                                type="password"
                                placeholder="github_pat_..."
                                value={tokenInput}
                                onChange={(e) => setTokenInput(e.target.value)}
                                className="flex-1 p-2 border rounded text-xs"
                            />
                            <button
                                type="button"
                                onClick={() => { clearAdminToken(); setTokenInput(''); alert('토큰이 삭제되었습니다.'); }}
                                className="px-2 py-1 bg-gray-200 text-xs rounded hover:bg-gray-300"
                            >
                                삭제
                            </button>
                        </div>
                    </div>

                    <input
                        type="text"
                        placeholder="파일 슬러그 (예: intro-to-ai)"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                        required
                    />

                    <input
                        type="text"
                        placeholder="글 제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded text-sm font-semibold"
                        required
                    />

                    <textarea
                        rows={8}
                        placeholder="마크다운 본문..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border rounded text-sm font-mono"
                        required
                    />

                    <div className="flex justify-end gap-2 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-sm">취소</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-bold disabled:opacity-50"
                        >
                            {loading ? 'GitHub로 푸시 중...' : '저장 및 Push'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}