<script lang="ts">
  import { supabase } from '$lib/supabaseclient';
  import type { definitions } from 'types/database';
  import Serving from './serving.svelte';
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  import { dataset_dev } from 'svelte/internal';
  export let meal: string;
  export let selectedDate: Date;

  // console.log(afterDate, beforeDate);
  let servings: (definitions['UserAteFood'] & { Food: definitions['Food'] })[] | null;
  $: (async () => {
    selectedDate.setHours(0, 0, 0, 0);
    const afterDate = new Date(selectedDate);
    selectedDate.setHours(23, 59, 59, 99);
    const beforeDate = new Date(selectedDate);
    const {data} = await supabase
      .from<definitions['UserAteFood'] & { Food: definitions['Food'] }>('UserAteFood')
      .select(`*, Food(*)`)
      .eq('meal', meal)
      .gte('created_at', afterDate.toISOString())
      .lte('created_at', beforeDate.toISOString());
    servings = data;
  })();

  supabase
    .from<definitions['UserAteFood']>('UserAteFood')
    .on('DELETE', () => {
      servings = servings
    })
    .subscribe();
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
  {#if servings}
    {#each servings as serving}
      <Serving {serving} />
    {/each}
  {/if}
</div>
