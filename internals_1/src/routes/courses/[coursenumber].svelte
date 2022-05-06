<script lang="ts">
  import { page } from '$app/stores';
  import Listitemperson from '$lib/components/list/listitemperson.svelte';
  import Studentlist from '$lib/components/list/student/studentlist.svelte';
  import Studentlisthead from '$lib/components/list/student/studentlisthead.svelte';
  import { courses } from '$lib/stores';
  let courseNumber = parseInt($page.params.coursenumber);
</script>

<div class="grid columns-2 gap-4">
  <Studentlisthead />
  {#each $courses[courseNumber].students as student, index}
    <Listitemperson isStudent={true} {...student} {index} />
  {/each}
</div>
