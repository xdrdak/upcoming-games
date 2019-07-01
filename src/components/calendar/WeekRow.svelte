<script>
  import { weekdayNames } from "../../utils/constants";
</script>

<style>
  .calendar-week {
    display: grid;
    grid-template-columns: var(--calendar-template-columns);
    font-weight: bold;
  }
</style>

<div class="calendar-week">
  {#each weekdayNames as weekdaynames}
    <div class="tr ba pv2 ph3 b--black-05 bg-near-white">
       {weekdaynames.slice(0, 3)}
    </div>
  {/each}
</div>
