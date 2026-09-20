<script setup lang="ts">
import { ref, computed } from 'vue';

interface PostItem {
  slug: string;
  title: string;
  date: string;
  subject: string;
  description?: string;
  rating?: number | null;
  cover?: string | null;
  [key: string]: any;
}

const props = defineProps<{
  posts: PostItem[];
  subjects: string[];
}>();

const emit = defineEmits<{
  (e: 'selectPost', slug: string): void;
}>();

const activeFilter = ref<string>('ALL');
const sortBy = ref<'date-desc' | 'rating-desc'>('date-desc');

const displayPosts = computed(() => {
  let list = [...props.posts];
  if (activeFilter.value !== 'ALL') {
    list = list.filter((p) => p.subject?.toUpperCase() === activeFilter.value.toUpperCase());
  }
  return list.sort((a, b) => {
    if (sortBy.value === 'rating-desc') {
      const ratingA = a.rating ?? 0;
      const ratingB = b.rating ?? 0;
      if (ratingB !== ratingA) return ratingB - ratingA;
    }
    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
  });
});
</script>

<template>
  <div class="w-full space-y-6">
    <!-- 관제 툴바 -->
    <div class="w-full flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1f242c] text-xs font-mono">
      <div class="flex items-center gap-1.5 flex-wrap">
        <span class="text-[#6e7681] mr-1">FILTER:</span>
        <button
          type="button"
          @click="activeFilter = 'ALL'"
          class="px-2.5 py-1 border text-xs transition-colors"
          :class="activeFilter === 'ALL' ? 'border-topic-etc bg-topic-etc/10 text-topic-etc font-bold' : 'border-[#30363d] text-[#8b949e]'"
        >
          [ALL: {{ posts.length }}]
        </button>
        <button
          v-for="sub in subjects"
          :key="sub"
          type="button"
          @click="activeFilter = sub"
          class="px-2.5 py-1 border text-xs uppercase transition-colors"
          :class="activeFilter === sub ? 'border-topic-etc bg-topic-etc/10 text-topic-etc font-bold' : 'border-[#30363d] text-[#8b949e]'"
        >
          [{{ sub }}]
        </button>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-[#6e7681]">SORT:</span>
        <select
          v-model="sortBy"
          class="bg-[#11141a] text-[#c9d1d9] border border-[#30363d] px-2 py-1 text-xs outline-none focus:border-topic-etc cursor-pointer"
        >
          <option value="date-desc">LATEST_DATE (최신순)</option>
          <option value="rating-desc">HIGHEST_RATING (★ 평점순)</option>
        </select>
      </div>
    </div>

    <!-- 카드 그리드 -->
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <article
        v-for="post in displayPosts"
        :key="post.slug"
        @click="emit('selectPost', post.slug)"
        class="w-full group bg-[#0d0f14] border border-[#1f242c] hover:border-topic-etc transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
      >
        <div>
          <!-- 1. 커버 이미지가 있는 경우 (16:9 비율 썸네일) -->
          <div v-if="post.cover" class="w-full aspect-[16/9] overflow-hidden bg-[#050608] relative border-b border-[#1f242c]">
            <img
              :src="post.cover"
              :alt="post.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div class="absolute top-2 left-2 px-1.5 py-0.5 bg-[#090a0f]/80 backdrop-blur border border-[#30363d] text-[10px] font-mono text-topic-etc font-bold">
              // {{ post.subject }}
            </div>
          </div>

          <!-- 카드 텍스트 정보 -->
          <div class="p-4 space-y-2">
            <!-- 커버 이미지가 없을 때만 상단 서브젝트 태그 노출 -->
            <div v-if="!post.cover" class="flex items-center justify-between text-[11px] font-mono mb-1 text-[#6e7681]">
              <span class="text-topic-etc font-bold">// {{ post.subject }}</span>
              <time :datetime="post.date">{{ post.date }}</time>
            </div>
            <div v-else class="flex justify-end text-[11px] font-mono text-[#6e7681]">
              <time :datetime="post.date">{{ post.date }}</time>
            </div>

            <h3 class="text-sm font-heading font-semibold text-[#f0f6fc] group-hover:text-topic-etc transition-colors line-clamp-1">
              {{ post.title }}
            </h3>
            <p v-if="post.description" class="text-xs text-[#8b949e] line-clamp-2 leading-relaxed">
              {{ post.description }}
            </p>
            <p v-else class="text-xs text-[#484f58] italic font-mono">
              // NO_SUMMARY_REGISTERED
            </p>
          </div>
        </div>

        <!-- 카드 하단 (별점 + 진입 텍스트) -->
        <div class="mx-4 pb-3 pt-2.5 border-t border-[#1f242c]/60 flex items-center justify-between font-mono text-xs">
          <div>
            <div v-if="post.rating" class="flex items-center gap-1.5">
              <div class="relative inline-block text-[11px] leading-none text-[#30363d] select-none">
                <div>★★★★★</div>
                <div
                  class="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-[#f59e0b]"
                  :style="{ width: `${(Number(post.rating) / 5) * 100}%` }"
                >
                  ★★★★★
                </div>
              </div>
              <span class="text-[#f59e0b] font-bold text-[11px]">{{ Number(post.rating).toFixed(1) }}</span>
            </div>
            <span v-else class="text-[#484f58] text-[11px]">NO_RATING</span>
          </div>
          <span class="text-[#6e7681] group-hover:text-white transition-transform group-hover:translate-x-0.5 text-[11px]">
            DISPATCH ↗
          </span>
        </div>
      </article>
    </div>
  </div>
</template>