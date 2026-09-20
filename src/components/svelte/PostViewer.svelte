<script lang="ts">
  interface PostDetail {
    slug: string;
    title: string;
    date: string;
    category: string;
    subject: string;
    content: string;
    description?: string;
    prevPost?: { slug: string; title: string } | null;
    nextPost?: { slug: string; title: string } | null;
  }

  interface Props {
    post: PostDetail;
    onSelectPost: (slug: string) => void;
  }

  let { post, onSelectPost }: Props = $props();

  function formatImageMarkdown(text: string) {
    if (!text) return "";
    return text.replace(
      /!\[(.*?)\]\((.*?)\)/g,
      `<figure class="my-6 border border-[#1f242c] bg-[#0c0e12] p-2 rounded text-center">
        <div class="overflow-hidden rounded bg-[#050608]">
          <img src="$2" alt="$1" class="w-full max-h-[520px] object-cover block" loading="lazy" />
        </div>
        <figcaption class="mt-2 text-[11px] font-mono text-[#8b949e] uppercase flex items-center justify-center gap-1">
          <span class="text-topic-learning font-bold">// FIG.</span> $1
        </figcaption>
      </figure>`,
    );
  }
</script>

<div class="w-full max-w-5xl mx-auto space-y-6">
  <!-- 상단 Breadcrumb -->
  <div class="w-full flex items-center gap-2 font-mono text-xs text-[#6e7681]">
    <span>INDEX</span>
    <span>&gt;</span>
    <span class="text-[#8b949e] uppercase">{post.category}</span>
    <span>&gt;</span>
    <span class="text-topic-learning">{post.subject}</span>
  </div>

  <!-- 포스트 메인 헤더 -->
  <header class="w-full border-b border-[#1f242c] pb-6">
    <h1 class="text-2xl sm:text-3xl font-bold text-[#f0f6fc] tracking-tight mb-3">
      {post.title}
    </h1>
    <div class="flex flex-wrap items-center gap-3 text-xs font-mono text-[#6e7681]">
      <time datetime={post.date}>DATE: {post.date}</time>
      <span>•</span>
      <span class="text-topic-learning">RUNTIME: VERIFIED</span>
    </div>
    {#if post.description}
      <p
        class="mt-4 text-sm text-[#8b949e] bg-[#0e1117] p-3.5 border-l-2 border-topic-learning rounded-r leading-relaxed">
        {post.description}
      </p>
    {/if}
  </header>

  <!-- 본문 렌더링 영역 -->
  <article
    class="w-full prose prose-invert max-w-none text-[#c9d1d9] text-[15px] sm:text-base leading-relaxed whitespace-pre-line space-y-4">
    {@html formatImageMarkdown(post.content)}
  </article>

  <!-- 하단 이전글 / 다음글 Footer 네비게이션 -->
  <footer class="w-full mt-14 pt-6 border-t border-[#1f242c] grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
    <div>
      {#if post.prevPost}
        <button
          type="button"
          onclick={() => onSelectPost(post.prevPost!.slug)}
          class="w-full text-left p-3 bg-[#0d0f14] border border-[#1f242c] rounded block hover:border-topic-learning transition-colors">
          <span class="text-[#6e7681] block mb-1">← PREV_DISPATCH</span>
          <span class="text-[#c9d1d9] truncate font-sans block">{post.prevPost.title}</span>
        </button>
      {:else}
        <div class="hidden sm:block"></div>
      {/if}
    </div>
    <div>
      {#if post.nextPost}
        <button
          type="button"
          onclick={() => onSelectPost(post.nextPost!.slug)}
          class="w-full text-left sm:text-right p-3 bg-[#0d0f14] border border-[#1f242c] rounded block hover:border-topic-learning transition-colors">
          <span class="text-[#6e7681] block mb-1">NEXT_DISPATCH →</span>
          <span class="text-[#c9d1d9] truncate font-sans block">{post.nextPost.title}</span>
        </button>
      {/if}
    </div>
  </footer>
</div>
