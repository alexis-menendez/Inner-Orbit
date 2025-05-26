// File: client/src/pages/Dashboard.tsx

import React, { useEffect, useState } from "react";
import WeeklyMoodReview from "../components/dashboard/WeeklyMoodCalendar";
import PomodoroTimer from "../components/dashboard/pomodoro/PomodoroTimer";
import FocusTaskList from "../components/dashboard/pomodoro/FocusTaskList";
import SquidPet from "../components/dashboard/pet/SquidPet";
import buttonStyles from '../assets/css/common/Button.module.css';
import pageStyles from '../assets/css/dashboard/Dashboard.module.css';
import Lottie from 'lottie-react';
import squidIdleAnimation from '../assets/lottie/squid-idle.json';


// Type for individual mood entries
type MoodEntry = {
  id: string;
  label: string;
  date: string;
  color: string;
};

const Dashboard: React.FC = () => {
  const [weeklyMoods, setWeeklyMoods] = useState<Record<string, MoodEntry>>({});

  // Define allowed animation keys for the squid pet
  type AnimationKey = 'idle' | 'walk' | 'legLift' | 'fall' | 'jump' | 'jumpslam' | 'inksquirt' | 'attackDown' | 'attackUp' | 'hurt' | 'die' | 'win';

  // Current animation being played
  const [petAnim, setPetAnim] = useState<AnimationKey>('idle');

  // Resets the animation to idle after 2 seconds
  const resetToIdle = () => {
    setTimeout(() => setPetAnim('idle'), 2000);
  };

  // Example: Trigger walk animation when mood is logged
  const handleMoodLog = () => {
    setPetAnim('walk');
    resetToIdle();
  };

  // Example: Trigger leg lift when task is added
  const handleFocusTaskAdd = () => {
    setPetAnim('legLift');
    resetToIdle();
  };

  // Example: Trigger die animation when pomodoro ends
  const handlePomodoroEnd = () => {
    setPetAnim('die');
    resetToIdle();
  };

  return (
    <div className={`flex flex-col items-center px-4 py-8 gap-8 relative z-10 ${pageStyles.dashboardPage}`}>

      {/* Weekly Mood Summary - Vertical, Mobile-First, Auto-Contrast */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl cosmic-panel">
        <h2 className="text-2xl mb-4">Weekly Review</h2>
        <WeeklyMoodReview onMoodSubmit={handleMoodLog} />
      </div>

      {/* Squid Pet - reacts to dashboard events */}
      <div className="my-4">
        <SquidPet trigger={petAnim} />

        {/* Debug/Test Direct Lottie Playback */}
        <Lottie
          animationData={squidIdleAnimation}
          loop
          autoplay
          style={{
            width: 256,
            height: 341,
            border: '2px solid lime',
            backgroundColor: 'black',
          }}
        />
      </div>

      {/* Focus App Panel */}
      <div className="w-full sm:w-1/2">
        <FocusTaskList onTaskAdd={handleFocusTaskAdd} />
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-8 p-4 w-full">
        <div className="w-full sm:w-1/2">
          <PomodoroTimer onPomodoroEnd={handlePomodoroEnd} />
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
