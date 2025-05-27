// File: src/components/pet/SquidPet.tsx

import React, { useEffect, useState } from "react";
import SpriteAnimator from "../../common/SpriteAnimator";
import { loadFrames } from "../../../utils/loadFrames";
import styles from "../../../assets/css/dashboard/SquidPet.module.css"; // ← Import your CSS

export type AnimationKey =
  | "idle"
  | "walk"
  | "legLift"
  | "fall"
  | "jump"
  | "jumpslam"
  | "inksquirt"
  | "attackDown"
  | "attackUp"
  | "hurt"
  | "die"
  | "win";

interface SquidPetProps {
  trigger: AnimationKey;
  size?: number;
  onDone?: () => void;
  name?: string;
}

const animationFrameCounts: Record<AnimationKey, number> = {
  idle: 4,
  walk: 4,
  legLift: 5,
  fall: 2,
  jump: 8,
  jumpslam: 7,
  inksquirt: 7,
  attackDown: 4,
  attackUp: 4,
  hurt: 2,
  die: 3,  win: 4,
};

const loopableAnimations: AnimationKey[] = ["idle", "walk"];

const SquidPet: React.FC<SquidPetProps> = ({ trigger, size = 256, onDone, name = "Squidy" }) => {
  const [currentAnim, setCurrentAnim] = useState<AnimationKey>("idle");

  useEffect(() => {
    if (trigger !== currentAnim) {
      setCurrentAnim(trigger);
    }
  }, [trigger]);

  const frames = loadFrames(currentAnim, animationFrameCounts[currentAnim]);
  const loop = loopableAnimations.includes(currentAnim);

  return (
    <div className={styles.squidFrame}>
      <div className={styles.starBackground} />

      <div className={styles.squidContainer}>
        <SpriteAnimator
          frames={frames}
          fps={12}
          loop={loop}
          width={size}
          height={size}
          onAnimationEnd={() => {
            if (!loop) {
              setCurrentAnim("idle");
              onDone?.();
            }
          }}
        />
      </div>

      <div className={styles.petLabel}>{name}</div>
    </div>
  );
};

export default SquidPet;
