<script>
  import kebabcase from "lodash.kebabcase";

  export let games;
</script>

<ul class="games-list list ma0 pa0">
  {#each games as game}
    <li
      class="br3 mb1 pa1 nowrap overflow-hidden truncate"
      class:bg-light-pink={game.gameConsole === 'ps4'}
      class:bg-light-green={game.gameConsole === 'switch'}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.igdb.com/games/${kebabcase(game.name)}`}>
         {game.name}
      </a>
    </li>
  {/each}
</ul>
