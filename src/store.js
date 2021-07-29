import { writable } from 'svelte-persistent-store/local.js';

export const apolloStore = writable('apollo', true);
export const tvnetStore = writable('tvnet', true);
export const lsmStore = writable('lsm', true);
export const jaunsStore = writable('jauns', true);
export const delfiStore = writable('delfi', true);

export const themeStore = writable('theme', true);