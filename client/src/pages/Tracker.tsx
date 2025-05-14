// File: client/src/pages/Tracker.tsx

import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import styles from '../assets/css/common/CosmicBackground.module.css'; // adjust path if needed
import NavBar from '../components/nav/NavBar';


const GET_MOOD_ENTRIES = gql`
  query GetMoodEntries {
    getMoodEntries {
      _id
      date
      mood
      intensity
      moodColor
    }
  }
`;

const ADD_MOOD_ENTRY = gql`
  mutation AddMoodEntry($date: String!, $mood: String!, $intensity: Int!, $moodColor: String!) {
    addMoodEntry(date: $date, mood: $mood, intensity: $intensity, moodColor: $moodColor) {
      _id
      dateI 
      mood
      intensity
      moodColor
    }
  }
`;

const Tracker: React.FC = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const { loading, error, data } = useQuery(GET_MOOD_ENTRIES);
  const [addMoodEntry] = useMutation(ADD_MOOD_ENTRY);

  const handleDayClick = async (date: Date, entry: any) => {
    if (entry) return alert(`Mood already exists: ${entry.mood}`);

    const mood = prompt("Enter your mood:", "Happy") || "Happy";
    const intensity = parseInt(prompt("Enter intensity (1-10):", "5") || "5");
    const moodColor = prompt("Choose a color:", "#ffcc00") || "#ffcc00";

    await addMoodEntry({
      variables: {
        date: date.toISOString().split('T')[0],
        mood,
        intensity,
        moodColor
      },
    });
  };

  const entriesByDate = useMemo(() => {
    const map: Record<string, any> = {};
    if (data?.getMoodEntries) {
      data.getMoodEntries.forEach((entry: any) => {
        const dateKey = new Date(entry.date).toDateString();
        map[dateKey] = entry;
      });
    }
    return map;
  }, [data]);

  const startDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

  const getCalendarDays = () => {
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
   <div className={styles['cosmic-background']}>
 <NavBar />
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>Tracker Page</h1>
<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
<button
  style={{
    padding: '4px 10px',
    fontSize: '0.85rem',
    backgroundColor: '#090585', // Rose red for Previous
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '6px'
  }}
  onClick={() =>
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))
  }
>
  ◀ Previous
</button>
  <h2 style={{ color: 'pink' }}>
    {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
  </h2>
 <button
  style={{
    padding: '4px 8px',
    fontSize: '0.85rem',
    backgroundColor: '#20355D',
    color: '#ffffff', // white text using hex
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }}
   onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
>
  Next ▶
</button>

</div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '0.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: '#1e1b4b',
          border: '2px solid pink',
          padding: '0.5rem',
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#faf2f2',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
            }}
          >
            {d}
          </div>
        ))}

        {getCalendarDays().map(({ date, currentMonth }, i) => {
          const entry = entriesByDate[date.toDateString()];
          const isToday = date.toDateString() === today.toDateString();

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
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{date.getDate()}</div>
              <div style={{ fontSize: '0.75rem' }}>{entry?.mood || ''}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tracker;
