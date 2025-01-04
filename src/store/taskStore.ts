import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Task } from '../types/task';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  fetchTasks: () => Promise<void>;
  addTask: (title: string, description: string) => Promise<void>;
  updateTask: (id: string, status: Task['status']) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  reorderTasks: (oldIndex: number, newIndex: number) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,

  fetchTasks: async () => {
    set({ isLoading: true });
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session?.user) {
      set({ tasks: [], isLoading: false });
      return;
    }

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }

    set({ tasks: data as Task[], isLoading: false });
  },

  addTask: async (title: string, description: string) => {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session?.user) {
      console.error('User must be logged in to add tasks');
      return;
    }

    const { error } = await supabase
      .from('tasks')
      .insert([{ 
        title, 
        description,
        user_id: session.session.user.id 
      }]);

    if (error) {
      console.error('Error adding task:', error);
      return;
    }

    get().fetchTasks();
  },

  updateTask: async (id: string, status: Task['status']) => {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session?.user) {
      console.error('User must be logged in to update tasks');
      return;
    }

    const { error } = await supabase
      .from('tasks')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', session.session.user.id);

    if (error) {
      console.error('Error updating task:', error);
      return;
    }

    get().fetchTasks();
  },

  deleteTask: async (id: string) => {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session?.user) {
      console.error('User must be logged in to delete tasks');
      return;
    }

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('user_id', session.session.user.id);

    if (error) {
      console.error('Error deleting task:', error);
      return;
    }

    get().fetchTasks();
  },

  reorderTasks: (oldIndex: number, newIndex: number) => {
    set((state) => {
      const newTasks = [...state.tasks];
      const [removed] = newTasks.splice(oldIndex, 1);
      newTasks.splice(newIndex, 0, removed);
      return { tasks: newTasks };
    });
  },
}));