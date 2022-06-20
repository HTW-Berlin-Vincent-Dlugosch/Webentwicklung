<script lang="ts">
  import { supabase } from '$lib/supabaseclient';

  import type { definitions } from 'types/database';

  export let food: definitions['Food'];
  console.log(food);

  $: kiloJoules = Math.round(food.protein * 176 + food.carbohydrates * 172 + food.fat * 400);

  async function updateProduct() {
    const { data, error } = await supabase
      .from('Food')
      .update({
        name: food.name,
        fat: food.fat,
        protein: food.protein,
        carbohydrates: food.carbohydrates
      })
      .eq('bar_code', food.bar_code);
    console.log(data);
  }
</script>

<form
  class="col-span-1 grid max-w-lg auto-rows-max grid-cols-2 gap-4"
  on:submit|preventDefault={updateProduct}>
  <div class="col-span-1 grid">
    <label for="bar_code" class="text-sm">Bar Code</label>
    <input
      id="bar_code"
      class="rounded-md border-2 border-orange-100 p-2 outline-orange-300"
      type="number"
      name="bar_code"
      bind:value={food.bar_code}
      disabled />
  </div>
  <div class="col-span-1 grid">
    <label for="name" class="text-sm">Name</label>
    <input
      required
      id="name"
      class="rounded-md border-2 border-orange-100 p-2 outline-orange-300"
      type="text"
      name="name"
      bind:value={food.name} />
  </div>

  <div class="col-span-2 mt-4">Nutrients per 100 gram:</div>

  <div class="col-span-1 grid">
    <label for="fat" class="text-sm">Fat</label>
    <input
      max={100 - food.protein - food.carbohydrates}
      min="0"
      step="0.1"
      required
      id="fat"
      class="rounded-md border-2 border-orange-100 p-2 outline-orange-300"
      type="number"
      name="fat"
      bind:value={food.fat} />
  </div>

  <div class="col-span-1 grid">
    <label for="carbohydrates" class="text-sm">Carbohydrates</label>
    <input
      max={100 - food.protein - food.fat}
      min="0"
      step="0.1"
      required
      id="carbohydrates"
      class="rounded-md border-2 border-orange-100 p-2 outline-orange-300"
      type="number"
      name="carbohydrates"
      bind:value={food.carbohydrates} />
  </div>
  <div class="col-span-1 grid">
    <label for="protein" class="text-sm">Protein</label>
    <input
      max={100 - food.fat - food.carbohydrates}
      min="0"
      step="0.1"
      required
      id="protein"
      class="rounded-md border-2 border-orange-100 p-2 outline-orange-300"
      type="number"
      name="protein"
      bind:value={food.protein} />
  </div>
  <div class="col-span-1 grid">
    <label for="kilojoules" class="text-sm">Kilojoules</label>
    <input
      disabled
      step="0.1"
      id="kilojoules"
      class="rounded-md border-2 border-orange-100 p-2 outline-orange-300"
      type="number"
      name="kilojoules"
      value={kiloJoules} />
  </div>

  <button class="rounded-md border-2 bg-orange-300 p-2" type="submit">Update Product</button>
</form>
