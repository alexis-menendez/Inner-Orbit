// File: client/src/pages/Tracker.tsx
import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import NavBar from '../components/nav/NavBar';
import { moodList } from '../models/Mood';
import { useAuth } from '../context/authContext';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../assets/css/tracker/Tracker.module.css';

import { GET_MOOD_ENTRIES } from '../graphql/queries';
import {
  ADD_MOOD_ENTRY,
  UPDATE_MOOD_ENTRY,
  DELETE_MOOD_ENTRY
} from '../graphql/mutations';

const Tracker: React.FC = () => {
  const { user } = useAuth();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [modalData, setModalData] = useState<any | null>(null);

  const { loading, error, data, refetch } = useQuery(GET_MOOD_ENTRIES, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const [addMoodEntry] = useMutation(ADD_MOOD_ENTRY);
  const [updateMoodEntry] = useMutation(UPDATE_MOOD_ENTRY);
  const [deleteMoodEntry] = useMutation(DELETE_MOOD_ENTRY);

  const handleDayClick = (date: Date, entry: any) => {
    setModalData({ date, entry });
  };

    const handleSubmit = async (values: any) => {
      if (!user?.id) return;

      console.log("[TRACKER SUBMIT] values.date:", values.date);

      if (!values.date || isNaN(new Date(values.date).getTime())) {
        console.error("Invalid or missing date", values.date);
        return;
      }

    if (values._id) {
      await updateMoodEntry({
        variables: {
          id: values._id,
          input: {
            mood: values.mood,
            intensity: values.intensity,
            note: values.note,
            moodColor: values.moodColor,
          },
        },
      });
    } else {
      await addMoodEntry({
        variables: {
          input: {
            date: new Date(values.date).toISOString(),
            mood: values.mood,
            intensity: values.intensity,
            moodColor: values.moodColor,
            note: values.note,
            userId: user.id,
          },
        },
      });
    }

    setModalData(null);
    refetch();
  };


  const handleDelete = async (id: string) => {
    await deleteMoodEntry({ variables: { id } });
    setModalData(null);
    refetch();
  };

  const entriesByDate = useMemo(() => {
    const map: Record<string, any> = {};
  if (data?.getMoodEntries?.entries) {
    data.getMoodEntries.entries.forEach((entry: any) => {
        const dateKey = new Date(entry.date).toDateString();
        map[dateKey] = entry;
      });
    }
    return map;
  }, [data]);

  const startDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

  const calendarDays = () => {
    const days: { date: Date; currentMonth: boolean }[] = [];
    for (let i = 0; i < startDay; i++) {
      days.push({ date: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), -i), currentMonth: false });
    }
    days.reverse();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i), currentMonth: true });
    }
    while (days.length < 42) {
      days.push({ date: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), daysInMonth + (days.length - startDay) + 1), currentMonth: false });
    }
    return days;
  };

  return (
    <>
      <NavBar />
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>Tracker Page</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <button
          style={{ padding: '4px 10px', fontSize: '0.85rem', backgroundColor: '#090585', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
          ◀ Previous
        </button>
        <h2 style={{ color: 'pink' }}>{selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}</h2>
        <button
          style={{ padding: '4px 8px', fontSize: '0.85rem', backgroundColor: '#20355D', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
          Next ▶
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#1e1b4b', border: '2px solid pink', padding: '0.5rem' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} style={{ textAlign: 'center', fontWeight: 'bold', color: '#faf2f2', fontSize: '0.875rem' }}>{d}</div>
        ))}
        {calendarDays().map(({ date, currentMonth }, i) => {
          const entry = entriesByDate[date.toDateString()];
          return (
            <div
              key={i}
              onClick={() => handleDayClick(date, entry)}
              style={{
                height: '5rem',
                backgroundColor: entry?.moodColor || (currentMonth ? '#4c1d95' : '#1f2937'),
                color: 'white',
                border: '1px solid white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: currentMonth ? 1 : 0.5,
              }}>
              <div style={{ fontWeight: 'bold' }}>{date.getDate()}</div>
              <div style={{ fontSize: '0.75rem' }}>{entry?.mood || ''}</div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {modalData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
            }}
          >
            <MoodModal
              date={modalData.date}
              entry={modalData.entry}
              onSubmit={handleSubmit}
              onDelete={handleDelete}
              onClose={() => setModalData(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tracker;

const MoodModal = ({ date, entry, onSubmit, onDelete, onClose }: any) => {
  const [mood, setMood] = useState(entry?.mood || '');
  const [intensity, setIntensity] = useState(entry?.intensity || 5);
  const [note, setNote] = useState(entry?.note || '');
  const moodItem = moodList.find((m) => m.id === mood);

  const handleSubmit = () => {
    const resolvedDate = entry?.date ? new Date(entry.date) : date;

    console.log("[MODAL SUBMIT] resolvedDate:", resolvedDate);

    onSubmit({
      _id: entry?._id,
      date: resolvedDate,
      mood,
      intensity,
      note,
      moodColor: moodItem?.color || '#ccc',
    });
  };

  return (
    <div className="modal" style={{ background: '#1e1e2f', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 0 20px #999', color: 'white', minWidth: '300px' }}>
      <h2>{entry ? 'Edit Mood' : 'Add Mood'}</h2>
      <label>Mood</label>
      <select value={mood} onChange={(e) => setMood(e.target.value)} style={{ width: '100%', marginBottom: '0.5rem' }}>
        <option value="" disabled>Select a mood</option>
        {moodList.map((m) => (
          <option key={m.id} value={m.id}>{m.label}</option>
        ))}
      </select>

      <label>Intensity: {intensity}</label>
      <input type="range" min="1" max="10" value={intensity} onChange={(e) => setIntensity(+e.target.value)} style={{ width: '100%' }} />

      <label>Note</label>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional note..." style={{ width: '100%', minHeight: '4rem', marginBottom: '1rem' }} />

      <button onClick={handleSubmit} style={{ backgroundColor: '#4c1d95', color: 'white', padding: '0.5rem 1rem', marginRight: '1rem' }}>{entry ? 'Update' : 'Add'}</button>
      {entry && <button onClick={() => onDelete(entry._id)} style={{ backgroundColor: '#991b1b', color: 'white', padding: '0.5rem 1rem', marginRight: '1rem' }}>Delete</button>}
      <button onClick={onClose} style={{ backgroundColor: '#374151', color: 'white', padding: '0.5rem 1rem' }}>Cancel</button>
    </div>
  );
};
