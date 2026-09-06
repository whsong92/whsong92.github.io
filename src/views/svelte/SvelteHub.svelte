<script lang="ts">
  import { onMount } from "svelte";
  import { posts, selectedPost, loading, isModalOpen, loadPosts, selectPost } from "../../stores/svelte/usePostStore";

  const isDev = import.meta.env.DEV;

  onMount(() => {
    loadPosts();
  });
</script>

<div class="w-full space-y-6 font-sans">
  <!-- 허브 헤더 -->
  <div
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-silver-line gap-3">
    <div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 bg-topic-learning led-learning"></span>
        <h1 class="text-xl sm:text-2xl font-heading font-bold text-paper uppercase tracking-tight">
          TOPIC: 01 // DEV & STUDY (SVELTE)
        </h1>
      </div>
      <p class="text-xs font-mono text-silver-muted mt-0.5">
        {isDev ? "SYS.MOCK_DATA // LOCAL_MODE" : "STATE: NATIVE_STORE // COMPILED_REACTIVE"}
      </p>
    </div>

    {#if !isDev}
      <button
        on:click={() => isModalOpen.set(true)}
        class="px-3 py-1.5 bg-topic-learning/10 border border-topic-learning text-topic-learning text-xs font-mono font-bold hover:bg-topic-learning hover:text-carbon transition">
        + WRITE_POST
      </button>
    {/if}
  </div>

  <!-- 메인 2열 그리드 콘솔 -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- 좌측 목록 -->
    <div class="space-y-2">
      <span class="text-[10px] font-mono text-silver-muted uppercase tracking-wider block">POST INDEX</span>
      {#each $posts as p}
        <button
          on:click={() => selectPost(p.download_url)}
          class="w-full text-left p-3 border border-silver-line bg-carbon hover:border-topic-learning hover:bg-[#14151A] transition flex flex-col gap-1">
          <div class="font-medium text-xs sm:text-sm text-paper truncate">{p.name}</div>
          <span class="text-[10px] font-mono text-silver-muted">{p.slug}</span>
        </button>
      {/each}
    </div>

    <!-- 우측 리더 -->
    <div class="md:col-span-2 border border-silver-line bg-carbon p-4 sm:p-6 min-h-[350px]">
      {#if $loading}
        <div class="text-silver-muted text-xs font-mono text-center py-20 animate-pulse">LOADING DISPATCH...</div>
      {:else if $selectedPost}
        <article class="space-y-4">
          <h2 class="text-lg sm:text-xl font-heading font-bold text-paper border-b border-silver-line pb-3">
            {$selectedPost.title}
          </h2>
          <div class="prose prose-invert max-w-none text-xs sm:text-sm text-silver-muted leading-relaxed">
            {@html $selectedPost.html}
          </div>
        </article>
      {:else}
        <div class="text-silver-muted text-xs font-mono text-center py-20">SELECT A DISPATCH FROM THE INDEX</div>
      {/if}
    </div>
  </div>
</div>
