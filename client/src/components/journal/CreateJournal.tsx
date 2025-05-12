import React, { useState } from 'react';

interface CreateJournalProps {
  onSave: (entry: { title: string; content: string }) => void;
  onCancel: () => void;
}

const CreateJournal: React.FC<CreateJournalProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', background: '#111', color: '#fff' }}>
      <h2>Create New Journal Entry</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Save Entry</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default CreateJournal;
