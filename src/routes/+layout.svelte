<script>
  import "../app.css";
  import EmbedInfo from "$lib/components/EmbedInfo.svelte";
  let { children } = $props();
</script>

<EmbedInfo siteName="Home" robots="index, follow" />

{@render children()}
