// TODO: Use the endpoint for data fetching once UI is ready
import data from './data';

const endpoint = 'https://immafridge.api.stdlib.com/upcoming-games@0.0.0/';

export async function getGames() {
  return new Promise(resolve => setTimeout(() => resolve(data), 100));
}
