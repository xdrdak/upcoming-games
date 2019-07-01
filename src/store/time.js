import { writable } from 'svelte/store';

const today = new Date();
const year = writable(today.getFullYear());
const month = writable(today.getMonth());

export { year, month };
