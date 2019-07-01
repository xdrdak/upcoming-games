<script>
  import { year } from "../store/time";

  const today = new Date();
</script>

<label for="year" class="f6 b db mb2">Year</label>
<select name="year" class="select" bind:value={$year}>
  <option value={today.getFullYear()}>{today.getFullYear()}</option>
  <option value={today.getFullYear() + 1}> {today.getFullYear() + 1} </option>
</select>
