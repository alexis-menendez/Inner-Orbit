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

  const TASK_5_MIN = 5 * 60;
  const TASK_15_MIN = 15 * 60;
  const BREAK_5_MIN = 5 * 60;
  const BREAK_15_MIN = 15 * 60;

  const [secondsLeft, setSecondsLeft] = useState(TASK_5_MIN);
  const [isRunning, setIsRunning] = useState(false);
  const [modeLabel, setModeLabel] = useState('5 Min Task');
  const [initialTime, setInitialTime] = useState(TASK_5_MIN);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (secs: number) =>
    `${Math.floor(secs / 60).toString().padStart(2, '0')}:${(secs % 60)
      .toString()
      .padStart(2, '0')}`;

  const switchMode = (label: string, duration: number) => {
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
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (modeLabel.toLowerCase().includes("task")) {
      onPomodoroStart?.();
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;

          if (modeLabel.toLowerCase().includes("task")) {
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
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const resetTimer = () => {
    pauseTimer();
    setSecondsLeft(initialTime);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const progress = initialTime > 0 ? ((initialTime - secondsLeft) / initialTime) * 100 : 0;

  return (
    <div className={styles.timerContainer}>
      <div className={buttonStyles.buttonGroup}>
        <button
          onClick={() => switchMode('5 Min Task', TASK_5_MIN)}
          className={`${buttonStyles.modeButton} ${modeLabel === '5 Min Task' ? buttonStyles.modeButtonActive : ''}`}
        >
          5 Min Task
        </button>
        <button
          onClick={() => switchMode('15 Min Task', TASK_15_MIN)}
          className={`${buttonStyles.modeButton} ${modeLabel === '15 Min Task' ? buttonStyles.modeButtonActive : ''}`}
        >
          15 Min Task
        </button>
        <button
          onClick={() => switchMode('5 Min Break', BREAK_5_MIN)}
          className={`${buttonStyles.modeButton} ${modeLabel === '5 Min Break' ? buttonStyles.modeButtonActive : ''}`}
        >
          5 Min Break
        </button>
        <button
          onClick={() => switchMode('15 Min Break', BREAK_15_MIN)}
          className={`${buttonStyles.modeButton} ${modeLabel === '15 Min Break' ? buttonStyles.modeButtonActive : ''}`}
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
        <button
          className={`${buttonStyles.action} ${isRunning ? buttonStyles.actionActive : ''}`}
          onClick={startTimer}
        >
          Start
        </button>
        <button
          className={`${buttonStyles.action} ${!isRunning && secondsLeft !== initialTime ? buttonStyles.actionActive : ''}`}
          onClick={pauseTimer}
        >
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
