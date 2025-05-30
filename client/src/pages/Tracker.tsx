// File: client/src/pages/Tracker.tsx

import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useAuth } from '../context/authContext';
import { GET_MOOD_ENTRIES } from '../graphql/queries';
import MoodCalendar from '../components/tracker/MoodCalendar';
import MoodModal from '../components/tracker/MoodModal';
import CreateMood from '../components/tracker/CreateMood';
import styles from '../assets/css/tracker/Tracker.module.css';
import buttonStyles from '../assets/css/common/Button.module.css';
import { MoodEntry } from '../models/Mood';

const Tracker: React.FC = () => {
  const { user } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEntries, setSelectedEntries] = useState<MoodEntry[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data, loading, error, refetch } = useQuery(GET_MOOD_ENTRIES, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const entries: MoodEntry[] = data?.getMoodEntries?.entries || [];

  const entriesByDate = useMemo(() => {
    const map: Record<string, { moods: { mood: string; moodColor: string }[] }> = {};
    for (const entry of entries) {
      const key = new Date(entry.date).toDateString();
      if (!map[key]) {
        map[key] = { moods: [{ mood: entry.mood, moodColor: entry.moodColor }] };
      } else if (map[key].moods.length < 3) {
        map[key].moods.push({ mood: entry.mood, moodColor: entry.moodColor });
      }
    }
    return map;
  }, [entries]);

  const calendarDays = useMemo(() => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days: { date: Date; currentMonth: boolean }[] = [];

    for (let i = 0; i < startOfMonth; i++) {
      const prevDate = new Date(currentYear, currentMonth, i - startOfMonth + 1);
      days.push({ date: prevDate, currentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(currentYear, currentMonth, i), currentMonth: true });
    }

    return days;
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDayClick = (date: Date) => {
    const key = date.toDateString();
    const entriesForDay = entries.filter(
      (e: MoodEntry) => new Date(e.date).toDateString() === key
    );
    setSelectedDate(date);
    setSelectedEntries(entriesForDay);
  };

  const closeModal = () => {
    setSelectedDate(null);
    setSelectedEntries([]);
  };

  const handleCreate = () => setShowCreate(true);
  const handleCancelCreate = () => setShowCreate(false);
  const handleSaveCreate = () => {
    setShowCreate(false);
    refetch();
  };

  return (
    <>
      {!user ? (
        <p className={styles.statusMessage}>Error: User Not Authenticated</p>
      ) : loading ? (
        <p className={styles.statusMessage}>Loading...</p>
      ) : entries.length === 0 ? (
<div className={styles.emptyStateContainer}>
  <p className={`${styles.statusMessage} text-white`}>No Entries Created</p>
  {showCreate ? (
    <CreateMood
      userId={user.id}
      onSave={handleSaveCreate}
      onCancel={handleCancelCreate}
    />
  ) : (
    <button
      onClick={handleCreate}
      className={`${buttonStyles.button} ${buttonStyles.primary}`}
    >
      Create
    </button>
  )}
</div>
      ) : (
        <>
          {/* Move calendar navigation outside the wrapper */}
          <div className={styles.navRow}>
            <button onClick={handlePrevMonth} className={buttonStyles.prevButton}>
              ← Back
            </button>
            <span className={buttonStyles.monthLabel}>
              {currentDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric'
              })}
            </span>
            <button onClick={handleNextMonth} className={buttonStyles.nextButton}>
              Next →
            </button>
          </div>

          <div className={styles.trackerFlexContainer}>
            <div className={styles.calendarWrapper}>
              <MoodCalendar
                calendarDays={calendarDays}
                entriesByDate={entriesByDate}
                handleDayClick={handleDayClick}
                hideMoodText={!!selectedDate}
              />
            </div>

            {selectedDate && (
              <div className={styles.modalWrapper}>
                <MoodModal
                  userId={user.id}
                  date={selectedDate}
                  entries={selectedEntries}
                  onClose={closeModal}
                  refetch={refetch}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Tracker;
