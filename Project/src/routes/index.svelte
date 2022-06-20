<script lang="ts">
  import type { definitions } from 'types/database/index';
  import Editproduct from '$lib/components/editproduct.svelte';
  import Scanner from '$lib/components/scanner.svelte';
  import Search from '$lib/components/search.svelte';

  let promisedFood: Promise<definitions['Food']> | undefined = undefined;
</script>

<div class="grid grid-cols-2 justify-items-center gap-4">
  <Scanner />
  <Search />
</div>
