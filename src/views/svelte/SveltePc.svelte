<script lang="ts">
  import HubHeader from "@/components/svelte/HubHeader.svelte";
  import PostViewer from "@/components/svelte/PostViewer.svelte";

  interface Props {
    listData: { total: number; bySubject: Record<string, any[]> };
    currentPost: any;
    loading: boolean;
    onSelectPost: (slug: string) => void;
    class?: string;
  }

  let { listData, currentPost, loading, onSelectPost, class: className = "" }: Props = $props();
</script>

<div class="w-full flex-col {className}">
  <!-- PC 헤더 -->
  <HubHeader subject={currentPost?.subject} date={currentPost?.date} />

  <!-- 데스크톱 2분할 레이아웃 -->
  <div class="w-full flex min-h-[calc(100vh-8rem)]">
    <!-- 좌측 고정 사이드바 -->
    <aside class="w-64 shrink-0 border-r border-[#1f242c] bg-[#0a0c10] flex flex-col justify-between">
      <div class="p-4 space-y-5 overflow-y-auto">
        <div class="text-[11px] font-mono text-[#6e7681] uppercase tracking-wider">
          SUBJECT TREE ({listData.total})
        </div>

        {#each Object.entries(listData.bySubject) as [subject, items]}
          <div class="space-y-1">
            <div class="px-2 py-1 text-xs font-mono text-[#8b949e] bg-[#11141b]/60 border-l border-[#30363d] font-bold">
              // {subject} <span class="text-[10px] text-[#6e7681]">({items.length})</span>
            </div>
            <ul class="space-y-0.5 pt-1 pl-1">
              {#each items as item}
                <li>
                  <button
                    type="button"
                    onclick={() => onSelectPost(item.slug)}
                    class="w-full text-left px-2 py-1.5 text-xs rounded truncate font-mono block transition-colors {currentPost?.slug ===
                    item.slug
                      ? 'bg-[#161b22] text-topic-learning font-bold border border-[#1f242c]'
                      : 'text-[#8b949e] hover:bg-[#11141a]'}">
                    {currentPost?.slug === item.slug ? `▸ ${item.title}` : item.title}
                  </button>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>

      <div class="p-3 border-t border-[#1f242c] bg-[#090a0f] text-[10px] font-mono text-[#484f58]">
        RUNTIME: SVELTE 5 SPA
      </div>
    </aside>

    <!-- 우측 메인 뷰어 영역 -->
    <main class="w-full flex-1 bg-[#07080b] p-8 lg:p-12 overflow-y-auto">
      {#if loading}
        <div class="font-mono text-xs text-[#8b949e] animate-pulse">FETCHING PAYLOAD FROM CDN...</div>
      {:else if currentPost}
        <PostViewer post={currentPost} {onSelectPost} />
      {:else}
        <div class="font-mono text-xs text-[#6e7681]">SELECT_A_POST_FROM_TREE</div>
      {/if}
    </main>
  </div>
</div>
