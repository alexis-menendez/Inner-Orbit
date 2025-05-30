// File: client/src/components/dashboard/pet/dev/SquidDev.tsx

import React, { useEffect, useState } from "react";
import WeeklyMoodReview from "../../WeeklyMoodCalendar";
import PomodoroTimer from "../../pomodoro/PomodoroTimer";
import FocusTaskList from "../../pomodoro/FocusTaskList";
import SquidPet from "../SquidPet";
import MoodBubble from "../MoodBubble";
import type { AnimationKey } from "../SquidPet";
import { usePetEmotion } from "../../../../hooks/usePetEmotion";
import { moodQuotes } from "../../../../utils/moodQuotes";
import pageStyles from "../../../../assets/css/dashboard/Dashboard.module.css";
import buttonStyles from "../../../../assets/css/common/Button.module.css";

type MoodEntry = {
  id: string;
  label: string;
  date: string;
  color: string;
};

const SquidDev: React.FC = () => {
  const [weeklyMoods, setWeeklyMoods] = useState<Record<string, MoodEntry>>({});
  const { mood, setMood, affection, adjustAffection } = usePetEmotion();
  const [quote, setQuote] = useState<string>("");
  const [petAnim, setPetAnim] = useState<AnimationKey>("idle");

  useEffect(() => {
    if (mood !== "idle") {
      const timeout = setTimeout(() => {
        setMood("idle");
        setPetAnim("idle");
        setQuote("");
      }, 60000);
      return () => clearTimeout(timeout);
    }
  }, [mood]);

  const getRandomQuote = (mood: string): string => {
    const quotes = moodQuotes[mood];
    if (!quotes || quotes.length === 0) return "";
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <div className={`flex flex-col items-center px-4 py-8 gap-8 relative z-10 ${pageStyles.dashboardPage}`}>
      <div className={pageStyles.weeklySquidRow}>
        <div className="w-full max-w-md sm:max-w-xl md:max-w-lg cosmic-panel">
          <div className={pageStyles.subtitle}>
            <h2>Weekly Review</h2>
          </div>
          <WeeklyMoodReview />
        </div>

        <div className={pageStyles.squidWrapper}>
          <div className="flex flex-row items-start gap-8 mt-2">
            <div className="relative flex flex-col items-center mt-2">
              <SquidPet
                trigger={petAnim}
                onDone={() => {
                  setTimeout(() => {
                    setPetAnim("idle");
                    setMood("idle");
                    setQuote("");
                  }, 5000);
                }}
                name="Squidy"
                hasAura={affection >= 50}
                auraColor="#b388ff"
              />

              {quote && (
                <div className="mt-4 text-center text-white text-sm max-w-xs">
                  <div className="bg-purple-900 bg-opacity-70 p-3 rounded-xl shadow-md">
                    <p className="italic">"{quote}"</p>
                  </div>
                </div>
              )}

              <div className="text-sm text-white mt-2 text-center">
                Mood: <strong>{mood}</strong> | Affection: <strong>{affection}</strong>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-[6rem]">
              {[
                { label: "Happy", mood: "happy", anim: "jump" },
                { label: "Tired", mood: "tired", anim: "fall" },
                { label: "Playful", mood: "playful", anim: "inksquirt" },
                { label: "Focused", mood: "focused", anim: "attackDown" },
                { label: "Sad", mood: "sad", anim: "hurt" },
                { label: "Angry", mood: "angry", anim: "attackUp" },
                { label: "Inspired", mood: "inspired", anim: "jumpslam" },
                { label: "Bored", mood: "bored", anim: "die" },
                { label: "Anxious", mood: "anxious", anim: "hurt" },
                { label: "Content", mood: "content", anim: "walk" },
              ].map(({ label, mood: m, anim }) => (
                <button
                  key={label}
                  onClick={() => {
                    setMood(m as any);
                    setPetAnim(anim as AnimationKey);
                    setQuote(getRandomQuote(m));
                  }}
                  className="px-3 py-1 text-sm bg-purple-800 text-white rounded hover:bg-purple-600 transition-all text-left"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2">
        <div className={pageStyles.subtitle}>
          <h2>Task Timer</h2>
        </div>
        <FocusTaskList
          onTaskAdd={() => {
            const mood = "playful";
            setMood(mood);
            setPetAnim("inksquirt");
            adjustAffection(+2);
            setQuote(getRandomQuote(mood));
          }}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-8 p-4 w-full">
        <div className="w-full sm:w-1/2">
          <PomodoroTimer
            onPomodoroStart={() => {
              const mood = "focused";
              setMood(mood);
              setPetAnim("attackUp");
              adjustAffection(+1);
              setQuote(getRandomQuote(mood));
            }}
            onPomodoroEnd={() => {
              const mood = "tired";
              setMood(mood);
              setPetAnim("die");
              adjustAffection(-1);
              setQuote(getRandomQuote(mood));
            }}
            onBreakStart={() => {
              const mood = "happy";
              setMood(mood);
              setPetAnim("inksquirt");
              adjustAffection(+1);
              setQuote(getRandomQuote(mood));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SquidDev;
