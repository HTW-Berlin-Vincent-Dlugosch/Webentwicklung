<script lang="ts">
  import { Staff } from '$lib/uni';
  import Listitem from '../listitem.svelte';
</script>

<Listitem properties={Staff.getPropertieNames()} bgColor="bg-blue-900 text-white" ><div>Actions</div></Listitem>
