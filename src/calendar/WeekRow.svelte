<script>
  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
</script>

<style>
  .calendar-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-weight: bold;
  }
</style>

<div class="calendar-week">
  {#each weekdayNames as weekdaynames}
    <div class="tr">{weekdaynames.slice(0, 3)}</div>
  {/each}
</div>
