<script>
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <title>Dashboard | Burning Dezibelz</title>
  <meta name="description" content="Dashboard" />
  <meta name="robots" content="noindex" />
</svelte:head>

{@render children()}

<Footer />
