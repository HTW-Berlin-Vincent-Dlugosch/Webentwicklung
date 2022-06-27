<script lang="ts">
  import Datepicker from '$lib/components/tracker/datepicker.svelte';
  import Meal from '$lib/components/tracker/meal.svelte';
  import { servings } from '$lib/stores/servingStore';
  import { supabase } from '$lib/supabaseclient';
  import type { definitions } from 'types/database';
  import { selectedDate } from '$lib/stores/dateStore';

  $: (async function updateServings() {
    const afterDate = new Date($selectedDate.setHours(0, 0, 0, 0)).toISOString();
    const beforeDate = new Date($selectedDate.setHours(23, 59, 59, 99)).toISOString();
    const { data } = await supabase
      .from<definitions['UserAteFood'] & { Food: definitions['Food'] }>('UserAteFood')
      .select(`grams, meal_id, meal, Food(name)`)
      .gte('created_at', afterDate)
      .lte('created_at', beforeDate);
    if (data) servings.set(data);
  })();
</script>

<div class="grid gap-4">
  <Datepicker />
  <Meal meal="Breakfast" />
  <Meal meal="Lunch" />
  <Meal meal="Dinner" />
</div>
