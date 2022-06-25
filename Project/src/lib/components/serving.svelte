<script lang="ts">
  import { supabase } from '$lib/supabaseclient';
  import type { definitions } from 'types/database';
  import { servings } from '$lib/stores/servingStore';

  export let serving: definitions['UserAteFood'] & { Food: definitions['Food'] };

  async function deleteServing(mealId: number) {
    await supabase
      .from<definitions['UserAteFood'] & { Food: definitions['Food'] }>('UserAteFood')
      .delete()
      .eq('meal_id', mealId);
    servings.update((s) => s.filter((s) => s.meal_id !== mealId));
  }
</script>

<div class="grid grid-flow-col rounded-md border-2 border-orange-200 p-2">
  <div>{serving.Food.name}</div>
  <div class="justify-self-end">{serving.grams}g</div>
  <button
    class="justify-self-end rounded-md bg-red-500 p-2"
    on:click={() => deleteServing(serving.meal_id)}
    >Delete
  </button>
</div>
