<script>
  import { page } from "$app/state";
  import { env } from "$env/dynamic/public";
  import ky from "ky";
  import { onMount } from "svelte";

  let year = $state(2025);

  onMount(async () => {
    if (!page.data.year) {
      console.debug("Fetching year from server...");
      ky.get(env.PUBLIC_BASE_URL + "/api/date")
        .json()
        .then((res) => {
          year = res.year;
          page.data.year = res.year;
          page.data.date = res.date;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
</script>

<div class="relative bottom-0 left-0 right-0 mt-auto min-h-5"></div>

<div class="h-[2px] w-full border-spacing-2 bg-base-content opacity-50"></div>

{#snippet footerLink(/** @type {string} */ href, /** @type {string} */ displayText, /** @type {string} */ target = "_self")}
  <a {href} {target} class="dy-link-hover dy-link">{displayText}</a>
{/snippet}

<footer
  class="pt-15 dy-footer dy-footer-center relative bottom-0 left-0 right-0 justify-items-center bg-transparent p-10 pb-5 text-base-content"
>
  <nav class="grid grid-flow-col gap-4">
    {@render footerLink("/impressum", "Impressum")}
    {@render footerLink("/setlist", "Setlist")}
    {@render footerLink("https://github.com/The-LukeZ/burningdezibelz", "GitHub", "_blank")}
  </nav>
  <aside>
    <p id="copyright">
      Copyright © <span id="year">{year}</span> - Alle Rechte vorbehalten
    </p>
  </aside>
  <nav class="grid grid-flow-col gap-4">
    <a class="dy-link-hover dy-link text-xs" href="/dash/login">Intern</a>
  </nav>
</footer>
