// File: client/src/pages/Dashboard.tsx

import React, { useEffect, useState } from "react";
import NavBar from "../components/nav/NavBar";
import WeeklyMoodReview from "../components/dashboard/WeeklyMoodCalendar";
import PomodoroTimer from "../components/dashboard/pomodoro/PomodoroTimer";
import FocusTaskList from "../components/dashboard/pomodoro/FocusTaskList";
import SquidPet from "../components/dashboard/pet/SquidPet";
import { useAuth } from "../context/authContext";

type MoodEntry = {
  id: string;
  label: string;
  date: string;
  color: string;
};

const Dashboard: React.FC = () => {
  const [weeklyMoods, setWeeklyMoods] = useState<Record<string, MoodEntry>>({});
  type AnimationKey = 'idle' | 'walk' | 'legLift' | 'fall' | 'jump' | 'jumpslam';
;

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
    <div className="cosmic-background min-h-screen">
      <NavBar />

      <div className="flex flex-col items-center px-4 py-8 gap-8">
        <h1 className="text-3xl glow-text mb-4">Dashboard</h1>

        {/* Weekly Mood Summary - Vertical, Mobile-First, Auto-Contrast */}
        <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl cosmic-panel">
          <h2 className="text-2xl text-white mb-4">Weekly Review</h2>
          <WeeklyMoodReview />
        </div>
        {/* Squid Pet */}
        <div className="my-4">
  <SquidPet trigger={petAnim} />
</div>
        {/* Focus App Panel */}
        <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl cosmic-panel">
          <h2 className="text-2xl text-white mb-4">Focus App</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "2rem",
              padding: "1rem",
            }}
          >
                    </div>
        </div>
        {/* Focus App Panel */}
        <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl cosmic-panel">
          <h2 className="text-2xl text-white mb-4">Focus App</h2>
          <div className="flex justify-center flex-wrap gap-8 p-4">
            <PomodoroTimer />
            <FocusTaskList />
          </div>
        </div>

        {/* Debug Buttons — replace with real event hooks later */}
        <div className="flex flex-wrap gap-2">
          <button onClick={handleMoodLog}>Log Mood</button>
                   <button onClick={handleFocusTaskAdd}>Add Focus Task</button>
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
