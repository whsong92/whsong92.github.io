/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue,svelte}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                carbon: '#0E0F12',
                paper: '#F4F4F5',
                silver: {
                    line: '#9ca3b1ff',
                    muted: '#A1A4B2',
                    bright: '#E2E4E9',
                },
                topic: {
                    learning: '#FF5722',
                    ai: '#38BDF8',
                    misc: '#34D399',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['"Space Grotesk"', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};