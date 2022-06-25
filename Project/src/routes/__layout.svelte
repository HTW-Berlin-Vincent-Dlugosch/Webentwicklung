<script lang="ts">
  import '../app.css';
  import { supabase } from '$lib/supabaseclient';
  import User from '$lib/components/login/user.svelte';
  import Navbar from '$lib/components/navbar.svelte';
  import { user } from '$lib/store';
  // import çsql from '$lib/postgresclient';
  supabase.auth.onAuthStateChange((_, session) => {
    if (_ === 'SIGNED_IN') {
      user.set(supabase.auth.user());
    }
    if (_ === 'SIGNED_OUT') {
      user.set(null);
    }
  });
</script>

{#if !$user}
  <div class="grid h-screen place-items-center">
    <User />
  </div>
{:else}
  <Navbar />
  <main class="container mx-auto p-4">
    <slot />
  </main>
{/if}
