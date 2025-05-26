// File: client/src/components/dashboard/WeeklyMoodCalendar.tsx

import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MOOD_ENTRIES } from '../../graphql/queries';
import styles from '../../assets/css/tracker/Tracker.module.css';
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
interface WeeklyMoodReviewProps {
  onMoodSubmit?: () => void;
}


const WeeklyMoodReview: React.FC<WeeklyMoodReviewProps> = ({ onMoodSubmit }) => {

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
      dates.push(new Date(d).toDateString());
      d.setDate(d.getDate() + 1);
    }
    return dates;
  }, [startOfWeek, endOfWeek]);

  const { data, loading, error } = useQuery(GET_MOOD_ENTRIES, {
    variables: { userId },
    skip: !userId,
  });

  const moodMap = useMemo(() => {
    const map: Record<string, MoodEntry[]> = {};
    if (data?.getMoodEntries?.entries) {
      data.getMoodEntries.entries.forEach((entry: MoodEntry) => {
        const key = new Date(entry.date).toDateString();
        if (!map[key]) map[key] = [];
        map[key].push(entry);
      });
    }
    return map;
  }, [data]);

  const getMoodGradient = (entries: MoodEntry[]) => {
    const colors = entries.map(e => e.moodColor);
    if (colors.length === 1) return colors[0];
    if (colors.length === 2) return `linear-gradient(180deg, ${colors[0]} 50%, ${colors[1]} 50%)`;
    if (colors.length === 3) return `linear-gradient(180deg, ${colors[0]} 33.33%, ${colors[1]} 33.33% 66.66%, ${colors[2]} 66.66%)`;
    return '#1e293b';
  };

  if (!userId) return <p className="text-white">Please log in to view your moods.</p>;
  if (loading) return <p className="text-white">Loading weekly moods...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-7 gap-2 text-center">
      {dateStrings.map((dateStr) => {
        const entries = moodMap[dateStr] || [];
        const dateObj = new Date(dateStr);
        const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const shortDate = dateObj.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });

        return (
          <div
            key={dateStr}
            className="p-3 rounded-lg shadow-md border transition duration-300 hover:shadow-lg hover:scale-105"
            style={{
              background: entries.length > 0 ? getMoodGradient(entries) : '#1e293b',
              borderColor: '#000000',
              borderWidth: '1px',
              opacity: entries.length > 0 ? 1 : 0.4,
              color: '#fff',
              cursor: entries.some(e => e.note) ? 'pointer' : 'default'
            }}
            onClick={() => {
              const noted = entries.find(e => e.note);
              if (noted?.note) setSelectedNote(noted.note);
            }}
          >
            <div className="text-sm font-semibold">{day}</div>
            <div className="text-xs mb-1">{shortDate}</div>
            <div className="text-xs font-medium">
              {entries.map(e => e.mood).join(', ') || '—'}
            </div>

            {entries.length > 0 && (
              <div className="w-full bg-white bg-opacity-20 h-2 rounded-full mt-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(entries.reduce((sum, e) => sum + e.intensity, 0) / entries.length / 10) * 100}%`,
                    backgroundColor: '#fff'
                  }}
                ></div>
              </div>
            )}
          </div>
        );
      })}

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
