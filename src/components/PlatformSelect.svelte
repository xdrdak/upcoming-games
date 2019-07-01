<script>
  import { platform } from "../store/platform";
</script>

<label for="console" class="f6 b db mb2">Platform</label>
<select name="console" class="select" bind:value={$platform}>
  <option value="all">All</option>
  <option value="switch">Switch</option>
  <option value="ps4">PS4</option>
</select>
