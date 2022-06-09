<script lang="ts">
  import { page } from '$app/stores';

  import Addpersonform from '$lib/components/list/addpersonform.svelte';
  import { students } from '$lib/stores';
  import Listitem from '$lib/components/list/listitem.svelte';
  import Studentlisthead from '$lib/components/list/student/studentlisthead.svelte';
  import Deletebutton from '$lib/components/list/deletebutton.svelte';
  import { Departments } from '$lib/uni';
  import { courses } from '$lib/stores';
  let courseNumber = parseInt($page.params.coursenumber);

  let departmentFilter: string = 'default';
  let semesterFilter: string = 'default';

  $: rawStudents = $courses[courseNumber].students;
  $: filteredStudents = rawStudents
    .filter((x) => x.department === departmentFilter || departmentFilter === 'default')
    .filter((x) => getSemester(x.joinDate) === semesterFilter || semesterFilter === 'default');

  function getSemester(date: Date) {
    let month = date.getMonth();
    if (month >= 3 && month <= 8) {
      console.log('summer');
      return 'summer';
    } else {
      console.log('summer');
      return 'winter';
    }
  }
</script>

<h2 class="col-span-2 text-2xl">Students:</h2>

<form class="col-span-2 grid grid-cols-2 gap-4 rounded-md border-2 p-4">
  <div class="col-span-2">Filter:</div>
  <select
    on:change={(event) => {
      departmentFilter = event.currentTarget.value;
    }}
    name="department"
    class="col-span-1 rounded-md">
    <option value="default">Department</option>
    {#each Object.entries(Departments) as department}
      <option value={department[1]}>{department[0]}</option>
    {/each}
  </select>
  <select
    on:change={(event) => {
      semesterFilter = event.currentTarget.value;
    }}
    name="department"
    class="col-span-1 rounded-md">
    <option value="default">Semester</option>
    <option value="winter">Winter</option>
    <option value="summer">Summer</option>
  </select>
</form>
<Studentlisthead />
{#each filteredStudents as person, index}
  <Listitem
    properties={person.getProperties()}
    bgColor={index % 2 == 0 ? 'bg-blue-300' : 'bg-blue-500'}>
    <!-- <Deletebutton id={person.id} /> -->
  </Listitem>
{/each}
