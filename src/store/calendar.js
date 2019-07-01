import { derived } from 'svelte/store';
import { month, year } from './time';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';

// 7 rows (aka, our 7 days), multiplied by 6 rows (4 weeks + 2 for padding)
const DAYS_TO_RENDER = 42;

function generateMonthDatesArray(month, year) {
  const date = new Date(year, month);
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const datesArray = [];
  let monthHasNowBegun = false;
  let offset = 0;

  for (let i = 0; i < DAYS_TO_RENDER; i++) {
    if (i === start.getDay()) {
      monthHasNowBegun = true;
    }

    if (monthHasNowBegun && i - offset < end.getDate()) {
      datesArray.push(i - offset + 1);
    } else {
      offset++;
      datesArray.push(-1);
    }
  }
  return datesArray;
}

const monthDatesArray = derived([month, year], ([$month, $year]) => {
  return generateMonthDatesArray($month, $year);
});

export { monthDatesArray };
