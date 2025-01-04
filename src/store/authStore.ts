import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  loading: boolean;
  checkUser: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  loading: false,
  
  checkUser: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    set({ 
      user: session?.user ?? null,
      isLoading: false 
    });
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    await set.getState().checkUser();
    set({ loading: false });
  },

  signUp: async (email: string, password: string) => {
    set({ loading: true, error: null });
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    
    // After signup, automatically sign in
    await set.getState().signIn(email, password);
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));