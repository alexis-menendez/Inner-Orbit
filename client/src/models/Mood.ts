// File: client/src/models/Mood.ts

export interface MoodEntry {
  id: string;
  label: string;
  emoji?: string;
  defaultColor?: string;
}

export const moods: MoodEntry[] = [
  { id: 'happy', label: 'Happy', defaultColor: '#facc15' },
  { id: 'sad', label: 'Sad', defaultColor: '#60a5fa' },
  { id: 'angry', label: 'Angry', defaultColor: '#f87171' },
  { id: 'frustrated', label: 'Frustrated',defaultColor: '#fb923c' },
  { id: 'excited', label: 'Excited', defaultColor: '#a78bfa' },
  { id: 'bored', label: 'Bored', defaultColor: '#fbbf24' },
  { id: 'relaxed', label: 'Relaxed', defaultColor: '#34d399' },
  { id: 'stressed', label: 'Stressed', defaultColor: '#f472b6' },
  { id: 'confused', label: 'Confused', defaultColor: '#818cf8' },
  { id: 'motivated', label: 'Motivated', defaultColor: '#a5b4fc' },
  { id: 'tired', label: 'Tired', defaultColor: '#d1fae5' },
  { id: 'grateful', label: 'Grateful', defaultColor: '#bbf7d0' },
  { id: 'hopeful', label: 'Hopeful', defaultColor: '#bbf7d0' },
  { id: 'lonely', label: 'Lonely', defaultColor: '#fca5a5' },
  { id: 'loved', label: 'Loved', defaultColor: '#a7f3d0' },
  { id: 'overwhelmed', label: 'Overwhelmed', defaultColor: '#fca5a5' },
  { id: 'curious', label: 'Curious', defaultColor: '#c4b5fd' },
  { id: 'creative', label: 'Creative', defaultColor: '#c4b5fd' },
  { id: 'calm', label: 'Calm', defaultColor: '#bbf7d0' },
  { id: 'disappointed', label: 'Disappointed', defaultColor: '#fca5a5' },
  { id: 'satisfied', label: 'Satisfied', defaultColor:'#bbf7d0' },
  { id: 'confident', label: 'Confident', defaultColor:'#bbf7d0' },
  { id: 'ashamed', label:'Ashamed',defaultColor:'#fca5a5'},
  { id:'jealous',label:'Jealous',defaultColor:'#fca5a5'},
  { id:'nostalgic',label:'Nostalgic'},
  { id:'indifferent',label:'Indifferent'},
  { id:'disconnected',label:'Disconnected'},
  { id:'connected',label:'Connected'},
  { id:'inspired',label:'Inspired'},
  { id:'empowered',label:'Empowered'},
  { id:'guilty',label:'Guilty'},
  { id:'proud',label:'Proud'},
  { id:'embarrassed',label:'Embarrassed'},
];
