<script>
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
</script>

<svelte:head>
  <title>Impressum | Burning Dezibelz</title>
  <meta name="description" content="Impressum von Burning Dezibelz" />
  <meta name="robots" content="noindex" />
</svelte:head>

<Navbar />

<SiteHeader text="Impressum" />

<div class="mx-auto flex w-full max-w-[1000px] items-center justify-between p-4">
  <article class="prose w-full text-slate-300">
    <p>Angaben gemäß § 5 TMG</p>

    <ul class="list-none">
      <li class="mb-0 mt-0">Max Mustermann</li>
      <li class="mb-0 mt-0">Musterstraße 1</li>
      <li class="mb-0 mt-0">12345 Musterstadt</li>
      <li class="mb-0 mt-0">Deutschland</li>
    </ul>
    <p>
      Email: <a href="mailto:burningdezibelz@gmail.com" target="_blank" class="dy-link-primary">burningdezibelz@gmail.com</a>
    </p>
  </article>
</div>

<Footer />
