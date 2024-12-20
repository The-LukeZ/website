<script>
  let { children, id = "" } = $props();
</script>

<section {id} class="flex h-fit flex-col lg:px-4 px-5">
  <div class="mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
    {@render children()}
  </div>
</section>
