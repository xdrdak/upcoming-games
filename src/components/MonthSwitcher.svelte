<script>
  import { month, year } from "../store/time";

  let nextMonth = 0;
  let previousMonth = 0;
  let nextYear = 0;
  let previousYear = 0;

  year.subscribe(y => {
    nextYear = y + 1;
    previousYear = y - 1;
  });

  month.subscribe(m => {
    if (m < 11) {
      nextMonth = m + 1;
    } else {
      nextMonth = 0;
    }

    if (m === 0) {
      previousMonth = 11;
    } else {
      previousMonth = m - 1;
    }
  });

  function setNextMonth() {
    month.set(nextMonth);
    if (nextMonth === 0) {
      year.set(nextYear);
    }
  }

  function setPreviousMonth() {
    month.set(previousMonth);
    if (previousMonth === 11) {
      year.set(previousYear);
    }
  }
</script>

<div class="flex">
  <button
    style="cursor: pointer;"
    class="pv2 ph3 ma0 bn"
    on:click={setPreviousMonth}>
    ◀
  </button>
  <button
    style="cursor: pointer;"
    class="pv2 ph3 ma0 bn"
    on:click={setNextMonth}>
    ▶
  </button>
</div>
