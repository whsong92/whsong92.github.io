<script setup lang="ts">
import { onMounted } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import { useVuePostStore } from '../../stores/vue/usePostStore';

const pinia = createPinia();
setActivePinia(pinia);

const store = useVuePostStore();

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  store.loadPosts(slug);
});
</script>

<template>
  <div class="w-full space-y-6 font-sans">
    <!-- 허브 헤더 -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-silver-line gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-topic-etc led-etc"></span>
          <h1 class="text-xl sm:text-2xl font-heading font-bold text-paper uppercase tracking-tight">
            TOPIC: 03 // ETC RUNTIME (VUE)
          </h1>
        </div>
        <p class="text-xs font-mono text-silver-muted mt-0.5">
          STATE: PINIA // REACTIVE_STORE
        </p>
      </div>
    </div>

    <!-- 메인 2열 그리드 콘솔 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- 좌측 목록 -->
      <div class="space-y-2">
        <span class="text-[10px] font-mono text-silver-muted uppercase tracking-wider block">POST INDEX</span>
        <div class="space-y-1">
          <button
            v-for="p in store.posts"
            :key="p.id"
            @click="store.selectPost(p.id)"
            :class="[
              'w-full text-left p-3 border transition flex flex-col gap-1',
              store.selectedPost?.id === p.id 
                ? 'border-topic-etc bg-[#14151A] text-paper' 
                : 'border-silver-line bg-carbon text-silver-muted hover:border-topic-etc/60 hover:text-paper'
            ]"
          >
            <div class="font-medium text-xs sm:text-sm truncate">{{ p.title }}</div>
            <span class="text-[10px] font-mono opacity-60">{{ p.id }}</span>
          </button>
        </div>
      </div>

      <!-- 우측 리더 + 이전/다음 네비게이션 -->
      <div class="md:col-span-2 border border-silver-line bg-carbon p-4 sm:p-6 min-h-[420px] flex flex-col justify-between">
        <div v-if="store.loading" class="text-silver-muted text-xs font-mono text-center py-24 animate-pulse">
          LOADING DISPATCH...
        </div>
        <div v-else-if="store.selectedPost">
          <header class="border-b border-silver-line pb-4 mb-6">
            <span class="text-[10px] font-mono text-topic-etc uppercase tracking-wider block mb-1">
              ETC ARCHIVE // {{ store.selectedPost.id }}
            </span>
            <h2 class="text-xl sm:text-2xl font-heading font-bold text-paper">
              {{ store.selectedPost.title }}
            </h2>
            <p class="text-xs font-mono text-silver-muted mt-2">
              {{ store.selectedPost.readTime }}
            </p>
          </header>

          <div class="prose prose-invert max-w-none text-xs sm:text-sm text-silver-muted leading-relaxed whitespace-pre-wrap">
            {{ store.selectedPost.body }}
          </div>

          <!-- 하단 이전 글 / 다음 글 네비게이션 -->
          <div class="grid grid-cols-2 gap-4 pt-8 mt-12 border-t border-silver-line text-xs font-mono">
            <div>
              <button
                v-if="store.selectedPost.prevPost"
                @click="store.selectPost(store.selectedPost.prevPost.id)"
                class="text-left group block w-full space-y-1"
              >
                <span class="text-silver-muted block text-[10px]">← PREVIOUS</span>
                <span class="text-paper group-hover:text-topic-etc transition line-clamp-1">
                  {{ store.selectedPost.prevPost.title }}
                </span>
              </button>
            </div>
            <div class="text-right">
              <button
                v-if="store.selectedPost.nextPost"
                @click="store.selectPost(store.selectedPost.nextPost.id)"
                class="text-right group block w-full space-y-1 ml-auto"
              >
                <span class="text-silver-muted block text-[10px]">NEXT →</span>
                <span class="text-paper group-hover:text-topic-etc transition line-clamp-1">
                  {{ store.selectedPost.nextPost.title }}
                </span>
              </button>
            </div>
          </div>
        </div>
        <div v-else class="text-silver-muted text-xs font-mono text-center py-24">
          SELECT A DISPATCH FROM THE INDEX
        </div>
      </div>
    </div>
  </div>
</template>