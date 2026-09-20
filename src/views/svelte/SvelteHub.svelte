<script lang="ts">
  import { onMount } from "svelte";
  import SvelteMobile from "./SvelteMobile.svelte";
  import SveltePc from "./SveltePc.svelte";

  let listData = $state<{ total: number; bySubject: Record<string, any[]> }>({
    total: 0,
    bySubject: {},
  });
  let currentPost = $state<any>(null);
  let loading = $state<boolean>(true);

  async function loadPost(slug: string) {
    loading = true;
    try {
      const res = await fetch(`/data/posts/${slug}.json`);
      if (!res.ok) throw new Error(`Post fetch failed: ${res.status}`);
      currentPost = await res.json();
      history.replaceState(null, "", `?slug=${slug}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("[SVELTE-HUB] Failed to fetch post:", err);
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    try {
      // 1. learning.json 데이터 패치
      const res = await fetch("/data/lists/learning.json");
      if (!res.ok) throw new Error(`List fetch failed: ${res.status}`);
      listData = await res.json();

      // 2. 초기 로딩 대상 포스트 slug 추출
      const urlParams = new URLSearchParams(window.location.search);
      const firstSubjectPosts = Object.values(listData.bySubject || {})[0];
      const targetSlug =
        urlParams.get("slug") || (Array.isArray(firstSubjectPosts) ? firstSubjectPosts[0]?.slug : undefined);

      if (targetSlug) {
        await loadPost(targetSlug);
      } else {
        loading = false;
      }
    } catch (err) {
      console.error("[SVELTE-HUB] Init failed:", err);
      loading = false;
    }
  });
</script>

<!-- 🔻 <template> 태그를 제거하고 일반 div로 바로 렌더링합니다 🔻 -->
<div class="w-full max-w-none bg-[#090a0f] text-[#c9d1d9] font-sans border-x border-[#1f242c]">
  <!-- 1. 모바일 전용 쉘 (< 1024px) -->
  <div class="block lg:hidden w-full">
    <SvelteMobile {listData} {currentPost} {loading} onSelectPost={loadPost} />
  </div>

  <!-- 2. PC 데스크톱 전용 쉘 (>= 1024px) -->
  <div class="hidden lg:flex w-full">
    <SveltePc {listData} {currentPost} {loading} onSelectPost={loadPost} />
  </div>
</div>
