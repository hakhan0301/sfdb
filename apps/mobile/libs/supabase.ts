import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from '@supabase/supabase-js';

import Constants from 'expo-constants';

import type { Like, Post, User, DBComment } from "./types/posts";


const supabaseUrl = Constants.manifest!.extra!.SUPABASE_URL!;
const supabaseAnonKey = Constants.manifest!.extra!.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});

export default supabase;

export const tables = {
  comments: () => supabase.from<DBComment>('Comments'),
  likes: () => supabase.from<Like>('Likes'),
  posts: () => supabase.from<Post>('Posts'),
  users: () => supabase.from<User>('Users')
}
