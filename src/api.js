import data from './data';

const endpoint = 'https://immafridge.api.stdlib.com/upcoming-games@0.1.0/';

export async function getGames() {
  /*
  const resp = await fetch(endpoint);
  const json = await resp.json();
  return json;
  */
  const resp = new Promise(resolve => {
    setTimeout(() => resolve(data), 1000);
  });
  return resp;
}
