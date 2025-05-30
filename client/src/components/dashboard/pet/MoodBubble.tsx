// File: client/src/components/dashboard/pet/MoodBubble.tsx

import React from 'react';
import styles from '../../../assets/css/dashboard/MoodBubble.module.css';

const moodDisplayMap: Record<string, { quote: string }> = {
  happy: {quote: 'Feeling bright like a nebula today!' },
  sad: {quote: 'Even stars dim sometimes.' },
  tired: { quote: 'Recharge mode... drifting through space.' },
  focused: { quote: 'Locked onto the mission... calculating!' },
  playful: { quote: 'Boop! Just a little space wiggle!' },
  angry: { quote: 'Inking mad right now. Give me a sec.' },
  idle: { quote: 'Just floating through the void~' },
  anxious: { quote: 'Wiggling with worry bubbles…' },
  inspired: { quote: 'A brilliant idea just hatched!' },
  lonely: { quote: 'Echoes in the void feel loud…' },
};

interface MoodBubbleProps {
  mood: string;
}

const MoodBubble: React.FC<MoodBubbleProps> = ({ mood }) => {
  const display = moodDisplayMap[mood];
  if (!display) return null;

  return (
    <div className={styles.bubbleContainer}>
           <div className={styles.quote}>{display.quote}</div>
    </div>
  );
};

export default MoodBubble;
