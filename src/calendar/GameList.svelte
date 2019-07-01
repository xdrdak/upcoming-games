<script>
  import kebabcase from "lodash.kebabcase";

  export let games;
  export let favouritedGames = [];
  export let favsOnly = false;
  export let onStarClick = () => {};
</script>

<ul class="games-list list ma0 pa0">
  {#if favsOnly}
    {#each games as game}
      {#if favouritedGames.indexOf(game._id) !== -1}
        <li
          class="br3 mb1 pa1 nowrap overflow-hidden truncate"
          class:bg-light-pink={game.gameConsole === 'ps4'}
          class:bg-light-green={game.gameConsole === 'switch'}>
          <span
            class="pointer hover-gold link"
            on:click={() => onStarClick(game._id)}
            class:gold={favouritedGames.indexOf(game._id) !== -1}>
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
  {:else}
    {#each games as game}
      <li
        class="br3 mb1 pa1 nowrap overflow-hidden truncate"
        class:bg-light-pink={game.gameConsole === 'ps4'}
        class:bg-light-green={game.gameConsole === 'switch'}>
        <span
          class="pointer hover-gold link"
          on:click={() => onStarClick(game._id)}
          class:gold={favouritedGames.indexOf(game._id) !== -1}>
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
  {/if}
</ul>
