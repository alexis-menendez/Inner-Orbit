// File: client/src/models/Mood.ts

export interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  moodColor: string;
}

export interface Mood {
  id: string;
  label: string;
  color: string;
}

export const moodList: Mood[] = [

// 1. Connection / Love – Shades of Magenta (Reddish Violet)
{ id: 'affectionate', label: 'Affectionate', color: '#EC407A' },
{ id: 'connected', label: 'Connected', color: '#E75480' },
{ id: 'horny', label: 'Horny', color: '#880E4F' },
{ id: 'intimate', label: 'Intimate', color: '#C2185B' },
{ id: 'loved', label: 'Loved', color: '#D43D6E' },
{ id: 'tender', label: 'Tender', color: '#AD1457' },
{ id: 'warm', label: 'Warm', color: '#E91E63' },

// 2. Happy / Energized – Yellow
{ id: 'excited', label: 'Excited', color: '#FFD43B' },
{ id: 'grateful', label: 'Grateful', color: '#FFAD00' },
{ id: 'happy', label: 'Happy', color: '#FFE066' },
{ id: 'hopeful', label: 'Hopeful', color: '#FFB700' },
{ id: 'overjoyed', label: 'Overjoyed', color: '#FFC300' },

// 3. Motivated / Empowered – Orange
{ id: 'confident', label: 'Confident', color: '#FFA500' },
{ id: 'creative', label: 'Creative', color: '#FF8C00' },
{ id: 'curious', label: 'Curious', color: '#FF7518' },
{ id: 'empowered', label: 'Empowered', color: '#FF5C00' },
{ id: 'inspired', label: 'Inspired', color: '#FF6F00' },
{ id: 'motivated', label: 'Motivated', color: '#FF6600' },
{ id: 'proud', label: 'Proud', color: '#FF4B00' },

// 4. Surprise / Shock – Shades of Yellow-Orange
{ id: 'alarmed', label: 'Alarmed', color: '#F57C00' },
{ id: 'amazed', label: 'Amazed', color: '#FF9800' },
{ id: 'shocked', label: 'Shocked', color: '#FF914D' },
{ id: 'speechless', label: 'Speechless', color: '#FB8C00' },
{ id: 'startled', label: 'Startled', color: '#FFA726' },
{ id: 'surprised', label: 'Surprised', color: '#FFB84D' },

// 5. Disgust – Shades of Green
{ id: 'disgusted', label: 'Disgusted', color: '#558B2F' },
{ id: 'jealous', label: 'Jealous', color: '#33691E' },    
{ id: 'repulsed', label: 'Repulsed', color: '#4CAF50' },        
{ id: 'judgmental', label: 'Judgmental', color: '#388E3C' },     
{ id: 'suspicious', label: 'Suspicious', color: '#2E7D32' },     
{ id: 'resentful', label: 'Resentful', color: '#1B5E20' }, 

// 6. Anger – Shades of Red
{ id: 'aggressive', label: 'Aggressive', color: '#BF360C' },
{ id: 'angry', label: 'Angry', color: '#D72638' },
{ id: 'annoyed', label: 'Annoyed', color: '#D32F2F' },
{ id: 'enraged', label: 'Enraged', color: '#B71C1C' },
{ id: 'frustrated', label: 'Frustrated', color: '#C41B2E' },
{ id: 'irritated', label: 'Irritated', color: '#E53935' },
{ id: 'resentful', label: 'Resentful', color: '#C62828' },

// 7. Shame / Guilt – Shades of Red-Orange
{ id: 'ashamed', label: 'Ashamed', color: '#D66A4D' },
{ id: 'embarrassed', label: 'Embarrassed', color: '#B2471D' },
{ id: 'guilty', label: 'Guilty', color: '#C1582C' },
{ id: 'humiliated', label: 'Humiliated', color: '#BF360C' },
{ id: 'insecure', label: 'Insecure', color: '#FF7043' },
{ id: 'regretful', label: 'Regretful', color: '#E64A19' },
{ id: 'remorseful', label: 'Remorseful', color: '#F4511E' },

// 8. Fear / Anxiety – Shades of Blue-Green (Cyan)
{ id: 'anxious', label: 'Anxious', color: '#00ACC1' },
{ id: 'confused', label: 'Confused', color: '#0097A7' },
{ id: 'overwhelmed', label: 'Overwhelmed', color: '#00838F' },
{ id: 'stressed', label: 'Stressed', color: '#006064' },

// 9. Disappointment / Sadness – Shades of Blue
{ id: 'blue', label: 'Blue', color: '#3F51B5' },
{ id: 'despairing', label: 'Despairing', color: '#303F9F' },
{ id: 'disappointed', label: 'Disappointed', color: '#607D8B' },
{ id: 'down', label: 'Down', color: '#5C6BC0' },
{ id: 'heartbroken', label: 'Heartbroken', color: '#3949AB' },
{ id: 'melancholy', label: 'Melancholy', color: '#283593' },
{ id: 'sad', label: 'Sad', color: '#455A64' },

// 10. Isolation / Longing – Shades of Indigo (Deep Blue-Violet)
{ id: 'disconnected', label: 'Disconnected', color: '#3F51B5' },
{ id: 'lonely', label: 'Lonely', color: '#5C6BC0' },

// 11. Low Stimulation / Exhaustion – Violet
{ id: 'bored', label: 'Bored', color: '#9575CD' },
{ id: 'nostalgic', label: 'Nostalgic', color: '#7E57C2' },
{ id: 'tired', label: 'Tired', color: '#673AB7' },

// 12. Calm / Neutral – Shades of Yellow-Green
{ id: 'calm', label: 'Calm', color: '#DCE775' },
{ id: 'content', label: 'Content', color: '#D4E157' },
{ id: 'indifferent', label: 'Indifferent', color: '#AFB42B' },
{ id: 'relaxed', label: 'Relaxed', color: '#C0CA33' },
{ id: 'relieved', label: 'Relieved', color: '#9E9D24' },
{ id: 'satisfied', label: 'Satisfied', color: '#827717' },

// 13. Mourning / Grief – Black
{ id: 'bereft', label: 'Bereft', color: '#2B2B2B' },
{ id: 'grieving', label: 'Grieving', color: '#000000' },
{ id: 'heartache', label: 'Heartache', color: '#3A3A3A' },
{ id: 'mourning', label: 'Mourning', color: '#1C1C1C' },
{ id: 'numb', label: 'Numb', color: '#5C5C5C' },
{ id: 'yearning', label: 'Yearning', color: '#4B4B4B' }

];

export function getMoodColor(moodId: string): string {
  const mood = moodList.find((m) => m.id === moodId);
  return mood?.color || '#999999'; // fallback to grey if not found
}
