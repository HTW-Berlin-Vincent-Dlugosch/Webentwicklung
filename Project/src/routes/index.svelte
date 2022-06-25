<script lang="ts">
  import Datepicker from '$lib/components/datepicker.svelte';
  import Meal from '$lib/components/meal.svelte';
import { onMount } from 'svelte';
  let selectedDate = new Date();

</script>

<div class="grid gap-4">
  <Datepicker bind:selectedDate />

  <Meal {selectedDate} meal="Breakfast" />
  <Meal {selectedDate} meal="Lunch" />
  <Meal {selectedDate} meal="Dinner" />

</div>
