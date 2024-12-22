<script>
  import EmbedInfo from "$lib/components/EmbedInfo.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();
</script>

<EmbedInfo siteName="Dashboard" optionalDescription="Dashboard" robots="noindex, nofollow" />

{@render children()}

<Footer />
