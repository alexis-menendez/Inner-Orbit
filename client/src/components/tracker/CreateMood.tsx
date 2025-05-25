// File: client/src/components/tracker/CreateMood.tsx

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MOOD_ENTRY } from '../../graphql/mutations';
import { moodList } from '../../models/Mood';
import styles from '../../assets/css/tracker/Tracker.module.css';

interface CreateMoodProps {
  userId: string;
  onSave: () => void;
  onCancel: () => void;
}

const CreateMood: React.FC<CreateMoodProps> = ({ userId, onSave, onCancel }) => {
  const [mood, setMood] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');

  const [addMoodEntry] = useMutation(ADD_MOOD_ENTRY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const today = new Date();
    const moodItem = moodList.find((m) => m.id === mood);
    const moodColor = moodItem?.color || '#ccc';

    console.log('[TRACKER] Attempting to create mood entry:', {
      mood,
      intensity,
      note,
      userId,
    });

    try {
      await addMoodEntry({
        variables: {
          input: {
            userId,
            date: today.toISOString(),
            mood,
            intensity,
            note,
            moodColor,
          },
        },
      });
      console.log('[TRACKER] Mood entry successfully created and saved');
      onSave();
    } catch (error) {
      console.error('[TRACKER] Failed to create mood entry:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.modalBox}>
      <h2>Create Mood Entry</h2>

      <label>Mood</label>
      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className={styles.modalInput}
        required
      >
        <option value="" disabled>Select a mood</option>
        {moodList.map((m) => (
          <option key={m.id} value={m.id}>{m.label}</option>
        ))}
      </select>

      <label>Intensity: {intensity}</label>
      <input
        type="range"
        min="1"
        max="10"
        value={intensity}
        onChange={(e) => setIntensity(+e.target.value)}
        className={styles.modalInput}
      />

      <label>Note</label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optional note..."
        className={styles.modalTextarea}
      />

      <div className={styles.modalActions}>
        <button type="submit" className={styles.saveButton}>Save</button>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancel</button>
      </div>
    </form>
  );
};

export default CreateMood;
