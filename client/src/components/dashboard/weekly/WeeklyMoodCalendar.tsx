// File: client/src/components/dashboard/weekly/WeeklyMoodCalendar.tsx

import React, { useMemo, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_MOOD_NOTE } from '../../../graphql/mutations';
import { useAuth } from '../../../context/authContext';
import { GET_MOOD_ENTRIES } from '../../../graphql/queries';
import MoodNotes from './MoodNotes';
import trackerStyles from '../../../assets/css/tracker/Tracker.module.css';
import dashboardStyles from '../../../assets/css/dashboard/Dashboard.module.css';
import formStyles from '../../../assets/css/common/Form.module.css';
import buttonStyles from '../../../assets/css/common/Button.module.css';

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
  horizontal?: boolean; 
}

const WeeklyMoodReview: React.FC<WeeklyMoodReviewProps> = ({ onMoodSubmit, horizontal }) => {
  const { user } = useAuth();
  const userId = user?.id;
  const [selectedNote, setSelectedNote] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [updateMoodNote] = useMutation(UPDATE_MOOD_NOTE);

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
    <div className={`${dashboardStyles.weeklyReviewContainer} ${horizontal ? dashboardStyles.weeklyReviewHorizontal : ''}`}>
      {dateStrings.map((dateStr) => {
        const entries = moodMap[dateStr] || [];
        const dateObj = new Date(dateStr);
        const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const shortDate = dateObj.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });

        return (
          <div
            key={dateStr}
            className={`${dashboardStyles.weeklyMoodCell} ${entries.length === 0 ? dashboardStyles.emptyMoodCell : dashboardStyles.filledMoodCell}`}
            style={{
              background: entries.length > 0 ? getMoodGradient(entries) : '#1e293b',
              opacity: entries.length > 0 ? 1 : 0.4,
              cursor: entries.some(e => e.note) ? 'pointer' : 'default',
            }}
            onClick={() => {
              if (entries.length > 0) {
                const noted = entries.find(e => typeof e.note === 'string');
                if (noted) {
                  setSelectedNote(noted.note || '');
                  setSelectedDate(dateStr);
                  setSelectedId(noted._id);
                }
              }
            }}
          >
            <div className={dashboardStyles.weeklyMoodDay}>{day}</div>
            <div className={dashboardStyles.weeklyMoodDate}>{shortDate}</div>
            <div className={dashboardStyles.weeklyMoodList}>
              {entries.length > 0 ? (
                entries.map((e, i) => <div key={i}>{e.mood}</div>)
              ) : (
                <div>—</div>
              )}
            </div>
            {entries.length > 0 && (
              <div className={dashboardStyles.weeklyMoodBar}>
                <div
                  style={{
                    width: `${(entries.reduce((sum, e) => sum + e.intensity, 0) / entries.length / 10) * 100}%`,
                    backgroundColor: '#fff',
                    height: '100%',
                    borderRadius: '9999px',
                  }}
                ></div>
              </div>
            )}
          </div>
        );
      })}

      {selectedDate && selectedId && (
        <MoodNotes
          _id={selectedId} 
          date={selectedDate}
          note={selectedNote}
          onNoteChange={(newNote: string) => setSelectedNote(newNote)}
          onClose={() => {
            setSelectedDate(null);
            setSelectedNote('');
            setSelectedId(null);
          }}
          onSave={async (newNote: string) => {
            if (!selectedId) return;
            try {
              await updateMoodNote({ variables: { _id: selectedId, note: newNote } });
            } catch (err) {
              console.error('Error updating note:', err);
            }
            setSelectedDate(null);
            setSelectedNote('');
            setSelectedId(null);
          }}
        />
      )}
    </div>
  );
};

export default WeeklyMoodReview;
