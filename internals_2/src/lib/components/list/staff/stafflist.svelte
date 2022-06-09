<script lang="ts">
  import Addpersonform from '$lib/components/list/addpersonform.svelte';
  import { staff } from '$lib/stores';
  import Deletebutton from '../deletebutton.svelte';
  import Listitem from '../listitem.svelte';
  import Stafflisthead from './stafflisthead.svelte';
</script>

<h2 class="col-span-2 text-2xl">Staff:</h2>
<Addpersonform studentForm={false} />
<Stafflisthead />
{#each Array.from($staff.values()) as person, index}
  <Listitem
    properties={person.getProperties()}
    bgColor={index % 2 == 0 ? 'bg-blue-300' : 'bg-blue-500'}>
    <Deletebutton id={person.id} />
  </Listitem>
{/each}
