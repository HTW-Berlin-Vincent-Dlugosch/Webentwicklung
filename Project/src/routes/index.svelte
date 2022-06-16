<script lang="ts">
  import type { definitions } from 'types/database/index';
  import Addoreditproduct from '$lib/components/editproduct.svelte';
  import Scanner from '$lib/components/scanner.svelte';
  import Search from '$lib/components/search.svelte';

  let promisedFood: Promise<definitions['Food']> | undefined = undefined;
</script>

<div class="grid grid-cols-2 justify-items-center gap-4">
  <div class="col-span-1 grid max-w-[500px] gap-4">
    <Scanner bind:promisedFood />
  </div>

  {#if promisedFood}
    {#await promisedFood}
      <div>Waiting</div>
    {:then food}
      <Addoreditproduct {food} />
    {:catch error}
      <div>{error}</div>
    {/await}
  {/if}
  <Search />
</div>
