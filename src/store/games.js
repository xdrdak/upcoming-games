import { writable, derived } from 'svelte/store';
import isSameMonth from 'date-fns/is_same_month';
import isSameYear from 'date-fns/is_same_year';
import { year, month } from './time';

const games = writable([]);

function createStore() {
  return {
    subscribe: games.subscribe,
    setGames: data => {
      games.set(data);
    },
  };
}

const monthGames = derived([games, year, month], ([$games, $year, $month]) => {
  const requestedDate = new Date($year, $month);

  return $games.filter(({ date }) => {
    const parsedDate = new Date(date);
    return (
      isSameMonth(parsedDate, requestedDate) &&
      isSameYear(parsedDate, requestedDate)
    );
  });
});

const gamesStore = createStore();

export { gamesStore, monthGames };
