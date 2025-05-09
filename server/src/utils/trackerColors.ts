// File: server/src/utils/trackerColors.ts

export const getMoodColor = (mood: string): string => {
  const colors: Record<string, string> = {
    happy: "#FFD700",
    sad: "#1E90FF",
    angry: "#FF4500",
    calm: "#98FB98",
    anxious: "#8A2BE2",
    default: "#CCCCCC",
  };

  return colors[mood.toLowerCase()] || colors.default;
};
