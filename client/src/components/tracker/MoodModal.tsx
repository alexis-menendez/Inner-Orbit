import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MOOD_ENTRY, UPDATE_MOOD_ENTRY, DELETE_MOOD_ENTRY } from '../../graphql/mutations';
import { moodList } from '../../models/Mood';
import { useAuth } from '../../context/authContext';
import formStyles from '../../assets/css/common/Form.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';
import trackerStyles from '../../assets/css/tracker/Tracker.module.css';

interface MoodModalProps {
  userId: string;
  date: Date;
  entries: any[];
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
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const isDarkColor = (hex: string) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 150;
  };

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
    const finalNote = note.trim() || 'No notes created for this entry';

    try {
      if (editingEntry?._id) {
        await updateMoodEntry({
          variables: {
            id: editingEntry._id,
            input: { mood, intensity, note: finalNote, moodColor },
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
              note: finalNote,
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
          <div>
            <button onClick={startAdd} className={`${buttonStyles.button} ${buttonStyles.prevButton}`}>
              + Add New
            </button>
            <button onClick={onClose} className={`${buttonStyles.button} ${buttonStyles.nextButton}`}>
              Close
            </button>
          </div>

          {entries.length > 0 && (
            <div style={{ width: '100%', borderTop: '1px solid #999', margin: '1rem 0' }} />
          )}

          {entries.length === 0 ? (
            <p>No entries created yet for this day.</p>
          ) : (
            entries.map((entry, index) => {
              const textColor = isDarkColor(entry.moodColor) ? '#ffffff' : '#000000';
              return (
                <div key={entry._id}>
                  <p
                    className={trackerStyles.modalMoodText}
                    style={{
                      backgroundColor: entry.moodColor,
                      color: textColor,
                      padding: '4px 8px',
                      borderRadius: '6px',
                      display: 'inline-block',
                      marginBottom: '0.25rem',
                      fontWeight: '300',
                    }}
                  >
                    {capitalize(entry.mood)}
                  </p>
                  <p className={trackerStyles.modalIntensityText}>Intensity {entry.intensity}</p>
                  {entry.note && (
                    <p className={trackerStyles.modalNoteText}>
                      {entry.note}
                    </p>
                  )}
                  <div>
                    <button
                      onClick={() => startEdit(entry)}
                      className={`${buttonStyles.button} ${buttonStyles.primary}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry._id)}
                      className={`${buttonStyles.button} ${buttonStyles.secondary}`}
                    >
                      Delete
                    </button>
                  </div>
                  {index < entries.length - 1 && (
                    <hr style={{ margin: '1rem 0', borderColor: '#444' }} />
                  )}
                </div>
              );
            })
          )}
        </>
      )}

      {(editingEntry || isAddingNew) && (
        <>
          <label>Mood</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className={formStyles.input}
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
            <button
              onClick={handleSubmit}
              className={`${buttonStyles.button} ${buttonStyles.primary}`}
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingEntry(null);
                setIsAddingNew(false);
              }}
              className={`${buttonStyles.button} ${buttonStyles.secondary}`}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MoodModal;
