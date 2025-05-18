import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_WEEKLY_MOODS } from '../../graphql/queries';
import { useAuth } from '../../context/authContext';

interface MoodEntry {
  _id: string;
  date: string;
  mood: string;
  moodColor: string;
  intensity: number;
  note?: string;
  createdAt?: string;
}

const WeeklyMoodReview: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const dateStrings = useMemo(() => {
    const dates: string[] = [];
    const d = new Date(startOfWeek);
    while (d <= endOfWeek) {
      dates.push(new Date(d).toISOString().split('T')[0]);
      d.setDate(d.getDate() + 1);
    }
    return dates;
  }, [startOfWeek, endOfWeek]);

  const { data, loading, error } = useQuery(GET_WEEKLY_MOODS, {
    variables: { dates: dateStrings, userId },
    skip: !userId,
  });

  const moodMap = useMemo(() => {
    const map: Record<string, MoodEntry> = {};
    if (data?.moodsByDates) {
      data.moodsByDates.forEach((entry: MoodEntry) => {
        const dateKey = new Date(entry.date).toDateString();
        map[dateKey] = entry;
      });
    }
    return map;
  }, [data]);

  if (!userId) return <p className="text-white">Please log in to view your moods.</p>;
  if (loading) return <p className="text-white">Loading weekly moods...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
console.log("UserId:", userId);
console.log("Query Dates:", dateStrings);
console.log("Fetched Data:", data);
console.log("Mapped Moods:", moodMap);
  return (
    <div className="grid grid-cols-7 gap-2 text-center">
      {dateStrings.map((isoDate) => {
        const dateObj = new Date(isoDate);
        const dateKey = dateObj.toDateString();
        const entry = moodMap[dateKey];
        const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

        return (
          <div
            key={isoDate}
            className="p-3 rounded-md shadow-md"
            style={{
              backgroundColor: entry?.moodColor || '#1e293b',
              color: '#fff',
              opacity: entry ? 1 : 0.4,
            }}
          >
            <div className="text-sm font-semibold">{day}</div>
            <div className="text-xs">{entry?.mood || '—'}</div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyMoodReview;
