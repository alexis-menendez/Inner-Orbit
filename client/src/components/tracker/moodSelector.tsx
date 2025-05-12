// File: client/src/components/tracker/moodSelector.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const MoodSelector = ({ onSelect }: { onSelect: (mood: any) => void }) => {
    const [mood, setMood] = useState<any[]>([]);
  const [customColor, setCustomColor] = useState("#facc15"); // default yellow

 //useEffect(() => {
  // backend route f})

  const moods = [
    { id: 'happy', label: 'Happy' },
    { id: 'sad', label: 'Sad' },
    { id: 'angry', label: 'Angry' },
    { id: 'anxious', label: 'Anxious' },
    { id: 'excited', label: 'Excited' },
    { id: 'bored', label: 'Bored' },
    { id: 'relaxed', label: 'Relaxed' },
    { id: 'stressed', label: 'Stressed' },
    { id: 'confused', label: 'Confused' },
    { id: 'motivated', label: 'Motivated' },
    { id: 'tired', label: 'Tired' },
    { id: 'grateful', label: 'Grateful' },
    { id: 'hopeful', label: 'Hopeful' },
    { id: 'lonely', label: 'Lonely' },
    { id: 'loved', label: 'Loved' },
    { id: 'overwhelmed', label: 'Overwhelmed' },
    { id: 'curious', label: 'Curious' },
    { id: 'creative', label: 'Creative' },
    { id: 'calm', label: 'Calm' },
    { id: 'disappointed', label: 'Disappointed' },
    { id: 'satisfied', label: 'Satisfied' },
    { id: 'confident', label: 'Confident' },
    { id: 'ashamed', label: 'Ashamed' },
    { id: 'jealous', label: 'Jealous' },
    { id: 'nostalgic', label: 'Nostalgic' },
    { id: 'indifferent', label: 'Indifferent' },
    { id: 'hopeful', label: 'Hopeful' },
    { id: 'disconnected', label: 'Disconnected' },
    { id: 'connected', label: 'Connected' },
    { id: 'inspired', label: 'Inspired' },
    { id: 'empowered', label: 'Empowered' },
    { id: 'ashamed', label: 'Ashamed' },
    { id: 'guilty', label: 'Guilty' },
    { id: 'proud', label: 'Proud' },
    { id: 'embarrassed', label: 'Embarrassed' },
    { id: 'frustrated', label: 'Frustrated' },
    { id: 'disgusted', label: 'Disgusted' },
    { id: 'surprised', label: 'Surprised' },
    { id: 'content', label: 'Content' },
    { id: 'overjoyed', label: 'Overjoyed' },
    { id: 'relieved', label: 'Relieved' },
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
      <div className="flex gap-2">
        {moods.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect({ ...m, color: customColor })}
            className="p-2 text-white rounded-full"
            style={{ backgroundColor: customColor }}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
};