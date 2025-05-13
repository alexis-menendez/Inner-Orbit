// File: client/src/components/tracker/MoodSelector.tsx

import React, { useState } from 'react';

export const MoodSelector = ({ selectedMood, onSelect }: { selectedMood: any, onSelect: (mood: any) => void }) => {
  const [customColor, setCustomColor] = useState("#facc15");
  const moods = [
    { id: 'happy', label: 'Happy', color: '#ffe066' },
    { id: 'sad', label: 'Sad', color: '#5dade2' },
    { id: 'angry', label: 'Angry', color: '#e74c3c' },
    { id: 'anxious', label: 'Anxious', color: '#af7ac5' },
    { id: 'excited', label: 'Excited', color: '#f7c59f' },
    { id: 'bored', label: 'Bored', color: '#95a5a6' },
    { id: 'relaxed', label: 'Relaxed', color: '#82e0aa' },
    { id: 'stressed', label: 'Stressed', color: '#d98880' },
    { id: 'confused', label: 'Confused', color: '#f4d03f' },
    { id: 'motivated', label: 'Motivated', color: '#58d68d' },
    { id: 'tired', label: 'Tired', color: '#aab7b8' },
    { id: 'grateful', label: 'Grateful', color: '#f0b27a' },
    { id: 'hopeful', label: 'Hopeful', color: '#7fb3d5' },
    { id: 'lonely', label: 'Lonely', color: '#85929e' },
    { id: 'loved', label: 'Loved', color: '#f1948a' },
    { id: 'overwhelmed', label: 'Overwhelmed', color: '#d7bde2' },
    { id: 'curious', label: 'Curious', color: '#fad7a0' },
    { id: 'creative', label: 'Creative', color: '#f8c471' },
    { id: 'calm', label: 'Calm', color: '#aed6f1' },
    { id: 'disappointed', label: 'Disappointed', color: '#7f8c8d' },
    { id: 'satisfied', label: 'Satisfied', color: '#f7dc6f' },
    { id: 'confident', label: 'Confident', color: '#5dade2' },
    { id: 'ashamed', label: 'Ashamed', color: '#d5dbdb' },
    { id: 'jealous', label: 'Jealous', color: '#58d68d' },
    { id: 'nostalgic', label: 'Nostalgic', color: '#f5cba7' },
    { id: 'indifferent', label: 'Indifferent', color: '#d5d8dc' },
    { id: 'disconnected', label: 'Disconnected', color: '#d2b4de' },
    { id: 'connected', label: 'Connected', color: '#aed6f1' },
    { id: 'inspired', label: 'Inspired', color: '#f9e79f' },
    { id: 'empowered', label: 'Empowered', color: '#82e0aa' },
    { id: 'guilty', label: 'Guilty', color: '#e6b0aa' },
    { id: 'proud', label: 'Proud', color: '#f7c59f' },
    { id: 'embarrassed', label: 'Embarrassed', color: '#f1948a' },
    { id: 'frustrated', label: 'Frustrated', color: '#cd6155' },
    { id: 'disgusted', label: 'Disgusted', color: '#7dcea0' },
    { id: 'surprised', label: 'Surprised', color: '#fadbd8' },
    { id: 'content', label: 'Content', color: '#ffeaa7' },
    { id: 'overjoyed', label: 'Overjoyed', color: '#f9e79f' },
    { id: 'relieved', label: 'Relieved', color: '#82e0aa' },
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
