<script>
  import { favsOnly } from "./store/favourites";
</script>

<div class="mv2">
  <label for="favs" class="f6 b dib mb0">Display Favourite Only</label>
  <input name="favs" type="checkbox" bind:checked={$favsOnly} />
</div>
