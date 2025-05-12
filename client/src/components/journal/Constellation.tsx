import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_JOURNAL_ENTRIES_FOR_CONSTELLATION } from '../../graphql/queries';
import { JournalEntry } from '../../models/Journal';

const Constellation = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<{ getJournalEntries: JournalEntry[] }>(
    GET_JOURNAL_ENTRIES_FOR_CONSTELLATION,
    { variables: { constellationId: id } }
  );

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 text-white">
      <h2 className="mb-4 text-3xl font-bold">Constellation View</h2>
      <ul className="space-y-4">
        {data?.getJournalEntries.map(entry => (
          <li key={entry._id} className="p-4 bg-indigo-800 rounded shadow">
            <p className="text-sm text-indigo-200">{new Date(entry.createdAt).toLocaleDateString()}</p>
            <p>{entry.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Constellation;
