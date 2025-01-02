<script>
  import "../app.css"; // ! Tailwind Stuff - Do not remove
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import EmbedInfo from "$lib/components/EmbedInfo.svelte";
  import { env } from "$env/dynamic/public";
  import ky from "ky";

  let { children } = $props();
  console.log("PUBLIC_BASE_URL", env.PUBLIC_BASE_URL);

  onMount(async () => {
    const _res = await ky.get(env.PUBLIC_BASE_URL + "/api/date").json();

    console.log("Date fetched", _res);
    page.data.date = _res.date;
    page.data.year = _res.year;
  });

  $effect(() => {
    console.log("Date changed", $state.snapshot(page.data.date));
  });
</script>

<EmbedInfo siteName="Home" robots="index, follow" />

{@render children()}
