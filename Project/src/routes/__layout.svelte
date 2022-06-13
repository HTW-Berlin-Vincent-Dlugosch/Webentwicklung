<script lang="ts">
  import '../app.css';
  import { supabase } from '$lib/supabaseclient';
  import User from '$lib/components/login/user.svelte';
  import Navbar from '$lib/components/navbar.svelte';
  import { user } from '$lib/store';
  supabase.auth.onAuthStateChange((_, session) => {
    if (_ === 'SIGNED_IN') {
      user.set(true);
    }
    if (_ === 'SIGNED_OUT') {
      user.set(false);
    }
  });
 
</script>

{#if !$user}
  <div class="grid h-screen place-items-center">
    <User />
  </div>
{:else}
  <Navbar />
  <main class="container mx-auto pt-4">
    <slot />
  </main>
{/if}
