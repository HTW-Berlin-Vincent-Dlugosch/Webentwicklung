<script lang="ts">
  import Serving from './serving.svelte';
  import Icon from '@iconify/svelte';
  import { servings } from '$lib/stores/servingStore';
  
  export let meal: string;
</script>

<div class="grid gap-4">
  <div>
    <div class="grid grid-flow-col">
      <h2>{meal}:</h2>
      <a href="./scan?meal={meal}" class="justify-self-end">
        <button class="rounded-full bg-orange-300 p-2"
          ><Icon width="20" icon="akar-icons:plus" /></button>
      </a>
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
