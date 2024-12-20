<script>
  import { goto } from "$app/navigation";
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import dayjs from "dayjs";
  import { onMount } from "svelte";

  let { data } = $props();
  /** @type {any[]} */
  let concerts = $state(data.concerts);
  let stillLoading = $derived(concerts == null);
  let innerWidth = $state(0);

  let concertId = $state(null);
  let concertData = $derived.by(() => {
    console.log("Concert ID changed", concertId);
    if (!concertId) return null;

    let concert = concerts.find((c) => c._id === concertId);

    if (!concert && concerts) {
      console.log("Concert not found in current page, fetching from server...");
      concert = {
        _id: "123",
        name: "Test Concert",
        date: new Date(),
        link: "https://google.com",
      };
    }

    return concert;
  });

  $effect(() => {
    console.log("Concerts changed", $state.snapshot(concerts));
  });

  $effect(() => {
    showConcertDetails(concertId);
  });

  onMount(async () => {
    const idFromUrl = window.location.hash.slice(1);
    console.log("ID from URL:", idFromUrl);

    if (idFromUrl) concertId = idFromUrl;
  });

  /** @param {string} id */
  function showConcertDetails(id) {
    /** @type {HTMLDialogElement | any} */
    const concert_modal = document.getElementById("concertModal");
    if (id) {
      concert_modal.showModal();
    } else {
      concert_modal.close();
    }
  }

  /** @param {Event} event */
  function closeModal(event) {
    event.preventDefault();
    concertId = null;
    return goto("");
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && concertId) {
      concertId = null;
      return goto("");
    }
  }
</script>

<svelte:head>
  <title>Konzert-Übersicht | Burning Dezibelz</title>
  <meta name="description" content="Übersicht aller Konzerte" />
  <meta name="robots" content="index, follow" />
</svelte:head>

<svelte:window onkeydowncapture={handleKeyDown} bind:innerWidth />

<Navbar />

<div class="fixed left-0 right-0 top-0 z-[-1] min-h-screen bg-gradient-to-b from-black to-transparent"></div>

<SiteHeader text="Konzerte" />

<!--
  <h2 class="dy-card-title">{concert.name}</h2>
  <p>{dayjs(concert.date).toDate().toLocaleDateString("de", { dateStyle: "full" })}</p>
  <div class="dy-card-actions ml-auto flex justify-end">
  <a role="button" class="dy-btn dy-btn-outline" href={`konzerte#${concert._id}`}>Details</a>
-->

{#snippet concertRow(/** @type {any} */ concert)}
  <tr class="dy-hover bg-base-200 p-2">
    <td class="concertTableCell w-[35%]">{dayjs(concert.date).toDate().toLocaleDateString("de", { dateStyle: "full" })}</td>
    <td class="concertTableCell w-[40%] text-lg font-bold text-primary md:dy-link-hover"
      ><a class="dy-link-hover dy-link" href={concert.link} target="_blank">{concert.name}</a></td
    >
    <td class="concertTableCell w-[25%]"
      ><a
        type="checkbox"
        aria-label="Checkbox"
        class="dy-btn dy-btn-outline dy-btn-block"
        href={`#${concert._id}`}
        onclick={() => {
          concertId = concert._id;
        }}>Mehr Infos</a
      ></td
    >
    <!-- Button for more infos -->
  </tr>
{/snippet}

<div id="concerts" class="flex w-full flex-col items-center text-center">
  {#if concerts.length === 0 && stillLoading}
    <span class="dy-loading dy-loading-spinner"></span>
  {:else if concerts.length === 0 && !stillLoading}
    <div role="alert" class="dy-alert dy-alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Keine Konzerte gefunden!</span>
    </div>
  {:else if concerts.length > 0 && !stillLoading}
    <div class="w-full resize-x overflow-y-visible md:max-w-[1400px]">
      <table class="w-full table-auto text-center">
        <thead>
          <tr>
            <th class="w-[40%]">Ort</th>
            <th class="w-[40%]">Datum & Zeit</th>
            <th class="w-[20%]"></th>
          </tr>
        </thead>
        <tbody class="rounded-lg">
          {#each concerts as concert}
            {@render concertRow(concert)}
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<dialog id="concertModal" class="dy-modal">
  <div class="dy-modal-box">
    <form method="dialog" onsubmit={closeModal}>
      <button class="dy-btn dy-btn-square absolute right-4 top-4">
        <img src="/cross.svg" alt="X" class="dy-btn dy-btn-md" />
      </button>
    </form>

    <!-- Items -->
    <div class="flex flex-col items-center gap-4">
      <h2 class="dy-card-title">Konzertname</h2>
      <p>Datum: {dayjs(concertData?.date).toDate().toLocaleDateString()}</p>
      <p>Uhrzeit: {dayjs(concertData?.date).toDate().toLocaleTimeString()}</p>
      <p>Ort: {concertData?.location}</p>
      <p>Preis</p>
      <p>Link</p>
    </div>
  </div>
  <form method="dialog" class="dy-modal-backdrop" onsubmit={closeModal}>
    <button>close</button>
  </form>
</dialog>

<!-- <div class="dy-divider"></div>
<div class="dy-join self-center">
  <button id="pageBack" class="dy-btn dy-join-item" disabled={concerts.length == 0 || stillLoading}>«</button>
  <button id="pageSet" class="dy-btn dy-join-item" disabled={concerts.length == 0 || stillLoading}>Page {data.pageNumber}</button>
  <button id="pageForward" class="dy-btn dy-join-item" disabled={concerts.length == 0 || stillLoading}>»</button>
</div> -->

<Footer />
