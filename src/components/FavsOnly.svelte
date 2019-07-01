<script>
  import { favsOnly, favouritedGames } from "../store/favourites";
</script>

<div class="mv2">
  <label for="favs" class="f6 b dib mb0 mr1">
    Display Favourite Only ({$favouritedGames.length})
  </label>
  <input id="favs" name="favs" type="checkbox" bind:checked={$favsOnly} />
</div>
