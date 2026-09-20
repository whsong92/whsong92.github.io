<script setup lang="ts">
import { formatImageMarkdown } from '@/utils/markdown';

defineProps<{
  post: any;
}>();

const emit = defineEmits<{
  (e: 'selectPost', slug: string): void;
  (e: 'openShelf'): void;
}>();
</script>

<template>
  <div class="w-full max-w-5xl mx-auto space-y-6">
    <!-- Breadcrumb & 뒤로가기 -->
    <div class="w-full flex items-center justify-between font-mono text-xs text-[#6e7681]">
      <div class="flex items-center gap-2">
        <button type="button" @click="emit('openShelf')" class="text-topic-etc hover:underline">
          &lt; BACK TO SHELF
        </button>
        <span>/</span>
        <span class="text-[#8b949e] uppercase">{{ post.category }}</span>
        <span>/</span>
        <span class="text-topic-etc">{{ post.subject }}</span>
      </div>
    </div>

    <!-- 글 헤더 -->
    <header class="w-full border-b border-[#1f242c] pb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-[#f0f6fc] tracking-tight mb-3">
        {{ post.title }}
      </h1>
      <div class="flex flex-wrap items-center gap-3 text-xs font-mono text-[#6e7681]">
        <time :datetime="post.date">DATE: {{ post.date }}</time>
        <span>•</span>
        <span class="text-topic-etc">RUNTIME: VERIFIED</span>

        <!-- 평점 뱃지 -->
        <template v-if="post.rating">
          <span>•</span>
          <div class="inline-flex items-center gap-2 bg-[#161b22] px-2.5 py-1 rounded border border-[#30363d]">
            <div class="relative inline-block text-xs leading-none text-[#30363d] select-none">
              <div>★★★★★</div>
              <div
                class="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-[#f59e0b]"
                :style="{ width: `${(post.rating / 5) * 100}%` }"
              >
                ★★★★★
              </div>
            </div>
            <span class="text-[#f0f6fc] font-bold text-[11px]">{{ Number(post.rating).toFixed(1) }} / 5.0</span>
          </div>
        </template>
      </div>

      <p v-if="post.description" class="mt-4 text-sm text-[#8b949e] bg-[#0e1117] p-3.5 border-l-2 border-topic-etc rounded-r leading-relaxed">
        {{ post.description }}
      </p>
    </header>

    <!-- 🔻 formatImageMarkdown 공통 유틸 함수 적용 🔻 -->
    <article
      class="w-full prose prose-invert max-w-none text-[#c9d1d9] text-[15px] sm:text-base leading-relaxed whitespace-pre-line space-y-4"
      v-html="formatImageMarkdown(post.content, 'text-topic-etc')"
    />

    <!-- 이전글 / 다음글 네비게이션 -->
    <footer class="w-full mt-14 pt-6 border-t border-[#1f242c] grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
      <div>
        <button
          v-if="post.prevPost"
          type="button"
          @click="emit('selectPost', post.prevPost.slug)"
          class="w-full text-left p-3 bg-[#0d0f14] border border-[#1f242c] rounded block hover:border-topic-etc transition-colors"
        >
          <span class="text-[#6e7681] block mb-1">← PREV_DISPATCH</span>
          <span class="text-[#c9d1d9] truncate font-sans block">{{ post.prevPost.title }}</span>
        </button>
      </div>
      <div>
        <button
          v-if="post.nextPost"
          type="button"
          @click="emit('selectPost', post.nextPost.slug)"
          class="w-full text-left sm:text-right p-3 bg-[#0d0f14] border border-[#1f242c] rounded block hover:border-topic-etc transition-colors"
        >
          <span class="text-[#6e7681] block mb-1">NEXT_DISPATCH →</span>
          <span class="text-[#c9d1d9] truncate font-sans block">{{ post.nextPost.title }}</span>
        </button>
      </div>
    </footer>
  </div>
</template>