// File: client/src/components/tracker/CreateMood.tsx

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MOOD_ENTRY } from '../../graphql/mutations';
import { moodList } from '../../models/Mood';
import MoodComboBox from './MoodComboBox'; 
import formStyles from '../../assets/css/common/Form.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';

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

  const intensityColors = [
    '#ffffff', '#e2e2e2', '#c6c6c6', '#aaaaaa', '#8d8d8d',
    '#717171', '#555555', '#383838', '#1c1c1c', '#000000'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const today = new Date();
    const moodItem = moodList.find((m) => m.id === mood);
    const moodColor = moodItem?.color || '#ccc';
    const finalNote = note.trim() || 'No notes created for this entry';

    const payload = { userId, date: today.toISOString(), mood, intensity, note: finalNote, moodColor };
    console.log('[TRACKER] Creating mood entry:', payload);

    try {
      await addMoodEntry({ variables: { input: payload } });
      onSave();
    } catch (error) {
      console.error('[TRACKER] Failed to create mood entry:', error);
    }
  };

  const thumbColor = intensityColors[intensity - 1];
  const backgroundColor = intensityColors[10 - intensity];

  return (
    <form onSubmit={handleSubmit} className={formStyles.formContainer}>
      <h2 className={formStyles.formTitle}>Create Mood Entry</h2>

      <label className={formStyles.whiteText}>Mood</label>
      <MoodComboBox
        value={mood}
        onChange={setMood}
        moodList={moodList}
        required
      />

      <label className={formStyles.whiteText}>Intensity: {intensity}</label>
      <input
        type="range"
        min="1"
        max="10"
        value={intensity}
        onChange={(e) => setIntensity(+e.target.value)}
        className={formStyles.input}
        style={{ accentColor: thumbColor, backgroundColor }}
      />

      <label className={formStyles.whiteText}>Note</label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optional note..."
        className={formStyles.input}
        rows={4}
      />

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button type="submit" className={`${buttonStyles.button} ${buttonStyles.primary}`}>Save</button>
        <button type="button" onClick={onCancel} className={`${buttonStyles.button} ${buttonStyles.secondary}`}>Cancel</button>
      </div>
    </form>
  );
};

export default CreateMood;
