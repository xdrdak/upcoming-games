<script>
  import isSameDay from "date-fns/is_same_day";
  import { fade } from "svelte/transition";
  import WeekRow from "./WeekRow.svelte";
  import Day from "./Day.svelte";
  import GameList from "./GameList.svelte";

  import { gamesBucket } from "../../store/games";
  import { month, year } from "../../store/time";
  import { monthDatesArray } from "../../store/calendar";
</script>

<style>
  .calendar {
    display: grid;
    grid-template-columns: var(--calendar-template-columns);
    grid-template-rows: var(--calendar-template-rows);
  }

  .calendar__day {
    height: var(--calendar-day-height);
    overflow-y: auto;
  }
</style>

<WeekRow />

<div class="calendar">
  {#each $monthDatesArray as day}
    <div
      class="calendar__day ba b--black-05"
      transition:fade={{ delay: 0, duration: 100 }}>
      {#if day >= 0}
        <div class="flex justify-end pa2">
          <Day isToday={isSameDay(new Date(), new Date($year, $month, day))}>
             {day}
          </Day>
        </div>
        <GameList
          games={($gamesBucket[$year] && $gamesBucket[$year][$month] && $gamesBucket[$year][$month][day]) || []} />
      {/if}
    </div>
  {/each}
</div>
