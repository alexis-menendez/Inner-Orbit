// File: client/src/pages/Dashboard.tsx

import React, { useState } from "react";
import WeeklyMoodReview from "../components/dashboard/WeeklyMoodCalendar";
import PomodoroTimer from "../components/dashboard/pomodoro/PomodoroTimer";
import FocusTaskList from "../components/dashboard/pomodoro/FocusTaskList";
import buttonStyles from "../assets/css/common/Button.module.css";
import pageStyles from "../assets/css/dashboard/Dashboard.module.css";

type MoodEntry = {
  id: string;
  label: string;
  date: string;
  color: string;
};

const Dashboard: React.FC = () => {
  const [weeklyMoods, setWeeklyMoods] = useState<Record<string, MoodEntry>>({});

  return (
    <div className={`flex flex-col items-center px-4 py-8 gap-8 relative z-10 ${pageStyles.dashboardPage}`}>

      {/* Weekly Mood Summary */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-lg cosmic-panel">
        <div className={pageStyles.subtitle}>
          <h2>Weekly Review</h2>
        </div>
        <WeeklyMoodReview />
      </div>

      {/* Focus App Panel */}
      <div className="w-full sm:w-1/2">
        <div className={pageStyles.subtitle}>
          <h2>Task Timer</h2>
        </div>
        <FocusTaskList onTaskAdd={() => {
          // Optional: You can handle something here later
        }} />
      </div>

      {/* Pomodoro + Break Triggers */}
      <div className="flex flex-col sm:flex-row justify-center gap-8 p-4 w-full">
        <div className="w-full sm:w-1/2">
          <PomodoroTimer
            onPomodoroStart={() => {
              // Optional: Handle dashboard-specific logic here
            }}
            onPomodoroEnd={() => {
              // Optional: Handle dashboard-specific logic here
            }}
            onBreakStart={() => {
              // Optional: Handle dashboard-specific logic here
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
