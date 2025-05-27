// File: client/src/pages/Dashboard.tsx

import React, { useState } from "react";
import WeeklyMoodReview from "../components/dashboard/WeeklyMoodCalendar";
import PomodoroTimer from "../components/dashboard/pomodoro/PomodoroTimer";
import FocusTaskList from "../components/dashboard/pomodoro/FocusTaskList";
import SquidPet from "../components/dashboard/pet/SquidPet"; // ✅ includes onDone + CSS
import buttonStyles from "../assets/css/common/Button.module.css";
import pageStyles from "../assets/css/dashboard/Dashboard.module.css";
import { usePetEmotion } from "../hooks/usePetEmotion";

// Type for individual mood entries
type MoodEntry = {
  id: string;
  label: string;
  date: string;
  color: string;
};

const Dashboard: React.FC = () => {
  const [weeklyMoods, setWeeklyMoods] = useState<Record<string, MoodEntry>>({});
  // ✅ Pet emotion system
  const { mood, setMood, affection, adjustAffection, getAnimation } =
    usePetEmotion();

  // ✅ Use petAnim based on mood-to-animation logic
  const petAnim = getAnimation(); // ✅ direct from pet emotion system

  // Define allowed animation keys for the squid pet

  // Called when animation completes (from SquidPet)

  // 🟢 Mood submitted → squid walks
  const handleMoodLog = () => {
    setMood("focused");
    adjustAffection(+1);
  };

  // 🟢 Journal created → squid jumps
  const handleJournalSubmit = () => {
    setMood("happy"); // or "playful" or "focused", your choice!
    adjustAffection(+2);
  };

  // 🟢 Focus task added → squid does leg lift
  const handleFocusTaskAdd = () => {
    setMood("playful");
    adjustAffection(+2);
  };

  // 🟢 Pomodoro started → squid attacks up
  const handlePomodoroStart = () => {
    setMood("focused");
    adjustAffection(+1);
  };

  // 🟢 Pomodoro break started → squid inks
  const handlePomodoroBreak = () => {
    setMood("happy");
    adjustAffection(+1);
  };

  // 🟢 Pomodoro ends → squid dies dramatically 💀
  const handlePomodoroEnd = () => {
    setMood("tired");
    adjustAffection(-1);
  };

  return (
    <div
      className={`flex flex-col items-center px-4 py-8 gap-8 relative z-10 ${pageStyles.dashboardPage}`}
    >
      {/* Weekly Mood Summary */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl cosmic-panel">
        <h2 className="text-2xl mb-4">Weekly Review</h2>
        <WeeklyMoodReview onMoodSubmit={handleMoodLog} />
      </div>

      {/* Squid Pet with animations */}
      <div className="relative flex flex-col items-center">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl animate-bounce">
          {mood === "happy" && "😄"}
          {mood === "tired" && "😴"}
          {mood === "focused" && "🧠"}
          {mood === "playful" && "✨"}
          {mood === "sad" && "😢"}
        </div>

        <SquidPet
          trigger={petAnim}
          onDone={() => setMood("idle")}
          name="Squidy"
        />

        <div className="text-sm text-white mt-2 text-center">
          Mood: <strong>{mood}</strong> | Affection:{" "}
          <strong>{affection}</strong>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
  {[
    { label: "Idle", mood: "idle" },
    { label: "Happy", mood: "happy" },
    { label: "Tired", mood: "tired" },
    { label: "Playful", mood: "playful" },
    { label: "Focused", mood: "focused" },
    { label: "Sad", mood: "sad" },
    { label: "Angry", mood: "angry" },
  ].map(({ label, mood: m }) => (
    <button
      key={label}
      onClick={() => setMood(m as any)}
      className="px-3 py-1 text-sm bg-purple-800 text-white rounded hover:bg-purple-600 transition-all"
    >
      {label}
    </button>
  ))}
</div>

      </div>

      {/* Task List */}
      <div className="w-full sm:w-1/2">
        <FocusTaskList onTaskAdd={handleFocusTaskAdd} />
      </div>

      {/* Pomodoro + Break Triggers */}
      <div className="flex flex-col sm:flex-row justify-center gap-8 p-4 w-full">
        <div className="w-full sm:w-1/2">
          <PomodoroTimer
            onPomodoroStart={handlePomodoroStart}
            onPomodoroEnd={handlePomodoroEnd}
            onBreakStart={handlePomodoroBreak}
          />
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
