import { writable, derived } from 'svelte/store';

const games = writable([]);

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

export { games, gamesBucket };
