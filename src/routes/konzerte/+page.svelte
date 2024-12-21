<script>
  import { goto } from "$app/navigation";
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import dayjs from "dayjs";
  import { onMount } from "svelte";

  let { data } = $props();
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
    }

    return concert || null;
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
            <th class="w-[40%]">Datum & Zeit</th>
            <th class="w-[40%]">Ort</th>
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
    <form method="dialog" onsubmit={closeModal} class="flex justify-end">
      <button class="dy-btn dy-btn-square z-[100]">
        <img src="/cross.svg" alt="X" class="dy-btn dy-btn-md" />
      </button>
    </form>

    <!-- ? Maybe add 'class="border-r border-base-300"' to each first table cell -->

    {#snippet concertDetailRow(/** @type {string} */ key, /** @type {string | Array} */ value)}
      <tr>
        <td style="font-weight: bold; text-align: center; font-size: larger;">{key}</td>
        <td style="text-align: center;">{@html Array.isArray(value) ? value.join("<br />") : value}</td>
      </tr>
    {/snippet}

    <!-- Items -->
    <div class="flex flex-col items-center gap-4">
      <table class="dy-table dy-table-md border-collapse">
        <tbody>
          <tr>
            <td style="font-weight: bold; text-align: center; font-size: x-large;" class="py-4" colspan="2"
              >{concertData?.name}</td
            >
          </tr>
          {@render concertDetailRow("Datum", dayjs(concertData?.date).toDate().toLocaleDateString())}
          {@render concertDetailRow("Uhrzeit", dayjs(concertData?.date).toDate().toLocaleTimeString())}
          {@render concertDetailRow("Ort", [
            concertData?.location?.name,
            concertData?.location?.address,
            `${concertData?.location?.postalCode} ${concertData?.location?.city}`,
          ])}
          {#if concertData?.abendkasse || concertData?.tickets}
            <tr>
              <td style="font-weight: bold; text-align: center; font-size: larger;">Tickets</td>
              <td style="text-align: center;" class="flex flex-col space-y-2">
                {#if concertData?.abendkasse}
                  <span>An der Abendkasse</span>
                {/if}
                {#if concertData?.tickets}
                  <span>
                    <a href={concertData.tickets} role="button" target="_blank" class="dy-btn dy-btn-ghost dy-btn-sm"
                      >Zu den Tickets</a
                    >
                  </span>
                {/if}
              </td>
            </tr>
          {/if}
          {#if concertData?.price}
            {@render concertDetailRow("Preis", concertData?.price.toString())}
          {/if}
          {#if concertData?.link}
            <tr>
              <td colspan="2" class="items-center text-center">
                <a href={concertData?.link} role="button" target="_blank" class="dy-btn dy-btn-outline dy-btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                  <span class="ml-2">Zur Location</span>
                </a>
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
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
