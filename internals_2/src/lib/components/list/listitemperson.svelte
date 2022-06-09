<script lang="ts">
  import type { Departments } from '$lib/uni';
  import { staff, students } from '$lib/stores';
  export let isStudent: boolean;
  export let id: number;
  export let firstName: string;
  export let lastName: string;
  export let dob: Date | undefined = undefined;
  export let gender: string;
  export let email: string;
  export let department: Departments | undefined = undefined;
  export let joinDate: Date;
  export let index: number;
  let showConfirmation = false;

  function deletePerson() {
    if (isStudent) {
      students.update((studentMap) => {
        studentMap.delete(id);
        return studentMap;
      });
    } else {
      staff.update((staffMap) => {
        staffMap.delete(id);
        return staffMap;
      });
    }
  }
</script>

<div
  class:bg-blue-300={index % 2 == 0}
  class:bg-blue-500={index % 2 != 0}
  class="col-span-2 grid auto-cols-fr grid-flow-col gap-2 rounded-md p-2">
  <div>{id}</div>
  <div>{firstName}</div>
  <div>{lastName || 'N/A'}</div>
  <div>{dob?.toLocaleDateString() || 'N/A'}</div>
  <div>{gender}</div>
  <div class="col-span-2">{email}</div>
  {#if department}
    <div>{department}</div>
  {/if}
  <div class="grid auto-cols-fr grid-flow-col gap-2">
    <button on:click={() => (showConfirmation = true)} class="rounded-md bg-red-500 text-center"
      >D</button>
    <button on:click={deletePerson} class="rounded-md bg-yellow-500 text-center">M</button>
  </div>
  {#if showConfirmation}
    <div class="grid gap-2 rounded-md bg-white p-2">
      <div>Confirm deletion:</div>
      <button on:click={deletePerson} class="rounded-md bg-red-500 text-center">Delete</button>
      <button
        on:click={() => (showConfirmation = false)}
        class="rounded-md bg-slate-500 text-center">Cancel</button>
    </div>
  {/if}
</div>
