<script>
  import "../app.css"; // ! Tailwind Stuff - Do not remove
  import EmbedInfo from "$lib/components/EmbedInfo.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { page } from "$app/state";

  let { children, data } = $props();
</script>

{#if !page.url.pathname.startsWith("api")}
  <EmbedInfo siteName="Home" robots="index, follow" />
{/if}

{@render children()}

<Footer />