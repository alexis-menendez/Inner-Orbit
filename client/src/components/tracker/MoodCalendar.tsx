// File: client/src/components/tracker/MoodCalendar.tsx

import React from 'react';
import styles from '../../assets/css/tracker/Tracker.module.css';

type MoodDay = {
  label: string;
  color: string;
};

type Props = {
  moodData: Record<string, MoodDay>;
  onDayClick: (date: string) => void;
};

export const MoodCalendar: React.FC<Props> = ({ moodData, onDayClick }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = Array.from({ length: startOfMonth + daysInMonth }, (_, index) => {
    if (index < startOfMonth) return null;
    const day = index - startOfMonth + 1;
    const dateStr = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
    return { day, dateStr };
  });

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <div className="grid grid-cols-7 gap-2 text-white">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="text-center font-bold text-sm text-white/70">
            {d}
          </div>
        ))}

        {days.map((d, i) =>
          d ? (
            <div
              key={d.dateStr}
              onClick={() => onDayClick(d.dateStr)}
              className={`h-24 p-2 rounded-md text-sm cursor-pointer flex flex-col items-center justify-center ${
                d.dateStr === today.toISOString().split('T')[0]
                  ? 'border-2 border-white'
                  : 'border border-white/20'
              }`}
              style={{
                backgroundColor: moodData[d.dateStr]?.color || 'transparent',
              }}
            >
              <div className="font-semibold">{d.day}</div>
              <div className="text-xs">{moodData[d.dateStr]?.label || ''}</div>
            </div>
          ) : (
            <div key={i}></div>
          )
        )}
      </div>
    </div>
  );
};
