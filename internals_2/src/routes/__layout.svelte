<script>
  import Navbar from '$lib/components/navbar.svelte';
  import Login from '$lib/components/login/login.svelte';
  import { currentUser } from '$lib/stores';
  import '../app.css';
</script>

{#if !$currentUser}
  <Login />
{:else}
  <Navbar />
  <main class="p-4 mx-auto">
    <slot />
  </main>
{/if}
