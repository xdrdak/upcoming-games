<script>
  import { year } from "../store/time";
  import { today } from "../utils/constants";
  const currentYear = today.getFullYear();
</script>

<label for="year" class="f6 b db mb2">Year</label>
<select name="year" class="select" bind:value={$year}>
  <option value={currentYear - 1}> {currentYear - 1} </option>
  <option value={currentYear}>{currentYear}</option>
  <option value={currentYear + 1}> {currentYear + 1} </option>
</select>
