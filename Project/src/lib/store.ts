import { writable } from 'svelte/store';
import { supabase } from './supabaseclient';

export const user = writable(supabase.auth.user() ? true : false);
