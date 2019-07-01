<script>
  export let isToday = false;
</script>

<style>
  .Day {
    height: 6px;
    width: 6px;
    padding: 0.65rem;
  }
</style>

<span
  class="Day br-100 f6 {isToday ? 'bg-hot-pink white' : 'bg-lightest-blue'} flex
  items-center justify-center">
  <slot />
</span>
