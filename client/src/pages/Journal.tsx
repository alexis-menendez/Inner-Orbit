// File: client/src/pages/Journal.tsx

import React, { useEffect, useState } from 'react';
import StarBackground from '../components/common/StarBackground';
import { getConstellationForEntryCount, StarPoint } from '../components/journal/ConstellationLogic';
import styles from '../assets/css/journal/Stars.module.css';
import { useQuery, useMutation } from '@apollo/client';
import { GET_JOURNAL_ENTRIES } from '../graphql/queries';
import { CREATE_JOURNAL } from '../graphql/mutations';
import { useAuth } from '../context/authContext';
import CreateJournal from '../components/journal/CreateJournal';
import buttonStyles from '../assets/css/common/Button.module.css';


const Journal: React.FC = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [activeStars, setActiveStars] = useState<StarPoint[]>([]);
  const [connections, setConnections] = useState<[number, number][]>([]);

  const { data, loading, error, refetch } = useQuery(GET_JOURNAL_ENTRIES, {
    variables: { userId: user?.id },
    skip: !user,
    fetchPolicy: 'cache-and-network',
  });

  const [createJournal] = useMutation(CREATE_JOURNAL);

  useEffect(() => {
    if (!loading && data?.getJournalEntries) {
      const entryCount = data.getJournalEntries.entries.length;
      const { constellation, activeStars } = getConstellationForEntryCount(entryCount);
      setActiveStars(activeStars);
      setConnections(constellation.connections || []);
    }
  }, [data, loading]);

  const handleSave = async ({ title, content }: { title: string; content: string }) => {
    try {
      await createJournal({
        variables: {
          input: {
            userId: user?.id,
            title,
            content,
            mood: 'neutral',
          },
        },
      });
      await refetch();
      setShowForm(false);
    } catch (err) {
      console.error("Failed to create journal entry:", err);
    }
  };

  if (!user) return <div className={styles.sky}>Please log in to view your journal.</div>;
  if (loading) return <div className={styles.sky}>Loading...</div>;
  if (error) return <div className={styles.sky}>Error loading entries.</div>;

  return (
    <div className={styles.sky}>
      <StarBackground starCount={60} />

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.spaced}`}
        >
          + Create Journal Entry
        </button>
      )}

      {showForm && (
        <CreateJournal onSave={handleSave} onCancel={() => setShowForm(false)} />
      )}

      {activeStars.map((star, index) => (
        <div
          key={index}
          className={styles.star}
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: `${(star.size || 1)}vh`,
            height: `${(star.size || 1)}vh`,
          }}
        />
      ))}

      {connections.map(([start, end], idx) => {
        const a = activeStars[start];
        const b = activeStars[end];
        if (!a || !b) return null;

        return (
          <svg key={`line-${idx}`} className={styles.connectionLine}>
            <line
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke="white"
              strokeWidth="0.3"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default Journal;
