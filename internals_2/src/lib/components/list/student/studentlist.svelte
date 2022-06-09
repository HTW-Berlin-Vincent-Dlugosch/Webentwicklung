<script lang="ts">
  import Addpersonform from '$lib/components/list/addpersonform.svelte';
  import { students } from '$lib/stores';
  import Listitem from '../listitem.svelte';
  import Studentlisthead from './studentlisthead.svelte';
  import Deletebutton from '../deletebutton.svelte';
  import { Departments } from '$lib/uni';
  let departmentFilter: string = 'default';
  let semesterFilter: string = 'default';
  
  $: rawStudents = Array.from($students.values());
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

<Addpersonform studentForm={true} />
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
      <option value={department[0]}>{department[1]}</option>
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
    <Deletebutton id={person.id} />
  </Listitem>
{/each}
