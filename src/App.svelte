<script>
  import { onMount } from "svelte";

  import { getGames } from "./api.js";
  import Calendar from "./components/calendar/Calendar.svelte";
  import MonthSelect from "./components/MonthSelect.svelte";
  import YearSelect from "./components/YearSelect.svelte";
  import Title from "./components/Title.svelte";
  import FavsOnly from "./components/FavsOnly.svelte";
  import PlatformSelect from "./components/PlatformSelect.svelte";
  import { games } from "./store/games";

  onMount(async function() {
    try {
      const resp = await getGames();
      games.set(resp.data);
    } catch (e) {
      // TODO: Handle errors lol
      throw new Error(e);
    }
  });
</script>

<style>
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
      <PlatformSelect />
    </div>

    <div class="mr3">
      <MonthSelect />
    </div>

    <div>
      <YearSelect />
    </div>
  </div>

  <FavsOnly />

  <div class="mb4">
    <Calendar />
  </div>

</div>
