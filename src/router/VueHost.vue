<script setup>
import { shallowRef, onMounted, getCurrentInstance } from 'vue';
import { RouterView } from 'vue-router';
import { vueRouter } from './vueRouter';

const isReady = shallowRef(false);
const app = getCurrentInstance()?.appContext.app;

if (app && !app._installedPlugins?.has(vueRouter)) {
  app.use(vueRouter);
}

onMounted(async () => {
  await vueRouter.isReady();
  isReady.value = true;
});
</script>

<template>
  <div v-if="isReady">
    <RouterView />
  </div>
  <div v-else class="text-sm text-gray-400">Loading Vue...</div>
</template>