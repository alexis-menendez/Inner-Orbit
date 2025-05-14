// File: client/src/pages/Journal.tsx

import React, { useState } from 'react';
import StarBackground from '../components/common/StarBackground';
import CreateJournal from '../components/journal/CreateJournal';
import { getConstellationForEntryCount } from '../components/journal/ConstellationLogic';
import styles from '../assets/css/journal/Stars.module.css'; 

interface Entry {
  id: string;
  title: string;
  content: string;
  userId: string;
}

const mockUser = { id: 'user123', username: 'alexi' }; // simulate logged-in user

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleSaveEntry = (entry: { title: string; content: string }) => {
    const newEntry: Entry = {
      ...entry,
      id: crypto.randomUUID(),
      userId: mockUser.id
    };
    setEntries((prev) => [...prev, newEntry]);
    setShowForm(false);
  };

  const userEntries = entries.filter((entry) => entry.userId === mockUser.id);
  const { constellation, activeStars } = getConstellationForEntryCount(userEntries.length);

 return (
  <div
    style={{
      background: 'black',
      minHeight: '100vh',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <StarBackground /> {/* 🌌 Star field behind everything */}

    {userEntries.length === 0 ? (
      <div style={{ textAlign: 'center', marginTop: '5rem', position: 'relative', zIndex: 5 }}>
        <p>No entries created. Create an entry now.</p>
        <button onClick={() => setShowForm(true)}>Create Entry</button>
      </div>
    ) : (
      <div style={{ position: 'relative', minHeight: '60vh', zIndex: 5 }}>
        {activeStars.map((star, i) => (
          <div
            key={i}
            title={`Star ${i + 1} - ${constellation.name}`}
            className={styles.star}
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`
            }}
          />
        ))}
        <button
          onClick={() => setShowForm(true)}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: '#444',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          + Add Entry
        </button>
      </div>
    )}

    {showForm && (
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#222',
          padding: '2rem',
          borderRadius: '8px',
          zIndex: 20,
          boxShadow: '0 0 10px rgba(255,255,255,0.2)'
        }}
      >
        <CreateJournal onSave={handleSaveEntry} onCancel={() => setShowForm(false)} />
      </div>
    )}
  </div>
);
};

export default Journal;
