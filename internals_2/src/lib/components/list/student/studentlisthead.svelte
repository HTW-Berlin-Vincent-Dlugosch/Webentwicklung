<script lang="ts">
  import { Student } from '$lib/uni';
  import Listitem from '../listitem.svelte';
  
</script>

<Listitem properties={Student.getPropertieNames()} bgColor="bg-blue-900 text-white" >
  <div>Actions</div>
</Listitem>
