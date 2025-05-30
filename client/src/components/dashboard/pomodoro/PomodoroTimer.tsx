// File: client/src/components/dashboard/pomodoro/PomodoroTimer.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Task, useTaskStore } from '../../../hooks/useTaskStore';
import styles from '../../../assets/css/dashboard/PomodoroTimer.module.css';
import buttonStyles from '../../../assets/css/common/Button.module.css';

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
  const task: Task | null = getSelectedTask();

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

  const switchMode = (label: string, duration: number) => {
    console.log(`Switching mode to: ${label}, duration: ${duration}s`);
    pauseTimer();
    setSecondsLeft(duration);
    setInitialTime(duration);
    setModeLabel(label);

    if (label.toLowerCase().includes("break")) {
      onBreakStart?.();
    }
  };

  const handleCustomTime = () => {
    const minutes = parseInt(prompt("Enter time in minutes:") || "0", 10);
    if (!isNaN(minutes) && minutes > 0) {
      switchMode(`${minutes} Min Focus`, minutes * 60);
    }
  };

  const startTimer = () => {
    console.log("Start button clicked");

    // ✅ Always clear stale interval
    if (intervalRef.current) {
      console.log("Clearing stale interval");
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    console.log("Timer started");

    if (modeLabel.toLowerCase().includes("work")) {
      onPomodoroStart?.();
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        console.log(`Tick: ${prev} seconds left`);

        if (prev === 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;

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

  const pauseTimer = () => {
    console.log("Timer paused");
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const resetTimer = () => {
    console.log("Timer reset");
    pauseTimer();
    setSecondsLeft(initialTime);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // ✅ NEW: log mode changes
  useEffect(() => {
    console.log("modeLabel changed:", modeLabel);
  }, [modeLabel]);

  const progress = initialTime > 0 ? ((initialTime - secondsLeft) / initialTime) * 100 : 0;

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

<button
  onClick={() => console.log("Test button clicked")}
  style={{
    padding: "0.5rem 1rem",
    backgroundColor: "#333",
    color: "#fff",
    zIndex: 9999,
    position: 'relative',
    pointerEvents: 'auto'
  }}
>
  Test Button
</button>

      </div>
    </div>
  );
};

export default PomodoroTimer;
