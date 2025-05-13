// WeeklyMoodCalendar.tsx

import React from 'react';

export const WeeklyMoodCalendar = ({ weekData }: { weekData: any[] }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 gap-4 p-4 bg-black bg-opacity-20 rounded-lg text-white">
      {days.map((day, index) => {
        const mood = weekData.find((m) => m.day === day);
        return (
          <div key={day} className="text-center space-y-2">
            <div className="font-semibold">{day}</div>
            {mood ? (
              <div
                className="rounded-full p-2 text-sm"
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
