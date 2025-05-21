// File: client/src/components/dashboard/WeeklyMoodCalendar.tsx

import React, { useEffect, useMemo, useState } from 'react';
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
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

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

  return (
    <div className="grid grid-cols-7 gap-2 text-center">
      {dateStrings.map((isoDate) => {
        const dateObj = new Date(isoDate);
        const dateKey = dateObj.toDateString();
        const entry = moodMap[dateKey];
        const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const shortDate = dateObj.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });

        return (
          <div
            key={isoDate}
            className="p-3 rounded-lg shadow-md border transition duration-300 hover:shadow-lg hover:scale-105"
            style={{
              backgroundColor: entry?.moodColor || '#1e293b',
              borderColor: '#000000',
              borderWidth: '1px',
              opacity: entry ? 1 : 0.4,
              color: '#fff',
              cursor: entry?.note ? 'pointer' : 'default'
            }}
            onClick={() => entry?.note && setSelectedNote(entry.note)}
          >
            <div className="text-sm font-semibold">{day}</div>
            <div className="text-xs mb-1">{shortDate}</div>
            <div className="text-xs font-medium">{entry?.mood || '—'}</div>
            {entry && (
              <div className="w-full bg-white bg-opacity-20 h-2 rounded-full mt-2">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(entry.intensity / 10) * 100}%`, backgroundColor: '#fff' }}
                ></div>
              </div>
            )}
          </div>
        );
      })}

      {/* Modal for Note */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-xl shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Mood Note</h2>
            <p className="mb-4 whitespace-pre-wrap">{selectedNote}</p>
            <button
              className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
              onClick={() => setSelectedNote(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyMoodReview;
