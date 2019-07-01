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

const gamesStore = createStore();

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

const gamesBucket = derived([games], ([$games]) => {
  const bucket = $games.reduce((acc, game) => {
    const date = new Date(game.date);
    const gameYear = date.getFullYear();
    const gameMonth = date.getMonth();
    const gameDay = date.getDate();

    if (!acc[gameYear]) {
      acc[gameYear] = {};
    }

    if (!acc[gameYear][gameMonth]) {
      acc[gameYear][gameMonth] = {};
    }

    if (!acc[gameYear][gameMonth][gameDay]) {
      acc[gameYear][gameMonth][gameDay] = [];
    }

    acc[gameYear][gameMonth][gameDay].push(game);

    return acc;
  }, {});

  return bucket;
});

export { gamesStore, monthGames, gamesBucket };
