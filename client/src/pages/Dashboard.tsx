// File: client/src/pages/Dashboard.tsx

import React, { useEffect, useState } from "react";
import WeeklyMoodReview from "../components/dashboard/WeeklyMoodCalendar";
import PomodoroTimer from "../components/dashboard/pomodoro/PomodoroTimer";
import FocusTaskList from "../components/dashboard/pomodoro/FocusTaskList";
import SquidPet from "../components/dashboard/pet/SquidPet";
import buttonStyles from '../assets/css/common/Button.module.css';
import pageStyles from '../assets/css/dashboard/Dashboard.module.css';


type MoodEntry = {
  id: string;
  label: string;
  date: string;
  color: string;
};

const Dashboard: React.FC = () => {
  const [weeklyMoods, setWeeklyMoods] = useState<Record<string, MoodEntry>>({});
  type AnimationKey = 'idle' | 'walk' | 'legLift' | 'fall' | 'jump' | 'jumpslam';

  const [petAnim, setPetAnim] = useState<AnimationKey>('idle');

  // Simulated trigger examples
  const handleMoodLog = () => {
    setPetAnim('walk');
    resetToIdle();
  };

  const handleFocusTaskAdd = () => {
    setPetAnim('legLift');
    resetToIdle();
  };

  const resetToIdle = () => {
    setTimeout(() => setPetAnim('idle'), 2000);
  };

  return (
    <div className={`flex flex-col items-center px-4 py-8 gap-8 relative z-10 ${pageStyles.dashboardPage}`}>

      {/* Weekly Mood Summary - Vertical, Mobile-First, Auto-Contrast */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl cosmic-panel">
      <div className={pageStyles.subtitle}>
        <h2>Weekly Review</h2>
      </div>
        <WeeklyMoodReview />
      </div>

      {/* Squid Pet */}
      <div className="my-4">
        <SquidPet trigger={petAnim} />
      </div>

      {/* Focus App Panel */}
{/* Focus App Panel */}
<div className="w-full sm:w-1/2">
  <div className={pageStyles.subtitle}>
    <h2>Task Timer</h2>
  </div>
  <FocusTaskList />
</div>

        <div className="flex flex-col sm:flex-row justify-center gap-8 p-4 w-full">
          <div className="w-full sm:w-1/2">
            <PomodoroTimer />
          </div>
        </div>

    </div>
  );
};

// Utility to determine appropriate text color for contrast
function getContrastYIQ(hex: string): "light" | "dark" {
  const sanitizedHex = hex.replace("#", "");
  const r = parseInt(sanitizedHex.substr(0, 2), 16);
  const g = parseInt(sanitizedHex.substr(2, 2), 16);
  const b = parseInt(sanitizedHex.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "light" : "dark";
}

export default Dashboard;
