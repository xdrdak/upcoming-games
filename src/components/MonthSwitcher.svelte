<script>
  import { gotoNextMonth, gotoPrevMonth } from "../store/time";
</script>

<div class="flex">
  <button
    style="cursor: pointer;"
    class="pv2 ph3 ma0 bn"
    on:click={gotoPrevMonth}>
    ◀
  </button>
  <button
    style="cursor: pointer;"
    class="pv2 ph3 ma0 bn"
    on:click={gotoNextMonth}>
    ▶
  </button>
</div>
