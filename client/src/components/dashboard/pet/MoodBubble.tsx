// File: client/src/components/dashboard/pet/MoodBubble.tsx

import React from 'react';
import styles from '../../../assets/css/dashboard/MoodBubble.module.css';

// Define the moods and their corresponding emoji + message
const moodDisplayMap: Record<string, { emoji: string; quote: string }> = {
  happy: { emoji: '😄', quote: 'Feeling bright like a nebula today!' },
  sad: { emoji: '😢', quote: 'Even stars dim sometimes.' },
  tired: { emoji: '😴', quote: 'Recharge mode... drifting through space.' },
  focused: { emoji: '🧠', quote: 'Locked onto the mission... calculating!' },
  playful: { emoji: '✨', quote: 'Boop! Just a little space wiggle!' },
  angry: { emoji: '😠', quote: 'Inking mad right now. Give me a sec.' },
  idle: { emoji: '🐙', quote: 'Just floating through the void~' },
  anxious: { emoji: '😰', quote: 'Wiggling with worry bubbles…' },
  inspired: { emoji: '🌟', quote: 'A brilliant idea just hatched!' },
  lonely: { emoji: '💧', quote: 'Echoes in the void feel loud…' },
};

interface MoodBubbleProps {
  mood: string;
}

const MoodBubble: React.FC<MoodBubbleProps> = ({ mood }) => {
  const display = moodDisplayMap[mood];
  if (!display) return null;

  return (
    <div className={styles.bubbleContainer}>
      <div className={styles.emoji}>{display.emoji}</div>
      <div className={styles.quote}>{display.quote}</div>
    </div>
  );
};

export default MoodBubble;
