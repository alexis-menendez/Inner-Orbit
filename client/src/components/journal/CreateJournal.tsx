// File: client/src/components/journal/CreateJournal.tsx

import React, { useState } from 'react';
import styles from '../../assets/css/common/Form.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';

interface CreateJournalProps {
  onSave: (entry: { title: string; mood: string; content: string }) => void;
  onCancel: () => void;
}

const CreateJournal: React.FC<CreateJournalProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('neutral');
  const [content, setContent] = useState('');
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, content, mood });
    setTitle('');
    setMood('neutral');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create New Journal Entry</h2>

      <input
        className={styles.input}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select
        className={styles.input}
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        required
      >
        <option value="neutral">Neutral</option>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="angry">Angry</option>
        <option value="anxious">Anxious</option>
        <option value="excited">Excited</option>
        <option value="reflective">Reflective</option>
      </select>

      <textarea
        className={styles.input}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={6}
      />

      <button
        type="submit"
        className={`${buttonStyles.button} ${buttonStyles.primary}`}
      >
        Save Entry
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

export default CreateJournal;
