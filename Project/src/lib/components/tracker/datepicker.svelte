<script lang="ts">
  import Icon from '@iconify/svelte';
  import { selectedDate } from '$lib/stores/dateStore';
  function changeDate(numberOfDays: number) {
    selectedDate.update((date) => {
      date.setDate(date.getDate() + numberOfDays);
      return date;
    });
  }
</script>

<div class="grid grid-flow-col justify-between rounded-md border-2 border-transparent p-2">
  <button class="rounded-full bg-orange-300 p-2" on:click={() => changeDate(-1)}>
    <Icon width="20" icon="akar-icons:arrow-left" /></button>
  <div class="place-self-center align-middle text-xl">{$selectedDate.toLocaleDateString()}</div>

  <button class="rounded-full bg-orange-300 p-2" on:click={() => changeDate(1)}
    ><Icon width="20" icon="akar-icons:arrow-right" /></button>
</div>
