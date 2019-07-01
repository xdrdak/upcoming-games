<script>
  import { onMount } from "svelte";
  import isSameDay from "date-fns/is_same_day";
  import isSameMonth from "date-fns/is_same_month";
  import isSameYear from "date-fns/is_same_year";
  import kebabcase from "lodash.kebabcase";

  import { getGames } from "./api.js";
  import WeekRow from "./calendar/WeekRow.svelte";
  import Day from "./calendar/Day.svelte";
  import GameList from "./calendar/GameList.svelte";
  import { gamesStore, monthGames } from "./store/games";
  import { months } from "./months.js";
  import { generateMonthDatesArray } from "./generateMonthDatesArray.js";
  import { addItem, removeItem } from "./array-fns";
  import { createLocalStorage } from "./localstorage-fns";

  function filterGamesByYearMonth(g, year, month) {
    const requestedDate = new Date(year, month);
    return g.filter(({ date }) => {
      const parsedDate = new Date(date);
      return (
        isSameMonth(parsedDate, requestedDate) &&
        isSameYear(parsedDate, requestedDate)
      );
    });
  }

  function filterGamesByDay(g, requestedDate) {
    return g.filter(({ date }) => isSameDay(requestedDate, new Date(date)));
  }

  const storage = createLocalStorage("games", []);
  const today = new Date();
  let year = today.getFullYear();
  let games = [];
  // Using this value to filter out the right games for the month;
  let selectedMonthIndex = today.getMonth();
  let favsOnly = false;
  $: currentSelectedMonth = new Date(year, selectedMonthIndex);
  $: gamesForTheMonth = filterGamesByYearMonth(games, year, selectedMonthIndex);
  let favouritedGames = storage.getItem();
  let errors = null;

  onMount(async function() {
    try {
      const resp = await getGames();
      gamesStore.setGames(resp.data);
    } catch (e) {
      errors = e;
    }
  });

  gamesStore.subscribe(g => {
    games = g;
  });

  function toggleFavouriteGame(gameID) {
    const index = favouritedGames.indexOf(gameID);

    if (index === -1) {
      favouritedGames = addItem(favouritedGames, { item: gameID });
    } else {
      favouritedGames = removeItem(favouritedGames, { index });
    }

    storage.setItem(favouritedGames);
  }
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

  .select {
    background-image: none;
    background-clip: padding-box;
    background-color: #fff;
    border: 1px solid hsl(220, 20%, 80%);
    border-radius: 0.25rem;
    color: hsl(220, 20%, 50%);
    font-size: 0.875rem;
    font-weight: 200;
    letter-spacing: -0.02em;
    line-height: 1.5;
    transition: all 0.15s ease-in-out;
    height: 34px;
  }
</style>

<div class="container mr-auto ml-auto">

  <div class="mb4 tr">
    <div class="dib">
      <div class="f3 f2-m f1-l">Upcoming games</div>
      <h1 class="f3 f1-m f-headline-l tr ma0">{months[selectedMonthIndex]}</h1>
    </div>
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
      <label for="month" class="f6 b db mb2">Month</label>
      <select name="month" class="select" bind:value={selectedMonthIndex}>
        {#each months as month, index (month)}
          <option value={index}>{month}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="year" class="f6 b db mb2">Year</label>
      <select name="year" class="select" bind:value={year}>
        <option value={today.getFullYear()}>{today.getFullYear()}</option>
        <option value={today.getFullYear() + 1}>
           {today.getFullYear() + 1}
        </option>
      </select>
    </div>
  </div>

  <div class="mv2">
    <label for="favs" class="f6 b dib mb0">Display Favourites Only</label>
    <input name="favs" type="checkbox" bind:checked={favsOnly} />
  </div>

  <WeekRow />

  <div class="calendar mb3">
    {#each generateMonthDatesArray(currentSelectedMonth) as day}
      <div class="calendar__day ba b--black-05">
        {#if day >= 0}
          <div class="calendar__day ba b--black-05">
            <div class="flex justify-end pa2">
              <Day
                isToday={isSameDay(today, new Date(year, selectedMonthIndex, day))}>
                 {day}
              </Day>
            </div>
            <GameList
              {favouritedGames}
              {favsOnly}
              onStarClick={toggleFavouriteGame}
              games={filterGamesByDay(gamesForTheMonth, new Date(year, selectedMonthIndex, day))} />
          </div>
        {/if}
      </div>
    {/each}
  </div>

</div>
