<script lang="ts">
  import { supabase } from '$lib/supabaseclient';

  import type { definitions } from 'types/database';

  export let food: definitions['Food'];
  console.log(food);
  function calculateCalories() {
    let calories = 0;
    if (food.protein && food.carbohydrates && food.fat) {
      calories = Math.round(food.protein * 4 + food.carbohydrates * 4 + food.fat * 9);
    }
    return calories;
  }
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
  }
</script>

<form class="grid grid-cols-2 gap-2" on:submit|preventDefault={updateProduct}>
  <div class=" col-span-1">
    <label for="bar_code">Bar Code</label>
    <input
      id="bar_code"
      class="rounded-md border-2 border-orange-100 p-2 outline-orange-300"
      type="number"
      name="bar_code"
      bind:value={food.bar_code}
      disabled />
  </div>
  <div class=" col-span-1">
    <label for="name">Name</label>
    <input
      required
      id="name"
      class="rounded-md border-2 border-orange-100 p-2 outline-orange-300"
      type="text"
      name="name"
      bind:value={food.name} />
  </div>

  <input
    required
    class="rounded-md border-2 border-orange-100 p-2 outline-orange-300"
    type="number"
    name="fat"
    bind:value={food.fat} />
  <input
    required
    class="rounded-md border-2 border-orange-100 p-2 outline-orange-300"
    type="number"
    name="carbohydrates"
    bind:value={food.carbohydrates} />
  <input
    required
    class="rounded-md border-2 border-orange-100 p-2 outline-orange-300"
    type="number"
    name="protein"
    bind:value={food.protein} />
  <input
    disabled
    class="rounded-md border-2 border-orange-100 p-2 outline-orange-300"
    type="number"
    name="calories"
    value={calculateCalories} />

  <button class="rounded-md border-2 border-orange-100 p-2 outline-orange-300" type="submit"
    >Update Product</button>
</form>
