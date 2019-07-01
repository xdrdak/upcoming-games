import { startOfMonth, endOfMonth } from 'date-fns';

// 7 rows (aka, our 7 days), multiplied by 6 rows (4 weeks + 2 for padding)
const DAYS_TO_RENDER = 42;

function generateMonthDatesArray(date = new Date()) {
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

export { generateMonthDatesArray };
