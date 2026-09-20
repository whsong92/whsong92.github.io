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
  <div class="w-full flex flex-col min-h-[calc(100vh-8rem)]">
    <!-- 모바일 Header -->
    <HubHeader
      :subject="currentPost?.subject"
      :date="currentPost?.date"
      :view-mode="viewMode"
      @open-shelf="emit('openShelf')"
    />

    <!-- 모바일 아코디언 디렉터리 드로어 -->
    <details class="w-full border-b border-[#1f242c] bg-[#0e1017] text-xs font-mono group">
      <summary class="px-4 py-3 cursor-pointer list-none flex items-center justify-between text-[#8b949e]">
        <span class="flex items-center gap-2 font-bold text-topic-etc">
          <span>📁</span> SUBJECT DIRECTORY ({{ listData.total }})
        </span>
        <span class="text-[10px] text-[#484f58] group-open:rotate-180 transition-transform">▼</span>
      </summary>
      <div class="p-4 border-t border-[#1f242c] space-y-3 bg-[#0a0c10]">
        <button
          type="button"
          @click="emit('openShelf')"
          class="w-full text-left py-1.5 px-2 text-xs font-mono border border-[#30363d] text-topic-etc bg-[#11141a]"
        >
          ❖ VIEW ALL SHELF (모아보기)
        </button>

        <div v-for="(items, subject) in listData.bySubject" :key="subject" class="space-y-1">
          <div class="text-[11px] font-bold text-[#e6edf3]">// {{ subject }}</div>
          <ul class="pl-2 space-y-1">
            <li v-for="item in items" :key="item.slug">
              <button
                type="button"
                @click="emit('selectPost', item.slug)"
                class="w-full text-left py-1 text-xs truncate font-mono"
                :class="currentPost?.slug === item.slug && viewMode === 'detail' ? 'text-topic-etc font-bold' : 'text-[#8b949e]'"
              >
                {{ currentPost?.slug === item.slug && viewMode === 'detail' ? `▸ ${item.title}` : item.title }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </details>

    <!-- 모바일 메인 뷰어 영역 -->
    <main class="w-full flex-1 p-4 overflow-y-auto">
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
</template>