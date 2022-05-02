import type { User } from '$lib/user';
import { writable } from 'svelte/store';
import type {  Staff, Student } from '$lib/people';

export const currentUser = writable<User>();
export const students = writable<Map<number, Student>>(new Map());
export const staff = writable<Map<number, Staff>>(new Map());

// export const people = writable<Map<number, Person>>(new Map());