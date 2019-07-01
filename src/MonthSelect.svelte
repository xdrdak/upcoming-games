<script>
  import { month } from "./store/time";
  import { months } from "./months";
</script>

<label for="month" class="f6 b db mb2">Month</label>
<select name="month" class="select" bind:value={$month}>
  {#each months as month, index (month)}
    <option value={index}>{month}</option>
  {/each}
</select>
