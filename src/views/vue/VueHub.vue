<script setup lang="ts">
import { ref, onMounted } from 'vue';

const listData = ref({ total: 0, bySubject: {} as Record<string, any[]> });
const currentPost = ref<any>(null);
const loading = ref(true);

function formatImageMarkdown(text: string) {
  if (!text) return "";
  return text.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    `<figure class="my-6 border border-[#1f242c] bg-[#0c0e12] p-2 rounded text-center">
      <div class="overflow-hidden rounded bg-[#050608]">
        <img src="$2" alt="$1" class="w-full max-h-[520px] object-cover block" loading="lazy" />
      </div>
      <figcaption class="mt-2 text-[11px] font-mono text-[#8b949e] uppercase flex items-center justify-center gap-1">
        <span class="text-[#58a6ff] font-bold">// FIG.</span> $1
      </figcaption>
    </figure>`
  );
}

async function loadPost(slug: string) {
  loading.value = true;
  try {
    const res = await fetch(`/data/posts/${slug}.json`);
    currentPost.value = await res.json();
    history.replaceState(null, "", `?slug=${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  const res = await fetch("/data/lists/etc.json");
  listData.value = await res.json();

  const urlParams = new URLSearchParams(window.location.search);
  const targetSlug = urlParams.get("slug") || Object.values(listData.value.bySubject)[0]?.[0]?.slug;

  if (targetSlug) {
    await loadPost(targetSlug);
  } else {
    loading.value = false;
  }
});
</script>

<template>
  <div class="w-full max-w-none flex flex-col bg-[#090a0f] text-[#c9d1d9] font-sans border-x border-[#1f242c]">
    <!-- Top Sub-Header -->
    <div class="border-b border-[#1f242c] bg-[#0b0c12] px-4 py-2.5 flex items-center justify-between font-mono text-xs text-[#8b949e]">
      <div class="flex items-center gap-2">
        <span class="inline-block w-2 h-2 rounded-full bg-topic-etc"></span>
        <span class="text-[#f0f6fc] font-bold tracking-wider uppercase">HUB_ETC // VUE 3</span>
        <span class="text-[#30363d]">/</span>
        <span class="text-topic-etc">#{{ currentPost?.subject || 'INDEX' }}</span>
      </div>
      <span class="text-[11px]">DATE: {{ currentPost?.date || 'STANDBY' }}</span>
    </div>

    <!-- Mobile Accordion Directory -->
    <details class="lg:hidden border-b border-[#1f242c] bg-[#0e1017] text-xs font-mono group">
      <summary class="px-4 py-3 cursor-pointer list-none flex items-center justify-between text-[#8b949e]">
        <span class="flex items-center gap-2 font-bold text-topic-etc">
          <span>📁</span> SUBJECT DIRECTORY ({{ listData.total }})
        </span>
        <span class="text-[10px] text-[#484f58] group-open:rotate-180 transition-transform">▼</span>
      </summary>
      <div class="p-4 border-t border-[#1f242c] space-y-3 bg-[#0a0c10]">
        <div v-for="(items, subject) in listData.bySubject" :key="subject" class="space-y-1">
          <div class="text-[11px] font-bold text-[#e6edf3]">// {{ subject }}</div>
          <ul class="pl-2 space-y-1">
            <li v-for="item in items" :key="item.slug">
              <button
                type="button"
                @click="loadPost(item.slug)"
                class="w-full text-left py-1 text-xs truncate font-mono"
                :class="currentPost?.slug === item.slug ? 'text-topic-etc font-bold' : 'text-[#8b949e]'"
              >
                {{ currentPost?.slug === item.slug ? `▸ ${item.title}` : item.title }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </details>

    <!-- Main Split Layout -->
    <div class="flex w-full min-h-[calc(100vh-8rem)]">
      <!-- Left Sidebar (PC) -->
      <aside class="hidden lg:flex w-64 border-r border-[#1f242c] bg-[#0a0c10] flex-col justify-between shrink-0">
        <div class="p-4 space-y-5 overflow-y-auto">
          <div class="text-[11px] font-mono text-[#6e7681] uppercase tracking-wider">SUBJECT TREE ({{ listData.total }})</div>
          <div v-for="(items, subject) in listData.bySubject" :key="subject" class="space-y-1">
            <div class="px-2 py-1 text-xs font-mono text-[#8b949e] bg-[#11141b]/60 border-l border-[#30363d] font-bold">
              // {{ subject }} <span class="text-[10px] text-[#6e7681]">({{ items.length }})</span>
            </div>
            <ul class="space-y-0.5 pt-1 pl-1">
              <li v-for="item in items" :key="item.slug">
                <button
                  type="button"
                  @click="loadPost(item.slug)"
                  class="w-full text-left px-2 py-1.5 text-xs rounded truncate font-mono block"
                  :class="currentPost?.slug === item.slug ? 'bg-[#161b22] text-topic-etc font-bold border border-[#1f242c]' : 'text-[#8b949e] hover:bg-[#11141a]'"
                >
                  {{ currentPost?.slug === item.slug ? `▸ ${item.title}` : item.title }}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="p-3 border-t border-[#1f242c] bg-[#090a0f] text-[10px] font-mono text-[#484f58]">
          RUNTIME: VUE 3 SPA
        </div>
      </aside>

      <!-- Right Reading Terminal -->
      <main class="flex-1 w-full bg-[#07080b] p-6 sm:p-10 lg:p-14 overflow-y-auto">
        <div v-if="loading" class="font-mono text-xs text-[#8b949e] animate-pulse">FETCHING PAYLOAD FROM CDN...</div>
        <div v-else-if="currentPost" class="max-w-5xl xl:max-w-6xl mx-auto space-y-6">
          <div class="flex items-center gap-2 font-mono text-xs text-[#6e7681]">
            <span>INDEX</span>
            <span>&gt;</span>
            <span class="text-[#8b949e] uppercase">{{ currentPost.category }}</span>
            <span>&gt;</span>
            <span class="text-topic-etc">{{ currentPost.subject }}</span>
          </div>

          <header class="border-b border-[#1f242c] pb-6">
            <h1 class="text-2xl sm:text-3xl font-bold text-[#f0f6fc] tracking-tight mb-3">{{ currentPost.title }}</h1>
            <div class="flex items-center gap-3 text-xs font-mono text-[#6e7681]">
              <time :datetime="currentPost.date">DATE: {{ currentPost.date }}</time>
              <span>•</span>
              <span class="text-topic-etc">RUNTIME: VERIFIED</span>
            </div>
            <p v-if="currentPost.description" class="mt-4 text-sm text-[#8b949e] bg-[#0e1117] p-3.5 border-l-2 border-topic-etc rounded-r leading-relaxed">
              {{ currentPost.description }}
            </p>
          </header>

          <article class="text-[#c9d1d9] text-[15px] sm:text-base leading-relaxed whitespace-pre-line space-y-4" v-html="formatImageMarkdown(currentPost.content)" />

          <footer class="mt-14 pt-6 border-t border-[#1f242c] grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <button
                v-if="currentPost.prevPost"
                type="button"
                @click="loadPost(currentPost.prevPost.slug)"
                class="w-full text-left p-3 bg-[#0d0f14] border border-[#1f242c] rounded block hover:border-topic-etc"
              >
                <span class="text-[#6e7681] block mb-1">← PREV_DISPATCH</span>
                <span class="text-[#c9d1d9] truncate font-sans block">{{ currentPost.prevPost.title }}</span>
              </button>
            </div>
            <div>
              <button
                v-if="currentPost.nextPost"
                type="button"
                @click="loadPost(currentPost.nextPost.slug)"
                class="w-full text-left sm:text-right p-3 bg-[#0d0f14] border border-[#1f242c] rounded block hover:border-topic-etc"
              >
                <span class="text-[#6e7681] block mb-1">NEXT_DISPATCH →</span>
                <span class="text-[#c9d1d9] truncate font-sans block">{{ currentPost.nextPost.title }}</span>
              </button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  </div>
</template>