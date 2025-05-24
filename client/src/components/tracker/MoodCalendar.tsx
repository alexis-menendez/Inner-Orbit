// File: client/src/components/tracker/MoodCalendar.tsx

import React from 'react';
import styles from '../../assets/css/tracker/Tracker.module.css';

type MoodEntry = {
  date: string;
  mood: string;
  moodColor: string;
  intensity: number;
  note?: string;
};

type Props = {
  calendarDays: { date: Date; currentMonth: boolean }[];
  entriesByDate: Record<string, MoodEntry>;
  handleDayClick: (date: Date, entry: MoodEntry | undefined) => void;
};

const MoodCalendar: React.FC<Props> = ({ calendarDays, entriesByDate, handleDayClick }) => {
  const todayStr = new Date().toDateString();

  return (
    <div className={styles.calendarGrid}>
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
        <div key={d} className={styles.dayLabel}>{d}</div>
      ))}

      {calendarDays.map(({ date, currentMonth }, i) => {
        const entry = entriesByDate[date.toDateString()];
        const cellClass = currentMonth ? styles.dayCell : `${styles.dayCell} ${styles.otherMonth}`;
        const isToday = date.toDateString() === todayStr;

        return (
          <div
            key={i}
            onClick={() => handleDayClick(date, entry)}
            className={`${cellClass} ${isToday ? styles.today : ''}`}
            style={{ backgroundColor: entry?.moodColor || (currentMonth ? '#4c1d95' : '#1f2937'), opacity: currentMonth ? 1 : 0.5 }}
          >
            <div className={styles.dayNumber}>{date.getDate()}</div>
            <div className={styles.moodLabel}>{entry?.mood || ''}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MoodCalendar;
