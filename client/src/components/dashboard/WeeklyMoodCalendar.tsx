// File: client/src/components/dashboard/WeeklyMoodCalendar.tsx

import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useAuth } from '../../context/authContext';
import { GET_MOOD_ENTRIES } from '../../graphql/queries';
import styles from '../../assets/css/dashboard/Dashboard.module.css';
import formStyles from '../../assets/css/common/Form.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';

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
    <div className={styles.weeklyReviewContainer}>
      {dateStrings.map((dateStr) => {
        const entries = moodMap[dateStr] || [];
        const dateObj = new Date(dateStr);
        const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const shortDate = dateObj.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });

        return (
          <div
            key={dateStr}
            className={styles.weeklyMoodCell}
            style={{
              background: entries.length > 0 ? getMoodGradient(entries) : '#1e293b',
              opacity: entries.length > 0 ? 1 : 0.4,
              cursor: entries.some(e => e.note) ? 'pointer' : 'default',
            }}
            onClick={() => {
              const noted = entries.find(e => e.note);
              if (noted?.note) setSelectedNote(noted.note);
            }}
          >
            <div className={styles.weeklyMoodDay}>{day}</div>
            <div className={styles.weeklyMoodDate}>{shortDate}</div>
            <div className={styles.weeklyMoodList}>
              {entries.length > 0 ? (
                entries.map((e, i) => <div key={i}>{e.mood}</div>)
              ) : (
                <div>—</div>
              )}
            </div>
            {entries.length > 0 && (
              <div className={styles.weeklyMoodBar}>
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

        {selectedNote && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className={formStyles.weeklyNoteWrapper}>
              <div className={formStyles.formContainer}>
                <div className={formStyles.weeklyNoteModal}>
                  <h2 className={formStyles.weeklyNoteTitle}>Mood Note</h2>
                  <p className={formStyles.weeklyNoteText}>{selectedNote}</p>
                  <button
                    className={`${buttonStyles.button} ${buttonStyles.secondary}`}
                    onClick={() => setSelectedNote(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default WeeklyMoodReview;
