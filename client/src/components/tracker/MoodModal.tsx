// File: client/src/components/tracker/MoodModal.tsx

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MOOD_ENTRY, UPDATE_MOOD_ENTRY } from '../../graphql/mutations';
import { moodList } from '../../models/Mood';
import styles from '../../assets/css/tracker/Tracker.module.css';

interface MoodModalProps {
  date: Date;
  entry?: any;
  onClose: () => void;
  refetch: () => void;
}

const MoodModal: React.FC<MoodModalProps> = ({ date, entry, onClose, refetch }) => {
  const [mood, setMood] = useState(entry?.mood || '');
  const [intensity, setIntensity] = useState(entry?.intensity || 5);
  const [note, setNote] = useState(entry?.note || '');

  const [addMoodEntry] = useMutation(ADD_MOOD_ENTRY);
  const [updateMoodEntry] = useMutation(UPDATE_MOOD_ENTRY);

  const moodItem = moodList.find((m) => m.id === mood);

  const handleSubmit = async () => {
    const resolvedDate = entry?.date ? new Date(entry.date) : date;
    const moodColor = moodItem?.color || '#ccc';

    if (entry?._id) {
      console.log('[TRACKER] Attempting to update mood entry:', entry._id);
      try {
        await updateMoodEntry({
          variables: {
            id: entry._id,
            input: { mood, intensity, note, moodColor },
          },
        });
        console.log('[TRACKER] Mood entry successfully updated:', entry._id);
      } catch (error) {
        console.error('[TRACKER] Failed to update mood entry:', error);
      }
    } else {
      console.log('[TRACKER] Attempting to create mood entry:', { date: resolvedDate, mood });
      try {
        await addMoodEntry({
          variables: {
            input: {
              date: resolvedDate.toISOString(),
              mood,
              intensity,
              note,
              moodColor,
              userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : '',
            },
          },
        });
        console.log('[TRACKER] Mood entry successfully created and saved');
      } catch (error) {
        console.error('[TRACKER] Failed to create mood entry:', error);
      }
    }

    onClose();
    refetch();
  };

  return (
    <div className={styles.modalBox}>
      <h2>{entry ? 'Edit Mood Entry' : 'Add Mood Entry'}</h2>

      <label>Mood</label>
      <select value={mood} onChange={(e) => setMood(e.target.value)} className={styles.modalInput}>
        <option value="" disabled>Select a mood</option>
        {moodList.map((m) => (
          <option key={m.id} value={m.id}>{m.label}</option>
        ))}
      </select>

      <label>Intensity: {intensity}</label>
      <input type="range" min="1" max="10" value={intensity} onChange={(e) => setIntensity(+e.target.value)} className={styles.modalInput} />

      <label>Note</label>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional note..." className={styles.modalTextarea} />

      <div className={styles.modalActions}>
        <button onClick={handleSubmit} className={styles.saveButton}>{entry ? 'Update' : 'Add'}</button>
        <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
      </div>
    </div>
  );
};

export default MoodModal;