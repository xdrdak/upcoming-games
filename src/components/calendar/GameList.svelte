<script>
  import kebabcase from "lodash.kebabcase";
  import { fade } from "svelte/transition";

  import {
    favouritedGames,
    toggleFavouriteGame,
    favsOnly
  } from "../../store/favourites";

  export let games = [];
</script>

<ul class="games-list list ma0 pa0">

  {#each $favsOnly ? games.filter(g => $favouritedGames.indexOf(g._id) !== -1) : games as game}
    <li
      transition:fade={{ delay: 0, duration: 100 }}
      class="br3 mb1 pa1 nowrap overflow-hidden truncate"
      class:bg-light-pink={game.gameConsole === 'ps4'}
      class:bg-light-green={game.gameConsole === 'switch'}>
      <span
        class="pointer hover-gold"
        on:click={() => toggleFavouriteGame(game._id)}
        class:gold={$favouritedGames.indexOf(game._id) !== -1}>
        ★
      </span>
      <a
        target="_blank"
        rel="noopener noreferrer"
        class="link black dim f6"
        href={`https://www.igdb.com/games/${kebabcase(game.name)}`}>
         {game.name}
      </a>
    </li>
  {/each}

</ul>
