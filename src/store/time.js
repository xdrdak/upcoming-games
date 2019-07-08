import { writable } from 'svelte/store';
import { today } from '../utils/constants';

const year = writable(today.getFullYear());
const month = writable(today.getMonth());

const gotoNextYear = () => {
  year.update(y => y + 1);
};

const gotoPrevYear = () => {
  year.update(y => y - 1);
};

const gotoNextMonth = () => {
  month.update(m => {
    if (m < 11) {
      return m + 1;
    }
    gotoNextYear();
    return 0;
  });
};

const gotoPrevMonth = () => {
  month.update(m => {
    if (m === 0) {
      gotoPrevYear();
      return 11;
    }

    return m - 1;
  });
};

export { year, month, gotoNextMonth, gotoPrevMonth };
