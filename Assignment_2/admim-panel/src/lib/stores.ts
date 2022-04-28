import type { User } from '$lib/user';
import { writable } from 'svelte/store';
import type { Staff, Student } from '$lib/people';

export const currentUser = writable<User>();
export const students = writable<Student[]>();
export const staff = writable<Staff[]>();