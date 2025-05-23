// File: client/src/components/tracker/MoodSelector.tsx

import React, { useState } from 'react';
import styles from '../../assets/css/tracker/Tracker.module.css';
import { moodList } from '../../models/Mood';

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
        {moodList.map((m) => (
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
