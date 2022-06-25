<script lang="ts">
  import Datepicker from '$lib/components/datepicker.svelte';
  import Meal from '$lib/components/meal.svelte';
  import { servings } from '$lib/stores/servingStore';
  import { supabase } from '$lib/supabaseclient';
  import type { definitions } from 'types/database';

  let selectedDate: Date;

  async function updateServings(date: Date) {
    if (!date) return;
    date.setHours(0, 0, 0, 0);
    const afterDate = date.toISOString();
    date.setHours(23, 59, 59, 99);
    const beforeDate = date.toISOString();

    const { data } = await supabase
      .from<definitions['UserAteFood'] & { Food: definitions['Food'] }>('UserAteFood')
      .select(`*, Food(*)`)
      .gte('created_at', afterDate)
      .lte('created_at', beforeDate);
    if (data) servings.set(data);
    console.log(data);
  }
  $: updateServings(selectedDate);
</script>

<div class="grid gap-4">
  <Datepicker bind:selectedDate />
  <Meal meal="Breakfast" />
  <Meal meal="Lunch" />
  <Meal meal="Dinner" />
</div>
