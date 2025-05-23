// File: server/src/models/Tracker.ts

import mongoose, { Schema, Document } from "mongoose";

export type MoodInput = {
  userId: string;
  date: Date;
  mood: string;
  intensity: number;
  moodColor: string;
  note?: string;
};

export interface IMoodEntry extends Document {
  userId: string;
  date: Date;
  mood: string;
  intensity: number;
  moodColor: string;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MoodEntrySchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    mood: {
      type: String,
      enum: [
        // 1. Connection / Love
        'affectionate', 'connected', 'horny', 'intimate', 'loved', 'tender', 'warm',

        // 2. Happy / Energized
        'excited', 'grateful', 'happy', 'hopeful', 'overjoyed',

        // 3. Motivated / Empowered
        'confident', 'creative', 'curious', 'empowered', 'inspired', 'motivated', 'proud',

        // 4. Surprise / Shock
        'alarmed', 'amazed', 'shocked', 'speechless', 'startled', 'surprised',

        // 5. Disgust
        'disgusted', 'jealous', 'repulsed', 'judgmental', 'suspicious', 'resentful',

        // 6. Anger
        'aggressive', 'angry', 'annoyed', 'enraged', 'frustrated', 'irritated',

        // 7. Shame / Guilt
        'ashamed', 'embarrassed', 'guilty', 'humiliated', 'insecure', 'regretful', 'remorseful',

        // 8. Fear / Anxiety
        'anxious', 'confused', 'overwhelmed', 'stressed',

        // 9. Disappointment / Sadness
        'blue', 'despairing', 'disappointed', 'down', 'heartbroken', 'melancholy', 'sad',

        // 10. Isolation / Longing
        'disconnected', 'lonely',

        // 11. Low Stimulation / Exhaustion
        'bored', 'nostalgic', 'tired',

        // 12. Calm / Neutral
        'calm', 'content', 'indifferent', 'relaxed', 'relieved', 'satisfied',

        // 13. Mourning / Grief
        'bereft', 'grieving', 'heartache', 'mourning', 'numb', 'yearning',
      ],
      required: true,
    },
    intensity: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    moodColor: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMoodEntry>("MoodEntry", MoodEntrySchema);
