<script>
  import { courses } from '$lib/stores';
  import Courselisthead from './courselisthead.svelte';
  import Listitemcourse from './listitemcourse.svelte';
</script>

<Courselisthead />
{#each $courses as course, index}
  <Listitemcourse courseName={course.name} {index} />
{/each}
