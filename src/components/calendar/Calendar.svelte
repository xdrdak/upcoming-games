<script>
  import isSameDay from "date-fns/is_same_day";

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
    overflow-y: scroll;
  }
</style>

<WeekRow />

<div class="calendar">
  {#each $monthDatesArray as day}
    <div class="calendar__day ba b--black-05">
      {#if day >= 0}
        <div class="calendar__day ba b--black-05">
          <div class="flex justify-end pa2">
            <Day isToday={isSameDay(new Date(), new Date($year, $month, day))}>
               {day}
            </Day>
          </div>
          <GameList
            games={($gamesBucket[$year] && $gamesBucket[$year][$month] && $gamesBucket[$year][$month][day]) || []} />
        </div>
      {/if}
    </div>
  {/each}
</div>
