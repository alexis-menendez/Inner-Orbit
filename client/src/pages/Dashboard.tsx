// File: client/src/pages/Dashboard.tsx

import React, { useEffect, useState } from 'react';
//import { link } from 'react-router-dom';
import BottomNav from '../components/nav/BottomNav';
import TopNav from '../components/nav/TopNav';
import { MoodSelector } from '../components/tracker/moodSelector';

type MoodEntry = {
  id: string;
  label: string;
  date: string;
   color: string;
};

const Dashboard: React.FC = () => {
const [weeklyMoods, setWeeklyMoods] = useState<Record<string, MoodEntry>>({});
  const userId = 'YOUR_USER_ID'; // Replace with real user ID or context

  useEffect(() => {
    const fetchWeeklyMoods = async () => {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      try {
        const res = await fetch(
          `/api/moods/${userId}/week?start=${startOfWeek.toISOString()}&end=${endOfWeek.toISOString()}`
        );
        const data = await res.json();

        const mapped: Record<string, MoodEntry> = {};
        data.forEach((entry: MoodEntry) => {
          mapped[entry.date] = entry;
        });

        setWeeklyMoods(mapped);
      } catch (err) {
        console.error('Failed to fetch moods:', err);
      }
    };

    fetchWeeklyMoods();
  }, []);
  return (
    <div className="cosmic-background min-h-screen">
      <TopNav />

      <div className="flex flex-col items-center px-4 py-8 gap-8">
        <h1 className="text-3xl glow-text mb-4">Welcome to Your Dashboard</h1>

         {/* Weekly Mood Summary - Vertical, Mobile-First, Auto-Contrast */}
        <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl cosmic-panel">
          <h2 className="text-2xl text-white mb-4">This Week's Mood</h2>
          <div className="flex flex-col gap-2 w-full">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayLabel, i) => {
              const date = new Date();
              date.setDate(date.getDate() - date.getDay() + i);
              const dateStr = date.toISOString().split('T')[0];
              const mood = weeklyMoods[dateStr];

              const background = mood?.color || '#0f172a';
              const isDark = getContrastYIQ(background) === 'light';
              const textColor = isDark ? 'text-black' : 'text-white';

              return (
                <div
                  key={dayLabel}
                  className={`flex justify-between items-center px-4 py-3 rounded-md border border-white/10 ${textColor}`}
                  style={{ backgroundColor: background }}
                >
                  <span className="font-semibold text-sm sm:text-base">{dayLabel}</span>
                  <span className="text-sm sm:text-base">{mood?.label || '—'}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    
    </div>
  );
};


// Utility to determine appropriate text color for contrast
function getContrastYIQ(hex: string): 'light' | 'dark' {
  const sanitizedHex = hex.replace('#', '');
  const r = parseInt(sanitizedHex.substr(0, 2), 16);
  const g = parseInt(sanitizedHex.substr(2, 2), 16);
  const b = parseInt(sanitizedHex.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'light' : 'dark';
}
export default Dashboard;