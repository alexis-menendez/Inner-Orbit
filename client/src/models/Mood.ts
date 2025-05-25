// File: client/src/models/Mood.ts

export interface MoodEntry {
  _id: string;
  userId: string;
  date: string;
  mood: string;
  moodColor: string;
  intensity: number;
  note?: string;
  createdAt: string;
}

export interface Mood {
  id: string;
  label: string;
  color: string;
}

export const moodList: Mood[] = [
  // 1. Connection / Love – Shades of Magenta (Reddish Violet)
  { id: 'affectionate', label: 'Affectionate', color: 'rgba(236, 64, 122, 0.85)' },
  { id: 'connected', label: 'Connected', color: 'rgba(231, 84, 128, 0.85)' },
  { id: 'horny', label: 'Horny', color: 'rgba(136, 14, 79, 0.85)' },
  { id: 'intimate', label: 'Intimate', color: 'rgba(194, 24, 91, 0.85)' },
  { id: 'loved', label: 'Loved', color: 'rgba(212, 61, 110, 0.85)' },
  { id: 'tender', label: 'Tender', color: 'rgba(173, 20, 87, 0.85)' },
  { id: 'warm', label: 'Warm', color: 'rgba(233, 30, 99, 0.85)' },

  // 2. Happy / Energized – Yellow
  { id: 'excited', label: 'Excited', color: 'rgba(255, 212, 59, 0.85)' },
  { id: 'grateful', label: 'Grateful', color: 'rgba(255, 173, 0, 0.85)' },
  { id: 'happy', label: 'Happy', color: 'rgba(255, 224, 102, 0.85)' },
  { id: 'hopeful', label: 'Hopeful', color: 'rgba(255, 183, 0, 0.85)' },
  { id: 'overjoyed', label: 'Overjoyed', color: 'rgba(255, 195, 0, 0.85)' },

  // 3. Motivated / Empowered – Orange
  { id: 'confident', label: 'Confident', color: 'rgba(255, 165, 0, 0.85)' },
  { id: 'creative', label: 'Creative', color: 'rgba(255, 140, 0, 0.85)' },
  { id: 'curious', label: 'Curious', color: 'rgba(255, 117, 24, 0.85)' },
  { id: 'empowered', label: 'Empowered', color: 'rgba(255, 92, 0, 0.85)' },
  { id: 'inspired', label: 'Inspired', color: 'rgba(255, 111, 0, 0.85)' },
  { id: 'motivated', label: 'Motivated', color: 'rgba(255, 102, 0, 0.85)' },
  { id: 'proud', label: 'Proud', color: 'rgba(255, 75, 0, 0.85)' },

  // 4. Surprise / Shock – Shades of Yellow-Orange
  { id: 'alarmed', label: 'Alarmed', color: 'rgba(245, 124, 0, 0.85)' },
  { id: 'amazed', label: 'Amazed', color: 'rgba(255, 152, 0, 0.85)' },
  { id: 'shocked', label: 'Shocked', color: 'rgba(255, 145, 77, 0.85)' },
  { id: 'speechless', label: 'Speechless', color: 'rgba(251, 140, 0, 0.85)' },
  { id: 'startled', label: 'Startled', color: 'rgba(255, 167, 38, 0.85)' },
  { id: 'surprised', label: 'Surprised', color: 'rgba(255, 184, 77, 0.85)' },

  // 5. Disgust – Shades of Green
  { id: 'disgusted', label: 'Disgusted', color: 'rgba(85, 139, 47, 0.85)' },
  { id: 'jealous', label: 'Jealous', color: 'rgba(51, 105, 30, 0.85)' },
  { id: 'repulsed', label: 'Repulsed', color: 'rgba(76, 175, 80, 0.85)' },
  { id: 'judgmental', label: 'Judgmental', color: 'rgba(56, 142, 60, 0.85)' },
  { id: 'suspicious', label: 'Suspicious', color: 'rgba(46, 125, 50, 0.85)' },
  { id: 'resentful', label: 'Resentful', color: 'rgba(27, 94, 32, 0.85)' },

  // 6. Anger – Shades of Red
  { id: 'aggressive', label: 'Aggressive', color: 'rgba(191, 54, 12, 0.85)' },
  { id: 'angry', label: 'Angry', color: 'rgba(215, 38, 56, 0.85)' },
  { id: 'annoyed', label: 'Annoyed', color: 'rgba(211, 47, 47, 0.85)' },
  { id: 'enraged', label: 'Enraged', color: 'rgba(183, 28, 28, 0.85)' },
  { id: 'frustrated', label: 'Frustrated', color: 'rgba(196, 27, 46, 0.85)' },
  { id: 'irritated', label: 'Irritated', color: 'rgba(229, 57, 53, 0.85)' },
  { id: 'resentful', label: 'Resentful', color: 'rgba(198, 40, 40, 0.85)' },

  // 7. Shame / Guilt – Shades of Red-Orange
  { id: 'ashamed', label: 'Ashamed', color: 'rgba(214, 106, 77, 0.85)' },
  { id: 'embarrassed', label: 'Embarrassed', color: 'rgba(178, 71, 29, 0.85)' },
  { id: 'guilty', label: 'Guilty', color: 'rgba(193, 88, 44, 0.85)' },
  { id: 'humiliated', label: 'Humiliated', color: 'rgba(191, 54, 12, 0.85)' },
  { id: 'insecure', label: 'Insecure', color: 'rgba(255, 112, 67, 0.85)' },
  { id: 'regretful', label: 'Regretful', color: 'rgba(230, 74, 25, 0.85)' },
  { id: 'remorseful', label: 'Remorseful', color: 'rgba(244, 81, 30, 0.85)' },

  // 8. Fear / Anxiety – Shades of Blue-Green (Cyan)
  { id: 'anxious', label: 'Anxious', color: 'rgba(0, 172, 193, 0.85)' },
  { id: 'confused', label: 'Confused', color: 'rgba(0, 151, 167, 0.85)' },
  { id: 'overwhelmed', label: 'Overwhelmed', color: 'rgba(0, 131, 143, 0.85)' },
  { id: 'stressed', label: 'Stressed', color: 'rgba(0, 96, 100, 0.85)' },

  // 9. Disappointment / Sadness – Shades of Blue
  { id: 'blue', label: 'Blue', color: 'rgba(63, 81, 181, 0.85)' },
  { id: 'despairing', label: 'Despairing', color: 'rgba(48, 63, 159, 0.85)' },
  { id: 'disappointed', label: 'Disappointed', color: 'rgba(96, 125, 139, 0.85)' },
  { id: 'down', label: 'Down', color: 'rgba(92, 107, 192, 0.85)' },
  { id: 'heartbroken', label: 'Heartbroken', color: 'rgba(57, 73, 171, 0.85)' },
  { id: 'melancholy', label: 'Melancholy', color: 'rgba(40, 53, 147, 0.85)' },
  { id: 'sad', label: 'Sad', color: 'rgba(69, 90, 100, 0.85)' },

  // 10. Isolation / Longing – Shades of Indigo (Deep Blue-Violet)
  { id: 'disconnected', label: 'Disconnected', color: 'rgba(63, 81, 181, 0.85)' },
  { id: 'lonely', label: 'Lonely', color: 'rgba(92, 107, 192, 0.85)' },

  // 11. Low Stimulation / Exhaustion – Violet
  { id: 'bored', label: 'Bored', color: 'rgba(149, 117, 205, 0.85)' },
  { id: 'nostalgic', label: 'Nostalgic', color: 'rgba(126, 87, 194, 0.85)' },
  { id: 'tired', label: 'Tired', color: 'rgba(103, 58, 183, 0.85)' },

  // 12. Calm / Neutral – Shades of Yellow-Green
  { id: 'calm', label: 'Calm', color: 'rgba(220, 231, 117, 0.85)' },
  { id: 'content', label: 'Content', color: 'rgba(212, 225, 87, 0.85)' },
  { id: 'indifferent', label: 'Indifferent', color: 'rgba(175, 180, 43, 0.85)' },
  { id: 'relaxed', label: 'Relaxed', color: 'rgba(192, 202, 51, 0.85)' },
  { id: 'relieved', label: 'Relieved', color: 'rgba(158, 157, 36, 0.85)' },
  { id: 'satisfied', label: 'Satisfied', color: 'rgba(130, 119, 23, 0.85)' },

  // 13. Mourning / Grief – Black
  { id: 'bereft', label: 'Bereft', color: 'rgba(43, 43, 43, 0.85)' },
  { id: 'grieving', label: 'Grieving', color: 'rgba(0, 0, 0, 0.85)' },
  { id: 'heartache', label: 'Heartache', color: 'rgba(58, 58, 58, 0.85)' },
  { id: 'mourning', label: 'Mourning', color: 'rgba(28, 28, 28, 0.85)' },
  { id: 'numb', label: 'Numb', color: 'rgba(92, 92, 92, 0.85)' },
  { id: 'yearning', label: 'Yearning', color: 'rgba(75, 75, 75, 0.85)' }
];

export function getMoodColor(moodId: string): string {
  const mood = moodList.find((m) => m.id === moodId);
  return mood?.color || '#999999'; // fallback to grey if not found
}
