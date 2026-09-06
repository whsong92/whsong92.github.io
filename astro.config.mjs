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
    integrations: [
        // React 플러그인이 React 파일(.tsx, .jsx)에만 한정 동작하도록 격리
        react({
            include: ['src/**/*.{jsx,tsx}'],
        }),
        // Vue는 오직 .vue 확장자 파일만 컴파일
        vue({
            include: ['src/**/*.vue'],
        }),
        // Svelte는 오직 .svelte 확장자 파일만 컴파일
        svelte({
            include: ['src/**/*.svelte'],
        })],
    vite: {
        plugins: [tailwindcss()],
    },
});