<script>
  import { onMount } from "svelte";
  import { slide, fade } from "svelte/transition";
  import { getGames } from "./api.js";
  import Calendar from "./components/calendar/Calendar.svelte";
  import MonthSelect from "./components/MonthSelect.svelte";
  import YearSelect from "./components/YearSelect.svelte";
  import Title from "./components/Title.svelte";
  import FavsOnly from "./components/FavsOnly.svelte";
  import PlatformSelect from "./components/PlatformSelect.svelte";
  import MonthSwitcher from "./components/MonthSwitcher.svelte";
  import Loader from "./components/Loader.svelte";
  import { games } from "./store/games";

  // TODO: Better loading state.
  let loading = true;
  let errors = false;

  onMount(async function() {
    try {
      const resp = await getGames();
      games.set(resp.data);
    } catch (e) {
      // TODO: Handle errors lol
      errors = true;
      throw new Error(e);
    }
    loading = false;
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
  .loading {
    opacity: 0.3;
    pointer-events: none;
  }
</style>

<div class="container mr-auto ml-auto">

  <div class="mb4 tr">
    <Title />
  </div>

  {#if errors}
    <div class="bg-red white pa3 mb2">Woops! Something went wrong!</div>
  {/if}

  {#if loading}
    <Loader />
  {:else}
    <main transition:fade>
      <div class="flex justify-between">
        <button
          on:click={toggleFilter}
          type="button"
          style="cursor: pointer;"
          class="no-underline cursor black bg-animate inline-flex items-center
          pa2 pl0 bn border-box">
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
    </main>
  {/if}
</div>
