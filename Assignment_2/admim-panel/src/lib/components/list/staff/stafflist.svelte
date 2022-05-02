<script>
	import Addpersonform from '$lib/components/list/addpersonform.svelte';
	import Listitemperson from '$lib/components/list/listitemperson.svelte';
	import { staff } from '$lib/stores';
	import Stafflisthead from './stafflisthead.svelte';
</script>

<h2 class="col-span-2 text-2xl">Staff:</h2>
<Addpersonform studentForm={false} />
<Stafflisthead />
{#each Array.from($staff.values()) as person, index}
	<Listitemperson isStudent={false} {...person} {index} />
{/each}
