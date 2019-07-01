import { writable } from 'svelte/store';
import { today } from '../utils/constants';

const year = writable(today.getFullYear());
const month = writable(today.getMonth());

export { year, month };
