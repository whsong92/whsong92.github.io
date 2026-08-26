<script>
    import { createEventDispatcher } from "svelte";
    import {
        pushNewPost,
        getAdminToken,
        setAdminToken,
        clearAdminToken,
    } from "@/lib/github";

    export let isOpen = false;

    const dispatch = createEventDispatcher();

    let tokenInput = getAdminToken() || "";
    let title = "";
    let slug = "";
    let content = "";
    let saving = false;

    async function handleSave() {
        if (!tokenInput) return alert("PAT 토큰을 입력하세요.");
        setAdminToken(tokenInput);
        saving = true;
        try {
            await pushNewPost(title, slug, content);
            alert("Svelte에서 GitHub로 푸시 완료!");
            title = "";
            slug = "";
            content = "";
            dispatch("success");
            dispatch("close");
        } catch (err) {
            alert(err.message);
        } finally {
            saving.value = false;
        }
    }
</script>

{#if isOpen}
    <div
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
        <div
            class="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl"
        >
            <div class="flex justify-between items-center border-b pb-3">
                <h3 class="font-bold text-lg text-gray-900">
                    새 글 작성 (Svelte Studio)
                </h3>
                <button
                    on:click={() => dispatch("close")}
                    class="text-gray-400 hover:text-gray-700">✕</button
                >
            </div>

            <div class="space-y-3">
                <div>
                    <label class="text-xs font-bold text-gray-500"
                        >GitHub PAT</label
                    >
                    <div class="flex gap-2">
                        <input
                            type="password"
                            placeholder="github_pat_..."
                            bind:value={tokenInput}
                            class="flex-1 p-2 border rounded text-xs"
                        />
                        <button
                            type="button"
                            on:click={() => {
                                clearAdminToken();
                                tokenInput = "";
                            }}
                            class="px-2 py-1 bg-gray-200 text-xs rounded hover:bg-gray-300"
                        >
                            삭제
                        </button>
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="파일 슬러그 (예: my-svelte-post)"
                    bind:value={slug}
                    class="w-full p-2 border rounded text-sm"
                />
                <input
                    type="text"
                    placeholder="글 제목"
                    bind:value={title}
                    class="w-full p-2 border rounded text-sm font-semibold"
                />
                <textarea
                    rows="8"
                    placeholder="마크다운 본문..."
                    bind:value={content}
                    class="w-full p-2 border rounded text-sm font-mono"
                ></textarea>

                <div class="flex justify-end gap-2 pt-2">
                    <button
                        on:click={() => dispatch("close")}
                        class="px-4 py-2 border rounded text-sm">취소</button
                    >
                    <button
                        on:click={handleSave}
                        disabled={saving}
                        class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded text-sm font-bold disabled:opacity-50"
                    >
                        {saving ? "푸시 중..." : "저장 및 Push"}
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
