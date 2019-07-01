<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { getGames } from "./api.js";
  import Calendar from "./components/calendar/Calendar.svelte";
  import MonthSelect from "./components/MonthSelect.svelte";
  import YearSelect from "./components/YearSelect.svelte";
  import Title from "./components/Title.svelte";
  import FavsOnly from "./components/FavsOnly.svelte";
  import PlatformSelect from "./components/PlatformSelect.svelte";
  import MonthSwitcher from "./components/MonthSwitcher.svelte";
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

  let filterActive = false;

  function toggleFilter() {
    filterActive = !filterActive;
  }
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

  <div class="flex justify-between">
    <button
      on:click={toggleFilter}
      type="button"
      style="cursor: pointer;"
      class="no-underline cursor black bg-animate inline-flex items-center pa2
      pl0 bn border-box">
      Filters 
      <span class="ml2 f7 pt1">
        {#if filterActive}▼{:else}►{/if}
      </span>
    </button>

    <MonthSwitcher />
  </div>

  {#if filterActive}
    <div transition:slide>

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

      <div class="mv2">
        <FavsOnly />
      </div>
    </div>
  {/if}

  <div class="mb4">
    <Calendar />
  </div>

</div>
