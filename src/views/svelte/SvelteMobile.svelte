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

<div class="w-full flex-col min-h-[calc(100vh-8rem)] {className}">
  <!-- 모바일 헤더 -->
  <HubHeader subject={currentPost?.subject} date={currentPost?.date} />

  <!-- 모바일 디렉터리 아코디언 드로어 -->
  <details class="w-full border-b border-[#1f242c] bg-[#0e1017] text-xs font-mono group">
    <summary class="px-4 py-3 cursor-pointer list-none flex items-center justify-between text-[#8b949e]">
      <span class="flex items-center gap-2 font-bold text-topic-learning">
        <span>📁</span> SUBJECT DIRECTORY ({listData.total})
      </span>
      <span class="text-[10px] text-[#484f58] group-open:rotate-180 transition-transform">▼</span>
    </summary>
    <div class="p-4 border-t border-[#1f242c] space-y-3 bg-[#0a0c10]">
      {#each Object.entries(listData.bySubject) as [subject, items]}
        <div class="space-y-1">
          <div class="text-[11px] font-bold text-[#e6edf3]">// {subject}</div>
          <ul class="pl-2 space-y-1">
            {#each items as item}
              <li>
                <button
                  type="button"
                  onclick={() => onSelectPost(item.slug)}
                  class="w-full text-left py-1 text-xs truncate font-mono {currentPost?.slug === item.slug
                    ? 'text-topic-learning font-bold'
                    : 'text-[#8b949e]'}">
                  {currentPost?.slug === item.slug ? `▸ ${item.title}` : item.title}
                </button>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </details>

  <!-- 모바일 본문 영역 -->
  <main class="w-full flex-1 p-4 overflow-y-auto">
    {#if loading}
      <div class="font-mono text-xs text-[#8b949e] animate-pulse">FETCHING PAYLOAD FROM CDN...</div>
    {:else if currentPost}
      <PostViewer post={currentPost} {onSelectPost} />
    {:else}
      <div class="font-mono text-xs text-[#6e7681]">NO_PAYLOAD_SELECTED</div>
    {/if}
  </main>

  <div class="p-3 border-t border-[#1f242c] bg-[#090a0f] text-[10px] font-mono text-[#484f58] text-center">
    RUNTIME: SVELTE 5 SPA // MOBILE VIEW
  </div>
</div>
