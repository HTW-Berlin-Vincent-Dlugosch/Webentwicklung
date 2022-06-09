<script lang="ts">
  export let properties: string[];
  export let bgColor: string;
</script>

<div class="col-span-2 grid auto-cols-fr grid-flow-col gap-2 rounded-md p-2 {bgColor}">
  {#each properties as property}
    <div>{property}</div>
  {/each}
  <slot />
</div>
