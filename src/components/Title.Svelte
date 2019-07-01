<script>
  import { month, year } from "../store/time";
  import { months } from "../utils/constants";
</script>

<div class="dib">
  <div class="f3 f2-m f1-l">Upcoming games</div>
  <div class="f3 f1-m f-headline-l tr ma0">{months[$month]}</div>
  <div class="f4 tr year">{$year}</div>
</div>
