import { writable } from 'svelte/store';
import { createLocalStorage } from '../utils/localstorage-fns';
import { addItem, removeItem } from '../utils/array-fns';

const storage = createLocalStorage('games', []);

const favsOnly = writable(false);

const favouritedGames = writable(storage.getItem());

function toggleFavouriteGame(gameID) {
  favouritedGames.update(g => {
    let nextGames = g;
    const index = nextGames.indexOf(gameID);

    if (index === -1) {
      nextGames = addItem(g, { item: gameID });
    } else {
      nextGames = removeItem(g, { index });
    }

    storage.setItem(nextGames);
    return nextGames;
  });
}

export { favouritedGames, toggleFavouriteGame, favsOnly };
