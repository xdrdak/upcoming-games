import { writable, derived } from 'svelte/store';
import isSameMonth from 'date-fns/is_same_month';
import isSameYear from 'date-fns/is_same_year';

const today = new Date();
const games = writable([]);
export const year = writable(today.getFullYear());
export const month = writable(today.getMonth());

function createStore() {
  return {
    subscribe: games.subscribe,
    setGames: data => {
      games.set(data);
    },
  };
}

export const monthGames = derived(
  [games, year, month],
  ($games, $year, $month) => {
    const requestedDate = new Date($year, $month);
    return $games.filter(({ date }) => {
      const parsedDate = new Date(date);
      return (
        isSameMonth(parsedDate, requestedDate) &&
        isSameYear(parsedDate, requestedDate)
      );
    });
  },
);

export const gamesStore = createStore();
