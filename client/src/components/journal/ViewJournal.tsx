// File: client/src/components/journal/ViewJournal.tsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarBackground from '../common/StarBackground';
import { CONSTELLATIONS } from './ConstellationLogic';
import styles from '../../assets/css/journal/Stars.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';
import { useQuery } from '@apollo/client';
import { GET_JOURNAL_ENTRIES } from '../../graphql/queries';
import { useAuth } from '../../context/authContext';

const ViewJournal: React.FC = () => {
  const { entryId } = useParams<{ entryId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data, loading, error } = useQuery(GET_JOURNAL_ENTRIES, {
    variables: { userId: user?.id },
    skip: !user,
  });

  if (!entryId || !entryId.includes('-')) {
    return <div className={styles.sky}>Invalid entry ID</div>;
  }

  const [constellationIndexStr, starIndexStr] = entryId.split('-');
  const starGlobalIndex = CONSTELLATIONS
    .slice(0, parseInt(constellationIndexStr, 10))
    .reduce((acc, c) => acc + c.stars.length, 0) + parseInt(starIndexStr, 10);

  if (!user) return <div className={styles.sky}>Please log in</div>;
  if (loading) return <div className={styles.sky}>Loading...</div>;
  if (error) return <div className={styles.sky}>Error loading entries</div>;

  const entries = data?.getJournalEntries?.entries || [];
  const entry = entries[starGlobalIndex];

  if (!entry) {
    return <div className={styles.sky}>No journal entry found for this star</div>;
  }

  return (
    <div className={styles.sky}>
      <StarBackground starCount={40} />

      <button
        onClick={() => navigate(-1)}
        className={`${buttonStyles.button} ${buttonStyles.secondary} ${buttonStyles.spaced}`}
      >
        ← Back to Constellation
      </button>

      <div style={{ color: 'white', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1rem' }}>{entry.title}</h2>
        <p style={{ lineHeight: '1.6' }}>{entry.content}</p>
        <p style={{ marginTop: '2rem', fontStyle: 'italic', fontSize: '0.9rem' }}>
          Created on: {new Date(entry.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ViewJournal;
