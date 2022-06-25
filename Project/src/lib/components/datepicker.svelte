<script lang="ts">
  import Icon from '@iconify/svelte';
  export let selectedDate: Date;
  function changeDate(numberOfDays: number) {
    selectedDate.setDate(selectedDate.getDate() + numberOfDays);
    selectedDate = selectedDate;
  }
</script>

<div class="grid grid-flow-col justify-evenly rounded-md border-2 border-orange-300 p-2">
  <button class="rounded-full bg-orange-300 p-2" on:click={() => changeDate(-1)}>
    <Icon width="20" icon="akar-icons:arrow-left" /></button>
  <div class="place-self-center align-middle text-xl">{selectedDate.toLocaleDateString()}</div>

  <button class="rounded-full bg-orange-300 p-2" on:click={() => changeDate(1)}
    ><Icon width="20" icon="akar-icons:arrow-right" /></button>
</div>
