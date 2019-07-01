<script>
  import { onMount } from "svelte";
  import { getGames } from "./api.js";
  import WeekRow from "./calendar/WeekRow.svelte";
  import { months } from "./months.js";
  import { startOfMonth, endOfMonth } from "date-fns";

  const today = new Date();
  const year = today.getFullYear();

  function filterGamesByYearMonth(g, year, month) {
    const formattedMonth = month < 10 ? `0${month}` : month;
    const thisMonthAndYear = `${today.getFullYear()}-${formattedMonth}`;
    return g.filter(({ date }) => date.includes(thisMonthAndYear));
  }
  let games = [];
  // Using this value to filter out the right games for the month;
  let selectedMonth = 7; //today.getMonth()

  // 7 rows (aka, our 7 days), multiplied by 6 rows (4 weeks + 2 for padding)
  const daysToRender = 42;
  function generateMonthDatesArray(date = new Date()) {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const datesArray = [];
    let monthHasNowBegun = false;
    let offset = 0;

    for (let i = 0; i < daysToRender; i++) {
      if (i === start.getDay()) {
        monthHasNowBegun = true;
      }

      if (monthHasNowBegun && i - offset < end.getDate()) {
        datesArray.push(i - offset + 1);
      } else {
        offset++;
        datesArray.push(-1);
      }
    }
    return datesArray;
  }

  let errors = null;

  onMount(async function() {
    try {
      const resp = await getGames();
      games = resp.data;
    } catch (e) {
      errors = e;
    }
  });
</script>

<style>
  h1 {
    color: purple;
  }

  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 8px;
  }

  .calendar__day {
    height: 125px;
    position: relative;
  }

  .calendary__day-number {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>

<div class="mw9 mr-auto ml-auto">
   {year}
  <select bind:value={selectedMonth}>
    {#each months as month, index (month)}
      <option value={index}>{month}</option>
    {/each}
  </select>

  <ul style="display: none;">
    {#each filterGamesByYearMonth(games, year, selectedMonth) as link}
      <li>{link.name}</li>
    {/each}
  </ul>

  <div class="mb3">
    <WeekRow />
  </div>

  <div class="calendar">
    {#each generateMonthDatesArray(new Date(year, selectedMonth)) as day}
      {#if day >= 0}
        <div class="calendar__day">
          <span class="calendary__day-number">{day}</span>
        </div>
      {:else}
        <div class="calendar__day" />
      {/if}
    {/each}
  </div>

</div>
