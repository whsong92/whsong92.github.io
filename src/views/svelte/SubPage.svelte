<!-- src/views/svelte/SubPage.svelte -->
<script>
    export let navigate;
</script>

<div>
    <h2 class="text-xl font-bold text-amber-800">Svelte SubPage</h2>
    <div class="flex gap-2 mt-4">
        <button
            on:click={() => navigate("/svelte")}
            class="px-3 py-1 bg-amber-600 text-white rounded cursor-pointer"
        >
            Svelte 메인으로
        </button>
        <a href="/" class="px-3 py-1 bg-gray-500 text-white rounded"
            >Astro 메인</a
        >
    </div>
</div>
