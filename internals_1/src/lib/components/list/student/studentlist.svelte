<script lang="ts">
	import Addpersonform from '$lib/components/list/addpersonform.svelte';
	import Listitemperson from '$lib/components/list/listitemperson.svelte';
	import { students } from '$lib/stores';
	import Studentlisthead from './studentlisthead.svelte';
</script>

<h2 class="col-span-2 text-2xl">Students:</h2>
<Addpersonform studentForm={true} />
<Studentlisthead />
{#each Array.from($students.values()) as person, index}
	<Listitemperson isStudent={true} {...person} {index} />
{/each}
