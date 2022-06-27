<script lang="ts">
  import Serving from '$lib/components/tracker/serving.svelte';
  import Icon from '@iconify/svelte';
  import { servings } from '$lib/stores/servingStore';
  import { selectedDate } from '$lib/stores/dateStore';

  export let meal: string;
</script>

<div class="grid gap-4">
  <div>
    <div class="grid grid-flow-col">
        <h2 class=" my-auto">{meal}:</h2>
      {#if $selectedDate.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)}
        <a href="./scan?meal={meal}" class="justify-self-end">
          <button class="rounded-full bg-orange-300 p-2"
            ><Icon width="20" icon="akar-icons:plus" /></button>
        </a>
      {/if}
    </div>
  </div>
  {#if $servings}
    {#each $servings as serving}
      {#if serving.meal === meal}
        <Serving {serving} />
      {/if}
    {/each}
  {/if}
</div>
