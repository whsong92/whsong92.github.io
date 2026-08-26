<script>
    import { onMount } from "svelte";
    import HomePage from "@/views/svelte/HomePage.svelte";
    import SubPage from "@/views/svelte/SubPage.svelte";

    let currentPath =
        typeof window !== "undefined" ? window.location.pathname : "/svelte";

    function navigate(path) {
        window.history.pushState({}, "", path);
        currentPath = path;
    }

    function handlePopState() {
        currentPath = window.location.pathname;
    }

    onMount(() => {
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    });
</script>

<div>
    {#if currentPath === "/svelte/sub"}
        <SubPage {navigate} />
    {:else}
        <HomePage {navigate} />
    {/if}
</div>
