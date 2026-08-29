// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';

// 실행 환경 구분
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
    site: isProd ? 'https://whsong92.github.io' : 'http://localhost:4321',
    // 프로덕션 빌드 시에만 /swhBlog 하위 경로를 기본 base로 지정
    base: isProd ? '/' : '/',

    server: {
        host: '0.0.0.0',
        port: 4321
    },
    integrations: [react(), vue(), svelte()],
    vite: {
        plugins: [tailwindcss()],
    },
});