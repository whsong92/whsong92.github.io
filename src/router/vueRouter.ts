import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/vue/HomePage.vue';
import SubPage from '@/views/vue/SubPage.vue';

export const vueRouter = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/vue', component: HomePage },
        { path: '/vue/sub', component: SubPage },
    ],
});