<script lang="ts">
  import { staff, students } from '$lib/stores';
  export let id: number;
  let showConfirmation = false;

  function deletePerson() {
    if ($students.has(id)) {
      students.update((studentMap) => {
        studentMap.delete(id);
        return studentMap;
      });
    }
    if ($staff.has(id)) {
      staff.update((staffMap) => {
        staffMap.delete(id);
        return staffMap;
      });
    }
    showConfirmation = false;
  }
</script>

{#if !showConfirmation}
  <div class="grid auto-cols-fr grid-flow-col gap-2">
    <button on:click={() => (showConfirmation = true)} class="rounded-md bg-red-500 text-center"
      >D</button>
    <button on:click={deletePerson} class="rounded-md bg-yellow-500 text-center">M</button>
  </div>
{:else}
  <div class="grid gap-2 rounded-md bg-white p-2">
    <div>Confirm deletion:</div>
    <button on:click={deletePerson} class="rounded-md bg-red-500 text-center">Delete</button>
    <button on:click={() => (showConfirmation = false)} class="rounded-md bg-slate-500 text-center"
      >Cancel</button>
  </div>
{/if}
