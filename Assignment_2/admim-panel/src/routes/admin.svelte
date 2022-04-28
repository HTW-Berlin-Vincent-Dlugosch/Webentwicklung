<script lang="ts">
	import { currentUser } from '$lib/stores';
	import { UserGroup } from '$lib/user';
	let showStudents = false;
	let showStaff = false;
</script>

<h1 class="text-4xl">Admin Page</h1>
{#if $currentUser.group === UserGroup.ADMIN}
	<button
		on:click={() => {
			(showStudents = false), (showStaff = true);
		}}
		class="rounded-md bg-blue-300 p-2">Staff</button>
	<button
		on:click={() => {
			(showStudents = true), (showStaff = false);
		}}
		class="rounded-md bg-blue-300 p-2">Students</button>

	{#if showStudents && !showStaff}
		<h2 class="text-2xl">Students:</h2>
	{/if}
	{#if !showStudents && showStaff}
		<h2 class="text-2xl">Staff:</h2>
	{/if}
{/if}
