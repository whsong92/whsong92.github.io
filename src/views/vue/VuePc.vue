<script setup lang="ts">
import HubHeader from '@/components/vue/HubHeader.vue';
import ShelfGrid from '@/components/vue/ShelfGrid.vue';
import PostViewer from '@/components/vue/PostViewer.vue';

defineProps<{
  listData: { total: number; bySubject: Record<string, any[]>; posts?: any[] };
  allPosts: any[];
  currentPost: any;
  loading: boolean;
  viewMode: 'shelf' | 'detail';
}>();

const emit = defineEmits<{
  (e: 'selectPost', slug: string): void;
  (e: 'openShelf'): void;
}>();
</script>

<template>
  <div class="w-full flex flex-col">
    <!-- PC Header -->
    <HubHeader
      :subject="currentPost?.subject"
      :date="currentPost?.date"
      :view-mode="viewMode"
      @open-shelf="emit('openShelf')"
    />

    <!-- 데스크톱 2분할 레이아웃 -->
    <div class="w-full flex min-h-[calc(100vh-8rem)]">
      <!-- 좌측 고정 256px 사이드바 -->
      <aside class="w-64 shrink-0 border-r border-[#1f242c] bg-[#0a0c10] flex flex-col justify-between">
        <div class="p-4 space-y-4 overflow-y-auto">
          <!-- 모아보기 바로가기 버튼 -->
          <button
            type="button"
            @click="emit('openShelf')"
            class="w-full text-left px-3 py-2 text-xs font-mono border transition-all flex items-center justify-between group"
            :class="viewMode === 'shelf'
              ? 'border-topic-etc bg-topic-etc/10 text-topic-etc font-bold'
              : 'border-[#1f242c] hover:border-topic-etc text-[#c9d1d9] bg-[#0e1117]'"
          >
            <span class="text-topic-etc font-bold">❖ SHELF VIEW</span>
            <span class="text-[10px] text-[#6e7681] group-hover:text-white">ALL ↗</span>
          </button>

          <div class="text-[11px] font-mono text-[#6e7681] uppercase tracking-wider pt-2">
            SUBJECT TREE ({{ listData.total }})
          </div>

          <div v-for="(items, subject) in listData.bySubject" :key="subject" class="space-y-1">
            <div class="px-2 py-1 text-xs font-mono text-[#8b949e] bg-[#11141b]/60 border-l border-[#30363d] font-bold">
              // {{ subject }} <span class="text-[10px] text-[#6e7681]">({{ items.length }})</span>
            </div>
            <ul class="space-y-0.5 pt-1 pl-1">
              <li v-for="item in items" :key="item.slug">
                <button
                  type="button"
                  @click="emit('selectPost', item.slug)"
                  class="w-full text-left px-2 py-1.5 text-xs rounded truncate font-mono block transition-colors"
                  :class="currentPost?.slug === item.slug && viewMode === 'detail'
                    ? 'bg-[#161b22] text-topic-etc font-bold border border-[#1f242c]'
                    : 'text-[#8b949e] hover:bg-[#11141a]'"
                >
                  {{ currentPost?.slug === item.slug && viewMode === 'detail' ? `▸ ${item.title}` : item.title }}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="p-3 border-t border-[#1f242c] bg-[#090a0f] text-[10px] font-mono text-[#484f58]">
          RUNTIME: VUE 3 SPA
        </div>
      </aside>

      <!-- 우측 메인 뷰어 영역 (넓은 여백 및 스크롤) -->
      <main class="w-full flex-1 bg-[#07080b] p-8 lg:p-12 overflow-y-auto">
        <div v-if="loading" class="font-mono text-xs text-[#8b949e] animate-pulse">
          FETCHING PAYLOAD FROM CDN...
        </div>

        <ShelfGrid
          v-else-if="viewMode === 'shelf'"
          :posts="allPosts"
          :subjects="Object.keys(listData.bySubject || {})"
          @select-post="emit('selectPost', $event)"
        />

        <PostViewer
          v-else-if="viewMode === 'detail' && currentPost"
          :post="currentPost"
          @select-post="emit('selectPost', $event)"
          @open-shelf="emit('openShelf')"
        />
      </main>
    </div>
  </div>
</template>