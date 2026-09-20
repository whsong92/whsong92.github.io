<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import VueMobile from './VueMobile.vue';
import VuePc from './VuePc.vue';

interface PostItem {
  slug: string;
  title: string;
  date: string;
  subject: string;
  description?: string;
  rating?: number | null;
  [key: string]: any;
}

const listData = ref<{
  total: number;
  bySubject: Record<string, PostItem[]>;
  posts?: PostItem[];
}>({ total: 0, bySubject: {} });

const currentPost = ref<any>(null);
const loading = ref(true);
const viewMode = ref<'shelf' | 'detail'>('shelf');

const allPosts = computed(() => {
  if (listData.value.posts && listData.value.posts.length > 0) {
    return listData.value.posts;
  }
  return Object.values(listData.value.bySubject).flat();
});

async function loadPost(slug: string) {
  loading.value = true;
  try {
    const res = await fetch(`/data/posts/${slug}.json`);
    currentPost.value = await res.json();
    viewMode.value = 'detail';
    history.replaceState(null, "", `?slug=${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

function openShelf() {
  viewMode.value = 'shelf';
  history.replaceState(null, "", "/vue");
}

onMounted(async () => {
  const res = await fetch("/data/lists/etc.json");
  listData.value = await res.json();

  const urlParams = new URLSearchParams(window.location.search);
  const targetSlug = urlParams.get("slug");

  if (targetSlug) {
    await loadPost(targetSlug);
  } else {
    viewMode.value = 'shelf';
    loading.value = false;
  }
});
</script>

<template>
  <div class="w-full max-w-none bg-[#090a0f] text-[#c9d1d9] font-sans border-x border-[#1f242c]">
    <!-- 1. 모바일 전용 쉘 (화면 폭 < 1024px) -->
    <VueMobile
      class="block lg:hidden"
      :list-data="listData"
      :all-posts="allPosts"
      :current-post="currentPost"
      :loading="loading"
      :view-mode="viewMode"
      @select-post="loadPost"
      @open-shelf="openShelf"
    />

    <!-- 2. PC 데스크톱 전용 쉘 (화면 폭 >= 1024px) -->
    <VuePc
      class="hidden lg:flex"
      :list-data="listData"
      :all-posts="allPosts"
      :current-post="currentPost"
      :loading="loading"
      :view-mode="viewMode"
      @select-post="loadPost"
      @open-shelf="openShelf"
    />
  </div>
</template>