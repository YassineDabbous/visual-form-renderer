import React from 'react';

interface CountdownTimerProps {
  timeLeftInSeconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeLeftInSeconds }) => {
  const minutes = Math.floor(timeLeftInSeconds / 60);
  const seconds = timeLeftInSeconds % 60;

  const timeColorClass = timeLeftInSeconds <= 60
    ? 'text-red-500'
    : timeLeftInSeconds <= 300
    ? 'text-yellow-500'
    : 'text-gray-800 dark:text-gray-200';

  return (
    <div className="text-center top-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700 z-50">
      <span className={`text-lg font-mono font-bold ${timeColorClass}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};
