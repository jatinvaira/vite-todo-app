import React, { useEffect } from 'react';
import { AddTask } from './components/AddTask';
import { TaskList } from './components/TaskList';
import { Auth } from './components/Auth';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VideoFrame } from './components/VideoFrame';
import { useTaskStore } from './store/taskStore';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';

export function App() {
  const { fetchTasks } = useTaskStore();
  const { user, isLoading, checkUser } = useAuthStore();
  const { isDark } = useThemeStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-1">
        {user ? (
          <>
            <div className="max-w-3xl mx-auto px-4 py-8 w-full">
              <AddTask />
              <TaskList />
            </div>
            <VideoFrame />
          </>
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-8 w-full">
            <Auth />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;