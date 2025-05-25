// File: client/src/pages/Tracker.tsx

import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import NavBar from '../components/nav/NavBar';
import { useAuth } from '../context/authContext';
import { GET_MOOD_ENTRIES } from '../graphql/queries';
import MoodCalendar from '../components/tracker/MoodCalendar';
import MoodModal from '../components/tracker/MoodModal';
import CreateMood from '../components/tracker/CreateMood';
import styles from '../assets/css/tracker/Tracker.module.css';

const Tracker: React.FC = () => {
  const { user } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_MOOD_ENTRIES, {
    variables: { userId: user?.id },
    skip: !user?.id,

  });

  const entries = data?.getMoodEntries?.entries || [];

  const entriesByDate = useMemo(() => {
    const map: Record<string, any> = {};
    for (const entry of entries) {
      const key = new Date(entry.date).toDateString();
      map[key] = entry;
    }
    return map;
  }, [entries]);

  const calendarDays = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
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
  }, []);

  const handleDayClick = (date: Date, entry: any) => {
    setSelectedDate(date);
    setSelectedEntry(entry);
  };

  const closeModal = () => {
    setSelectedDate(null);
    setSelectedEntry(null);
  };

  const handleCreate = () => setShowCreate(true);
  const handleCancelCreate = () => setShowCreate(false);
  const handleSaveCreate = () => {
    setShowCreate(false);
    refetch();
  };

  return (
    <>
      <NavBar />
      <h1 className={styles.trackerHeader}>Mood Tracker</h1>

      {!user ? (
        <p className={styles.statusMessage}>Error: User Not Authenticated</p>
      ) : loading ? (
        <p className={styles.statusMessage}>Loading...</p>
      ) : entries.length === 0 ? (
        <>
          <p className={styles.statusMessage}>No Entries Created</p>
          {showCreate ? (
            <CreateMood
              userId={user.id}
              onSave={handleSaveCreate}
              onCancel={handleCancelCreate}
            />
          ) : (
            <button onClick={handleCreate} className={styles.createButton}>Create</button>
          )}
        </>
      ) : (
        <>
          <MoodCalendar
            calendarDays={calendarDays}
            entriesByDate={entriesByDate}
            handleDayClick={handleDayClick}
          />
          {selectedDate && (
            <MoodModal
              userId={user.id}
              date={selectedDate}
              entry={selectedEntry}
              onClose={closeModal}
              refetch={refetch}
            />
          )}
        </>
      )}
    </>
  );
};

export default Tracker;