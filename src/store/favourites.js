import { writable, derived } from 'svelte/store';
import { createLocalStorage } from '../localstorage-fns';
import { addItem, removeItem } from '../array-fns';

const storage = createLocalStorage('games', []);

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

export { favouritedGames, toggleFavouriteGame };
