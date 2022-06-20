<script>
  import Logout from './login/logout.svelte';
</script>

<nav class="w-full bg-orange-300">
  <div class="container mx-auto flex h-16 items-center justify-between">
    <div class="text-xl">
      <a href="/">Home</a>
    </div>
    <div class="hidden items-center justify-end gap-8 sm:flex">
      <a href="/admin">Search</a>
      <Logout />
    </div>
    <div class="flex gap-4 sm:hidden" />
  </div>
</nav>
