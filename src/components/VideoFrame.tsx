import React from 'react';

export function VideoFrame() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-8">
      <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            YouTube video will be added here
          </p>
        </div>
      </div>
    </div>
  );
}