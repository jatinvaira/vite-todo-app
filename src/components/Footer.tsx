import React from 'react';
import { FileDown, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-sm mt-auto">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Jatin Vaira
          </h2>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Mail className="w-4 h-4" />
            <a href="mailto:jatinvaira@gmail.com" className="hover:text-blue-500">
              jatinvaira@gmail.com
            </a>
          </div>

          <button 
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => {
              window.location.href = "https://drive.google.com/drive/folders/1Pf73xogDu06i_7Yldf3ZWpphaXiYgASz?usp=sharing";
            }}
          >
            <FileDown className="w-4 h-4" />
            Download Resume
          </button>
        </div>
      </div>
    </footer>
  );
}