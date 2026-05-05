/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Timer as TimerIcon } from 'lucide-react';

export const CountdownTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(180); // Start at 03:00 (180 seconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= 240) { // Stop at 04:00 (240 seconds)
          clearInterval(interval);
          return 240;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      id="session-timer"
      className="absolute top-10 left-10 flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md opacity-60 hover:opacity-100 transition-opacity"
    >
      <TimerIcon className="w-4 h-4 text-io-blue" />
      <span className="font-mono text-sm font-bold tracking-widest text-slate-200">
        {formatTime(seconds)}
      </span>
    </div>
  );
};
