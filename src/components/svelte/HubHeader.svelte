<script lang="ts">
  interface Props {
    subject?: string;
    date?: string;
  }

  let { subject, date }: Props = $props();
</script>

<header
  class="w-full border-b border-[#1f242c] bg-[#0b0c12] px-4 py-2.5 flex items-center justify-between font-mono text-xs text-[#8b949e]">
  <div class="flex items-center gap-2">
    <span class="inline-block w-2 h-2 rounded-full bg-topic-learning"></span>
    <span class="text-[#f0f6fc] font-bold tracking-wider uppercase">HUB_STUDY // SVELTE 5</span>
    <span class="text-[#30363d]">/</span>
    <span class="text-topic-learning">#{subject || "INDEX"}</span>
  </div>

  <div class="flex items-center gap-3">
    <span class="text-[11px]">DATE: {date || "STANDBY"}</span>
  </div>
</header>
