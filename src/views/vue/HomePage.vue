<script setup>
import { ref, onMounted } from 'vue';
import { fetchPostList, fetchPostContent } from '@/lib/github';
import VueEditorModal from '@/components/vue/VueEditorModal.vue';

const posts = ref([]);
const selectedPost = ref(null);
const loading = ref(false);
const isModalOpen = ref(false);

const loadPosts = async () => {
  posts.value = await fetchPostList();
};

onMounted(loadPosts);

const handleRead = async (url) => {
  loading.value = true;
  selectedPost.value = await fetchPostContent(url);
  loading.value = false;
};
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between border-b pb-4">
      <div>
        <h2 class="text-2xl font-bold text-emerald-600">Vue Blog Hub</h2>
        <div class="flex gap-2 mt-2">
          <a href="/" class="text-xs px-2.5 py-1 bg-gray-200 rounded hover:bg-gray-300">Astro 메인</a>
          <a href="/react" class="text-xs px-2.5 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">React 허브</a>
          <a href="/svelte" class="text-xs px-2.5 py-1 bg-amber-600 text-white rounded hover:bg-amber-700">Svelte 허브</a>
        </div>
      </div>
      <button @click="isModalOpen = true" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow cursor-pointer">
        + 새 글 작성
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="space-y-2">
        <h3 class="text-sm font-bold text-gray-500 uppercase">Articles ({{ posts.length }})</h3>
        <button
          v-for="p in posts"
          :key="p.slug"
          @click="handleRead(p.download_url)"
          class="w-full text-left p-3 rounded-lg border bg-white hover:border-emerald-400 transition shadow-sm"
        >
          <div class="font-semibold text-gray-800 text-sm">{{ p.name }}</div>
          <div class="text-xs text-emerald-600 mt-1">읽기 &rarr;</div>
        </button>
      </div>

      <div class="md:col-span-2 bg-white border rounded-xl p-6 min-h-[300px] shadow-sm">
        <div v-if="loading" class="text-gray-400">로딩 중...</div>
        <article v-else-if="selectedPost">
          <h1 class="text-2xl font-extrabold border-b pb-3 mb-4">{{ selectedPost.title }}</h1>
          <div class="prose max-w-none text-gray-800" v-html="selectedPost.html"></div>
        </article>
        <p v-else class="text-gray-400 text-center py-12">글을 선택해 주세요.</p>
      </div>
    </div>

    <VueEditorModal
      :isOpen="isModalOpen"
      @close="isModalOpen = false"
      @success="loadPosts"
    />
  </div>
</template>