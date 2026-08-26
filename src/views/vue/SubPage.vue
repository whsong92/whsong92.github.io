<!-- src/views/vue/SubPage.vue -->
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <div>
    <h2 class="text-xl font-bold text-emerald-800">Vue SubPage</h2>
    <div class="flex gap-2 mt-4">
      <button @click="router.push('/vue')" class="px-3 py-1 bg-emerald-600 text-white rounded cursor-pointer">
        Vue 메인으로
      </button>
      <a href="/" class="px-3 py-1 bg-gray-500 text-white rounded">Astro 메인</a>
    </div>
  </div>
</template>