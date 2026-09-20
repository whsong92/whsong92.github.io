<script setup lang="ts">
defineProps<{
  subject?: string;
  date?: string;
  viewMode: 'shelf' | 'detail';
}>();

const emit = defineEmits<{
  (e: 'openShelf'): void;
}>();
</script>

<template>
  <header class="w-full border-b border-[#1f242c] bg-[#0b0c12] px-4 py-2.5 flex items-center justify-between font-mono text-xs text-[#8b949e]">
    <!-- 좌측: 허브 식별자 및 현재 서브젝트 -->
    <div class="flex items-center gap-2">
      <span class="inline-block w-2 h-2 rounded-full bg-topic-etc"></span>
      <span class="text-[#f0f6fc] font-bold tracking-wider uppercase">HUB_ETC // VUE 3</span>
      <span class="text-[#30363d]">/</span>
      <span class="text-topic-etc">
        {{ viewMode === 'shelf' ? 'ARCHIVE_SHELF' : `#${subject || 'INDEX'}` }}
      </span>
    </div>

    <!-- 우측: 모아보기 전환 버튼 & 날짜 -->
    <div class="flex items-center gap-3">
      <button
        type="button"
        @click="emit('openShelf')"
        class="hover:text-topic-etc transition-colors text-[11px]"
        :class="{ 'text-topic-etc font-bold underline': viewMode === 'shelf' }"
      >
        [SHELF_VIEW]
      </button>
      <span class="text-[#30363d]">|</span>
      <span class="text-[11px]">DATE: {{ date || 'STANDBY' }}</span>
    </div>
  </header>
</template>