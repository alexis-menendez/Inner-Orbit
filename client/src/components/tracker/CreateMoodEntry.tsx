// File: client/src/components/tracker/CreateMoodEntry.tsx

import React, { useState } from 'react';
import styles from '../../assets/css/common/Form.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';
import { moodList, getMoodColor } from '../../models/Mood';

interface CreateMoodEntryProps {
  onSave: (entry: {
    date: string;
    mood: string;
    intensity: number;
    moodColor: string;
    note?: string;
  }) => void;
  onCancel: () => void;
}

const CreateMoodEntry: React.FC<CreateMoodEntryProps> = ({ onSave, onCancel }) => {
  const [mood, setMood] = useState('neutral');
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const moodColor = getMoodColor(mood);
    onSave({ date: today, mood, intensity, moodColor, note });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Log Mood</h2>

      <label className={styles.label}>Mood</label>
      <select
        className={styles.input}
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        required
      >
        {moodList.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>

      <label className={styles.label}>Intensity: {intensity}</label>
      <input
        className={styles.input}
        type="range"
        min="1"
        max="10"
        value={intensity}
        onChange={(e) => setIntensity(Number(e.target.value))}
      />

      <label className={styles.label}>Optional Note</label>
      <textarea
        className={styles.input}
        placeholder="Optional note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
      />

      <button type="submit" className={`${buttonStyles.button} ${buttonStyles.primary}`}>
        Save Mood
      </button>

      <button
        type="button"
        onClick={onCancel}
        className={`${buttonStyles.button} ${buttonStyles.tertiary}`}
      >
        Cancel
      </button>
    </form>
  );
};

export default CreateMoodEntry;

