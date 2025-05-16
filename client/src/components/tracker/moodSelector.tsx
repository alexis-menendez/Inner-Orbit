// file: client/src/components/tracker/MoodSelector.tsx

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MOOD_ENTRIES } from '../../graphql/queries';

interface Mood {
  id: string;
  label: string;
  color: string;
}

interface Props {
  selectedMood: Mood | null;
  onSelect: (mood: Mood) => void;
}

const MoodSelector: React.FC<Props> = ({ selectedMood, onSelect }) => {
  const [customColor, setCustomColor] = useState('#facc15');

  const { data, loading, error } = useQuery(GET_MOOD_ENTRIES);

  if (loading) return <p>Loading moods...</p>;
  if (error) return <p>Error loading moods.</p>;

  const moods: Mood[] = data?.moodOptions || [];

  return (
    <div className="space-y-4">
      <div>
        <label className="mr-2 text-white">Pick your color:</label>
        <input
          type="color"
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          className="w-10 h-10 p-0 border-none"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {moods.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect({ ...m, color: customColor })}
            className={`p-2 rounded-full text-white ${
              selectedMood?.id === m.id ? 'ring-4 ring-white' : ''
            }`}
            style={{ backgroundColor: customColor }}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
