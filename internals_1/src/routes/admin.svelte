<script lang="ts">
  import { currentUser } from '$lib/stores';
  import { UserGroup } from '$lib/user';
  import Studentlist from '$lib/components/list/student/studentlist.svelte';
  import Stafflist from '$lib/components/list/staff/stafflist.svelte';
  let showStudents = true;
</script>

<div class="grid columns-2 gap-4">
  <h1 class="col-span-2 text-4xl">Admin Page</h1>
  {#if $currentUser.group === UserGroup.ADMIN}
    <button
      on:click={() => (showStudents = true)}
      class="col-span-1 w-32 rounded-md bg-blue-300 p-2">Students</button>
    <button
      on:click={() => (showStudents = false)}
      class="col-span-1 w-32 rounded-md bg-blue-300 p-2">Staff</button>
    {#if showStudents}
      <Studentlist />
    {:else}
      <Stafflist />
    {/if}
  {:else}
    <p class="col-span-2 text-red-500">You are not an admin</p>
  {/if}
</div>
