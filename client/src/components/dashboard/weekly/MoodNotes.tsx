// File: client/src/components/dashboard/weekly/MoodNotes.tsx

import React, { useState } from 'react';
import styles from '../../../assets/css/tracker/Tracker.module.css';
import buttonStyles from '../../../assets/css/common/Button.module.css';
import formStyles from '../../../assets/css/common/Form.module.css';

interface MoodNotesProps {
  date: string;
  note: string;
  onNoteChange: (note: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const MoodNotes: React.FC<MoodNotesProps> = ({
  date,
  note,
  onNoteChange,
  onClose,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.moodNotesModal}>
      <div className={`${styles.moodNotesContent} ${styles.barlowText}`}>
        <h2>Notes for {date}</h2>

        {!isEditing ? (
          <>
            <p
              style={{
                whiteSpace: 'pre-wrap',
                minHeight: '6rem',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                lineHeight: '1.5',
                textAlign: 'center',
              }}
            >
              {note?.trim() || <em>No notes for this entry.</em>}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsEditing(true)}
                className={`${buttonStyles.button} ${buttonStyles.tertiary}`}
              >
                Edit
              </button>
              <button
                onClick={onClose}
                className={`${buttonStyles.button} ${buttonStyles.secondary}`}
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
          <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <label htmlFor="moodNote" style={{ marginBottom: '0.5rem' }}></label>
            <textarea
              id="moodNote"
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              className={formStyles.input}
              rows={6}
              placeholder="Write about your mood..."
              style={{
                resize: 'none',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                width: '100%',
                maxWidth: '100%',
              }}
            />
          </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setIsEditing(false);
                  onSave();
                }}
                className={`${buttonStyles.button} ${buttonStyles.primary}`}
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={`${buttonStyles.button} ${buttonStyles.secondary}`}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoodNotes;
