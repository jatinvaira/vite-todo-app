import React from 'react';
import { CheckSquare, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { user, signOut } = useAuthStore();
  
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckSquare className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">Task Manager</span>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user && (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-400">{user.email}</span>
                <button
                  onClick={signOut}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}