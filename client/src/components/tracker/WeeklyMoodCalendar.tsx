// File: client/src/components/tracker/WeeklyMoodCalendar.tsx

import React from 'react';
import { format, subDays } from 'date-fns';
import { useQuery } from '@apollo/client';
import { GET_WEEKLY_MOODS, GET_MOOD_ENTRIES } from '../../graphql/queries';

interface MoodEntry {
  date: string;
  mood: string;
  note?: string;
}

interface MoodOption {
  id: string;
  label: string;
  color: string;
}

const getLast7Dates = (): string[] => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) =>
    format(subDays(today, 6 - i), 'yyyy-MM-dd')
  );
};

const WeeklyMoodReview: React.FC = () => {
  const last7Dates = getLast7Dates();

  const { data: moodsData, loading: moodsLoading, error: moodsError } = useQuery(GET_WEEKLY_MOODS, {
    variables: { dates: last7Dates },
  });

  const { data: moodOptionsData, loading: optionsLoading, error: optionsError } = useQuery(GET_MOOD_ENTRIES);

  if (moodsLoading || optionsLoading) return <p>Loading moods...</p>;
  if (moodsError || optionsError) return <p>Error loading mood data.</p>;

  const moods: MoodEntry[] = moodsData?.moodsByDates || [];
  const moodOptions: MoodOption[] = moodOptionsData?.moodOptions || [];

  const getMoodColor = (moodId: string): string => {
    const mood = moodOptions.find(
      (m) => m.id.toLowerCase() === moodId.toLowerCase()
    );
    return mood?.color || '#f3f4f6';
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">This Week's Mood</h3>
      <ul className="space-y-2">
        {last7Dates.map((date) => {
          const moodEntry = moods.find((m) => m.date === date);
          const bgColor = moodEntry ? getMoodColor(moodEntry.mood) : '#e5e7eb';

          return (
            <li
              key={date}
              style={{
                backgroundColor: bgColor,
                padding: '8px 12px',
                borderRadius: '8px',
                color: '#1f2937',
              }}
            >
              <strong>{date}:</strong>{' '}
              {moodEntry ? moodEntry.mood : 'No entry'}
            </li>
          );
        })}
      </ul>

    </div>
  );
};

export default WeeklyMoodReview;
