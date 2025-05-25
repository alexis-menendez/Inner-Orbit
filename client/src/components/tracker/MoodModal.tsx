// File: client/src/components/tracker/MoodModal.tsx

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MOOD_ENTRY, UPDATE_MOOD_ENTRY, DELETE_MOOD_ENTRY } from '../../graphql/mutations';
import { moodList } from '../../models/Mood';
import { useAuth } from '../../context/authContext';
import formStyles from '../../assets/css/common/Form.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';

interface MoodModalProps {
  userId: string;
  date: Date;
  entries: any[]; // all entries for this day
  onClose: () => void;
  refetch: () => void;
}

const MoodModal: React.FC<MoodModalProps> = ({ userId, date, entries, onClose, refetch }) => {
  const { user } = useAuth();

  const [editingEntry, setEditingEntry] = useState<any | null>(null);
  const [mood, setMood] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [addMoodEntry] = useMutation(ADD_MOOD_ENTRY);
  const [updateMoodEntry] = useMutation(UPDATE_MOOD_ENTRY);
  const [deleteMoodEntry] = useMutation(DELETE_MOOD_ENTRY);

  const moodItem = moodList.find((m) => m.id === mood);

  const startAdd = () => {
    setMood('');
    setIntensity(5);
    setNote('');
    setEditingEntry(null);
    setIsAddingNew(true);
  };

  const startEdit = (entry: any) => {
    setMood(entry.mood);
    setIntensity(entry.intensity);
    setNote(entry.note || '');
    setEditingEntry(entry);
    setIsAddingNew(false);
  };

  const handleSubmit = async () => {
    if (!user || !user.id) {
      console.error('[TRACKER] No authenticated user found.');
      return;
    }

    const moodColor = moodItem?.color || '#ccc';

    try {
      if (editingEntry?._id) {
        await updateMoodEntry({
          variables: {
            id: editingEntry._id,
            input: { mood, intensity, note, moodColor },
          },
        });
      } else {
        await addMoodEntry({
          variables: {
            input: {
              userId,
              date: date.toISOString(),
              mood,
              intensity,
              note,
              moodColor,
            },
          },
        });
      }

      setEditingEntry(null);
      setIsAddingNew(false);
      refetch();
    } catch (error) {
      console.error('[TRACKER] Mutation failed:', error);
    }
  };

  const handleDelete = async (entryId: string) => {
    try {
      await deleteMoodEntry({ variables: { id: entryId } });
      refetch();
    } catch (error) {
      console.error('[TRACKER] Failed to delete mood entry:', error);
    }
  };

  return (
    <div className={`${formStyles.formContainer} ${formStyles.whiteText}`}>

      <h2>
        {editingEntry ? 'Edit Mood Entry' : isAddingNew ? 'Add Mood Entry' : `Entries for ${date.toDateString()}`}
      </h2>

      {!editingEntry && !isAddingNew && (
        <>
          {entries.length === 0 ? (
            <p>No entries yet for this day.</p>
          ) : (
            entries.map((entry) => (
              <div key={entry._id}>
                <p><strong>{entry.mood}</strong> (Intensity {entry.intensity})</p>
                {entry.note && <p>{entry.note}</p>}
                <div>
                  <button onClick={() => startEdit(entry)} className={`${buttonStyles.button} ${buttonStyles.primary}`}>Edit</button>
                  <button onClick={() => handleDelete(entry._id)} className={`${buttonStyles.button} ${buttonStyles.danger}`}>Delete</button>
                </div>
              </div>
            ))
          )}
          <div>
            <button onClick={startAdd} className={`${buttonStyles.button} ${buttonStyles.primary}`}>+ Add New</button>
            <button onClick={onClose} className={`${buttonStyles.button} ${buttonStyles.secondary}`}>Close</button>
          </div>
        </>
      )}

      {(editingEntry || isAddingNew) && (
        <>
          <label>Mood</label>
          <select value={mood} onChange={(e) => setMood(e.target.value)} className={formStyles.input}>
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
            className={formStyles.input}
          />

          <label>Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional note..."
            className={formStyles.input}
          />

          <div>
            <button onClick={handleSubmit} className={`${buttonStyles.button} ${buttonStyles.primary}`}>Save</button>
            <button onClick={() => {
              setEditingEntry(null);
              setIsAddingNew(false);
            }} className={`${buttonStyles.button} ${buttonStyles.secondary}`}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MoodModal;
