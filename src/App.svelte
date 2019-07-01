<script>
  import { onMount } from "svelte";
  import isSameDay from "date-fns/is_same_day";

  import { getGames } from "./api.js";
  import WeekRow from "./calendar/WeekRow.svelte";
  import Day from "./calendar/Day.svelte";
  import GameList from "./calendar/GameList.svelte";
  import MonthSelect from "./MonthSelect.svelte";
  import YearSelect from "./YearSelect.svelte";
  import Title from "./Title.svelte";

  import { gamesStore, monthGames } from "./store/games";
  import { month, year } from "./store/time";
  import { monthDatesArray } from "./store/calendar";

  import { addItem, removeItem } from "./array-fns";

  function filterGamesByDay(g, requestedDate) {
    return g.filter(({ date }) => isSameDay(requestedDate, new Date(date)));
  }

  let favsOnly = false;
  let errors = null;

  onMount(async function() {
    try {
      const resp = await getGames();
      gamesStore.setGames(resp.data);
    } catch (e) {
      errors = e;
    }
  });
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

  .container {
    max-width: var(--container-width);
  }
</style>

<div class="container mr-auto ml-auto">

  <div class="mb4 tr">
    <Title />
  </div>

  <div class="measure flex">
    <div class="mr3">
      <label for="console" class="f6 b db mb2">Platform</label>
      <select name="console" class="select">
        <option value="all">All</option>
        <option value="switch">Switch</option>
        <option value="ps4">PS4</option>
      </select>
    </div>
    <div class="mr3">
      <MonthSelect />
    </div>
    <div>
      <YearSelect />
    </div>
  </div>

  <div class="mv2">
    <label for="favs" class="f6 b dib mb0">Display Favourite Only</label>
    <input name="favs" type="checkbox" bind:checked={favsOnly} />
  </div>

  <WeekRow />

  <div class="calendar mb3">
    {#each $monthDatesArray as day}
      <div class="calendar__day ba b--black-05">
        {#if day >= 0}
          <div class="calendar__day ba b--black-05">
            <div class="flex justify-end pa2">
              <Day
                isToday={isSameDay(new Date(), new Date($year, $month, day))}>
                 {day}
              </Day>
            </div>
            <GameList
              {favsOnly}
              games={filterGamesByDay($monthGames, new Date($year, $month, day))} />
          </div>
        {/if}
      </div>
    {/each}
  </div>

</div>
