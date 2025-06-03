// File: client/src/components/journal/ViewJournal.tsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarBackground from '../common/StarBackground';
import { CONSTELLATIONS } from './ConstellationLogic';
import styles from '../../assets/css/journal/Stars.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';
import notebookStyles from '../../assets/css/journal/Notebook.module.css';
import formStyles from '../../assets/css/common/Form.module.css';
import { useQuery, useMutation } from '@apollo/client';
import { GET_JOURNAL_ENTRIES } from '../../graphql/queries';
import { UPDATE_JOURNAL_ENTRY } from '../../graphql/mutations';
import { useAuth } from '../../context/authContext';

const ViewJournal: React.FC = () => {
  const { entryId } = useParams<{ entryId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  const { data, loading, error } = useQuery(GET_JOURNAL_ENTRIES, {
    variables: { userId: user?.id },
    skip: !user,
  });

  const [updateJournalEntry] = useMutation(UPDATE_JOURNAL_ENTRY);

  if (!entryId || !entryId.includes('-')) {
    return <div className={styles.sky}>Invalid entry ID</div>;
  }

  const [constellationIndexStr, starIndexStr] = entryId.split('-');
  const starGlobalIndex =
    CONSTELLATIONS.slice(0, parseInt(constellationIndexStr, 10))
      .reduce((acc, c) => acc + c.stars.length, 0) + parseInt(starIndexStr, 10);

  if (!user) return <div className={styles.sky}>Please log in</div>;
  if (loading) return <div className={styles.sky}>Loading...</div>;
  if (error) return <div className={styles.sky}>Error loading entries</div>;

  const entries = data?.getJournalEntries?.entries || [];
  const entry = entries[starGlobalIndex];

  if (!entry) {
    return <div className={styles.sky}>No journal entry found for this star</div>;
  }

  const handleEditClick = () => {
    setTitleInput(entry.title);
    setContentInput(entry.content);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      await updateJournalEntry({
        variables: {
          id: entry._id,
          input: {
            title: titleInput,
            content: contentInput,
          },
        },
      });
      setShowForm(false);
    } catch (err) {
      console.error('Failed to update journal entry:', err);
    }
  };

  return (
    <div className={styles.sky}>
      <StarBackground starCount={40} />

      <div className={buttonStyles.createButtonWrapper}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {!showForm && (
            <>
              <button
                onClick={() => navigate(-1)}
                className={`${buttonStyles.button} ${buttonStyles.secondary}`}
              >
                ← Back to Constellation
              </button>
              <button
                onClick={handleEditClick}
                className={`${buttonStyles.button} ${buttonStyles.primary}`}
              >
                Edit Journal Entry
              </button>
            </>
          )}
        </div>
      </div>

      {showForm ? (
        <form
          className={formStyles.formContainer}
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <h2 className={formStyles.formTitle}>Edit Journal Entry</h2>

          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            className={formStyles.input}
            placeholder="Title"
          />

          <textarea
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            className={formStyles.input}
            rows={8}
            placeholder="Content"
          />

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className={`${buttonStyles.button} ${buttonStyles.primary}`}>
              Save
            </button>
            <button
              type="button"
              className={`${buttonStyles.button} ${buttonStyles.secondary}`}
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className={notebookStyles.notebookContainer}>
          <div className={notebookStyles.spiralImage} />

          <div className={notebookStyles.textContent}>
            <h2 className={notebookStyles.journalTitle}>{entry.title}</h2>
            <p className={notebookStyles.journalDate}>
              {new Date(entry.createdAt).toLocaleString()}
            </p>
            <p className={notebookStyles.journalContent}>{entry.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewJournal;
