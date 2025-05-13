// File: client/src/components/tracker/MoodSelector.tsx

import React, { useState } from 'react';

export const MoodSelector = ({ selectedMood, onSelect }: { selectedMood: any, onSelect: (mood: any) => void }) => {
  const [customColor, setCustomColor] = useState("#facc15");
  const moods = [
    { id: 'happy', label: 'Happy', color: '#D475E2' },
    { id: 'sad', label: 'Sad', color: '#3E4473' },
    { id: 'angry', label: 'Angry', color: '#84242e' },
    { id: 'anxious', label: 'Anxious', color: '#2A4576' },
    { id: 'excited', label: 'Excited', color: '#D475E2' },
    { id: 'bored', label: 'Bored', color: '#9A84A2' },
    { id: 'relaxed', label: 'Relaxed', color: '#9A84A2' },
    { id: 'stressed', label: 'Stressed', color: '#2A4576' },
    { id: 'confused', label: 'Confused', color: '#2A4576' },
    { id: 'motivated', label: 'Motivated', color: '#58d68d' },
    { id: 'tired', label: 'Tired', color: '#9A84A2' },
    { id: 'grateful', label: 'Grateful', color: '#D475E2' },
    { id: 'hopeful', label: 'Hopeful', color: '#D475E2' },
    { id: 'lonely', label: 'Lonely', color: '#3E4473' },
    { id: 'loved', label: 'Loved', color: '#CC3E4C' },
    { id: 'overwhelmed', label: 'Overwhelmed', color: '#2A4576' },
    { id: 'curious', label: 'Curious', color: '#D475E2' },
    { id: 'creative', label: 'Creative', color: '#D475E2' },
    { id: 'calm', label: 'Calm', color: '#9A84A2' },
    { id: 'disappointed', label: 'Disappointed', color: '#3E4473' },
    { id: 'satisfied', label: 'Satisfied', color: '#D475E2' },
    { id: 'confident', label: 'Confident', color: '#D475E2' },
    { id: 'ashamed', label: 'Ashamed', color: '#3E4473' },
    { id: 'jealous', label: 'Jealous', color: '#1A5556' },
    { id: 'nostalgic', label: 'Nostalgic', color: '#9A84A2' },
    { id: 'indifferent', label: 'Indifferent', color: '#9A84A2' },
    { id: 'disconnected', label: 'Disconnected', color: '#3E4473' },
    { id: 'connected', label: 'Connected', color: '#D475E2' },
    { id: 'inspired', label: 'Inspired', color: '#D475E2' },
    { id: 'empowered', label: 'Empowered', color: '#D475E2' },
    { id: 'guilty', label: 'Guilty', color: '#3E4473' },
    { id: 'proud', label: 'Proud', color: '#D475E2' },
    { id: 'embarrassed', label: 'Embarrassed', color: '#84242e' },
    { id: 'frustrated', label: 'Frustrated', color: '#84242e' },
    { id: 'disgusted', label: 'Disgusted', color: '#1A5556' },
    { id: 'surprised', label: 'Surprised', color: '#D475E2' },
    { id: 'content', label: 'Content', color: '#D475E2' },
    { id: 'overjoyed', label: 'Overjoyed', color: '#D475E2' },
    { id: 'relieved', label: 'Relieved', color: '#9A84A2' },
  ];

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
