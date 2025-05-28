// File: client/src/components/dashboard/pomodoro/PomodoroTimer.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Task, useTaskStore } from '../../../hooks/useTaskStore';
import styles from '../../../assets/css/dashboard/PomodoroTimer.module.css';
import buttonStyles from '../../../assets/css/common/Button.module.css';

// ✅ Updated: Added optional props for triggering pet animations
interface PomodoroTimerProps {
  onPomodoroStart?: () => void;
  onPomodoroEnd?: () => void;
  onBreakStart?: () => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  onPomodoroStart,
  onPomodoroEnd,
  onBreakStart
}) => {
  const { getSelectedTask } = useTaskStore();
const task: Task | null = getSelectedTask(); //


  const WORK_DURATION = 25 * 60;
  const BREAK_DURATION = 5 * 60;
  const LONG_BREAK_DURATION = 15 * 60;

  const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [modeLabel, setModeLabel] = useState('Work Time');
  const [initialTime, setInitialTime] = useState(WORK_DURATION);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (secs: number) =>
    `${Math.floor(secs / 60).toString().padStart(2, '0')}:${(secs % 60)
      .toString()
      .padStart(2, '0')}`;

  // 🟡 Switches mode and resets timer
  const switchMode = (label: string, duration: number) => {
    pauseTimer();
    setSecondsLeft(duration);
    setInitialTime(duration);
    setModeLabel(label);

    // 🟣 Trigger squid ink animation when a break starts
    if (label.toLowerCase().includes("break")) {
      onBreakStart?.();
    }
  };

  // 🔧 Prompt user for custom time
  const handleCustomTime = () => {
    const minutes = parseInt(prompt("Enter time in minutes:") || "0", 10);
    if (!isNaN(minutes) && minutes > 0) {
      switchMode(`${minutes} Min Focus`, minutes * 60);
    }
  };

  // ▶️ Starts the countdown
  const startTimer = () => {
    if (intervalRef.current) return;

    // ✅ Trigger squid attack when starting a focus session
    if (modeLabel.toLowerCase().includes("work")) {
      onPomodoroStart?.();
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;

          // 🔴 Trigger squid death when a focus session ends
          if (modeLabel.toLowerCase().includes("work")) {
            onPomodoroEnd?.();
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIsRunning(true);
  };

  // ⏸️ Pauses the countdown
  const pauseTimer = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setIsRunning(false);
  };

  // Resets timer to the current mode's full time
  const resetTimer = () => {
    pauseTimer();
    setSecondsLeft(initialTime);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const progress = ((initialTime - secondsLeft) / initialTime) * 100;

  return (
    <div className={styles.timerContainer}>

      <div className={buttonStyles.buttonGroup}>
        <button
          onClick={() => switchMode('Work Time', WORK_DURATION)}
          className={`${buttonStyles.modeButton} ${modeLabel === 'Work Time' ? buttonStyles.modeButtonActive : ''}`}
        >
          Task
        </button>
        <button
          onClick={() => switchMode('Short Break', BREAK_DURATION)}
          className={`${buttonStyles.modeButton} ${modeLabel === 'Short Break' ? buttonStyles.modeButtonActive : ''}`}
        >
          5 Min Break
        </button>
        <button
          onClick={() => switchMode('Long Break', LONG_BREAK_DURATION)}
          className={`${buttonStyles.modeButton} ${modeLabel === 'Long Break' ? buttonStyles.modeButtonActive : ''}`}
        >
          15 Min Break
        </button>
      </div>

      <div className={styles.progressRing}>
        <svg viewBox="0 0 100 100" className={styles.ringSvg}>
          <circle cx="50" cy="50" r="45" className={styles.ringBackground} />
          <circle
            cx="50"
            cy="50"
            r="45"
            className={styles.ringProgress}
            style={{
              strokeDasharray: '282.6',
              strokeDashoffset: 282.6 - (282.6 * progress) / 100,
            }}
          />
          <text x="50%" y="55%" textAnchor="middle" className={styles.ringText}>
            {formatTime(secondsLeft)}
          </text>
        </svg>
      </div>

      <div className={buttonStyles.buttonGroup}>
        <button className={buttonStyles.action} onClick={startTimer}>
          Start
        </button>
        <button className={buttonStyles.action} onClick={pauseTimer}>
          Pause
        </button>
        <button className={buttonStyles.action} onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
