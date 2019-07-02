<script>
  import kebabcase from "lodash.kebabcase";
  import { fade } from "svelte/transition";
  import {
    favouritedGames,
    toggleFavouriteGame,
    favsOnly
  } from "../../store/favourites";
  import { platform } from "../../store/platform";

  export let games = [];
</script>

<ul class="games-list list ma0 pa0">

  {#each $favsOnly ? games.filter(g => $favouritedGames.indexOf(g._id) !== -1) : games as game}
    {#if $platform === 'all' || game.gameConsole.toLowerCase() === $platform.toLowerCase()}
      <li
        transition:fade={{ delay: 0, duration: 100 }}
        class="br3 mb1 pa1 nowrap overflow-hidden truncate"
        class:bg-light-blue={game.gameConsole === 'ps4'}
        class:bg-light-red={game.gameConsole === 'switch'}
        class:bg-light-green={game.gameConsole === 'xboxone'}
        class:bg-light-purple={game.gameConsole === 'pc'}>
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
    {/if}
  {/each}

</ul>
