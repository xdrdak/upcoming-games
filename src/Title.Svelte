<script>
  import { month } from "./store/time";
  import { months } from "./months.js";
</script>

<div class="dib">
  <div class="f3 f2-m f1-l">Upcoming games</div>
  <h1 class="f3 f1-m f-headline-l tr ma0">{months[$month]}</h1>
</div>
