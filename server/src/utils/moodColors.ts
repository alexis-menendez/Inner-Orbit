export const getMoodColor = (mood) => {
    const colors = {
      happy: "#FFD700",
      sad: "#1E90FF",
      angry: "#FF4500",
      calm: "#98FB98",
      anxious: "#8A2BE2",
      default: "#CCCCCC"
    };
    return colors[mood.toLowerCase()] || colors.default;
  };
  