// File: client/src/pages/Dashboard.tsx

import React, { useEffect, useState } from "react";
import WeeklyMoodReview from "../components/dashboard/WeeklyMoodCalendar";
import PomodoroTimer from "../components/dashboard/pomodoro/PomodoroTimer";
import FocusTaskList from "../components/dashboard/pomodoro/FocusTaskList";
import SquidPet from "../components/dashboard/pet/SquidPet";
import buttonStyles from "../assets/css/common/Button.module.css";
import pageStyles from "../assets/css/dashboard/Dashboard.module.css";
import { usePetEmotion } from "../hooks/usePetEmotion";
import MoodBubble from "../components/dashboard/pet/MoodBubble";
import type { AnimationKey } from "../components/dashboard/pet/SquidPet";

type MoodEntry = {
  id: string;
  label: string;
  date: string;
  color: string;
};

const Dashboard: React.FC = () => {
  const [weeklyMoods, setWeeklyMoods] = useState<Record<string, MoodEntry>>({});
  const { mood, setMood, affection, adjustAffection } = usePetEmotion();

  const [petAnim, setPetAnim] = useState<AnimationKey>("idle");

  // 🟢 Mood submitted → squid walks
  const handleMoodLog = () => {
    setMood("focused");
    setPetAnim("walk");
    adjustAffection(+1);
  };

  // 🟢 Journal created → squid jumps
  const handleJournalSubmit = () => {
    setMood("happy");
    setPetAnim("jump");
    adjustAffection(+2);
  };

  // 🟢 Focus task added → squid does leg lift
  const handleFocusTaskAdd = () => {
    setMood("playful");
    setPetAnim("legLift");
    adjustAffection(+2);
  };

  // 🟢 Pomodoro started → squid attacks up
  const handlePomodoroStart = () => {
    setMood("focused");
    setPetAnim("attackUp");
    adjustAffection(+1);
  };

  // 🟢 Pomodoro break started → squid inks
  const handlePomodoroBreak = () => {
    setMood("happy");
    setPetAnim("inksquirt");
    adjustAffection(+1);
  };

  // 🟢 Pomodoro ends → squid dies dramatically 💀
  const handlePomodoroEnd = () => {
    setMood("tired");
    setPetAnim("die");
    adjustAffection(-1);
  };

  return (
    <div className={`flex flex-col items-center px-4 py-8 gap-8 relative z-10 ${pageStyles.dashboardPage}`}>

      {/* Weekly Mood Summary */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl cosmic-panel">
      <div className={pageStyles.subtitle}>
        <h2>Weekly Review</h2>
      </div>
        <WeeklyMoodReview />
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

        <div className="relative">
          <MoodBubble mood={mood} />
          <SquidPet
  trigger={petAnim}
  onDone={() => {
    setMood("idle");
    setPetAnim("idle"); // ✅ reset animation after it's done
  }}
  name="Squidy"
  hasAura={affection >= 50}
  auraColor="#b388ff"
/>


        </div>

        <div className="text-sm text-white mt-2 text-center">
          Mood: <strong>{mood}</strong> | Affection: <strong>{affection}</strong>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {[
            { label: "Idle", mood: "idle", anim: "idle" },
            { label: "Happy", mood: "happy", anim: "jump" },
            { label: "Tired", mood: "tired", anim: "fall" },
            { label: "Playful", mood: "playful", anim: "legLift" },
            { label: "Focused", mood: "focused", anim: "attackUp" },
            { label: "Sad", mood: "sad", anim: "hurt" },
            { label: "Angry", mood: "angry", anim: "attackDown" },
          ].map(({ label, mood: m, anim }) => (
            <button
              key={label}
              onClick={() => {
                setMood(m as any);
                setPetAnim(anim as AnimationKey);
              }}
              className="px-3 py-1 text-sm bg-purple-800 text-white rounded hover:bg-purple-600 transition-all"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Focus App Panel */}
{/* Focus App Panel */}
<div className="w-full sm:w-1/2">
  <div className={pageStyles.subtitle}>
    <h2>Task Timer</h2>
  </div>
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

export default Dashboard;
