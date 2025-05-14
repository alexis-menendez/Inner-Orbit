// File: client/src/components/tracker/WeeklyMoodCalendar.tsx

import React from 'react';

export const WeeklyMoodCalendar = ({ weekData }: { weekData: any[] }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 gap-4 p-4 text-white bg-black rounded-lg bg-opacity-20">
      {days.map((day, index) => {
        const mood = weekData.find((m) => m.day === day);
        return (
          <div key={day} className="space-y-2 text-center">
            <div className="font-semibold">{day}</div>
            {mood ? (
              <div
                className="p-2 text-sm rounded-full"
                style={{ backgroundColor: mood.color }}
              >
                {mood.label}
              </div>
            ) : (
              <div className="text-gray-500">No Entry</div>
            )}
          </div>
        );
      })}
    </div>
  );
};
