<script lang="ts">
	import { page } from "$app/stores";
	export let index: number;
    export let courseName: string;
</script>

<div
	class:bg-blue-300={index % 2 == 0}
	class:bg-blue-500={index % 2 != 0}
	class="col-span-2 grid auto-cols-fr grid-flow-col gap-2 rounded-md p-2">
	<div>{courseName}</div>
	<a href="courses/{index}">
    	<button  class="rounded-md bg-red-500 text-center">View Students</button>
	</a>
</div>
