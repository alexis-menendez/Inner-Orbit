// File: src/components/common/SpriteAnimator.tsx

import React, { useEffect, useState } from "react";

interface SpriteAnimatorProps {
  frames: string[];
  fps?: number;
  loop?: boolean;
  width?: number;
  height?: number;
  isPlaying?: boolean;
  onAnimationEnd?: () => void;
}

const SpriteAnimator: React.FC<SpriteAnimatorProps> = ({
  frames,
  fps = 12,
  loop = true,
  width = 200,
  height = 200,
  isPlaying = true,
  onAnimationEnd,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isPlaying || frames.length === 0) return;

    setIndex(0); // reset to first frame on new animation

    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= frames.length) {
          if (!loop && onAnimationEnd) onAnimationEnd();
          return loop ? 0 : prev;
        }
        return next;
      });
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [frames, fps, loop, isPlaying]);

  return (
    <img
      src={frames[index]}
      alt="animation frame"
      width={width}
      height={height}
      style={{ imageRendering: "pixelated" }}
    />
  );
};

export default SpriteAnimator;
