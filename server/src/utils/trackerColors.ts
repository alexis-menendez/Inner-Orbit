// File: server/src/utils/trackerColors.ts

export const getMoodColor = (mood: string): string => {
  const colors: Record<string, string> = {
    happy: "#D475E2",
    sad: "#3E4473",
    angry: "#84242e",
    anxious: "#8A2BE2",
    excited: "#D475E2",
    bored: "#9A84A2",
    relaxed: "#9A84A2",
    stressed: "#2A4576",
    confused: "#2A4576",
    motivated: "#58d68d",
    tired: "#9A84A2",
    grateful: "#D475E2",
    hopeful: "#D475E2",
    lonely: "#3E4473",
    loved: "#CC3E4C",
    overwhelmed: "#2A4576",
    curious: "#D475E2",
    creative: "#D475E2",
    calm: "#9A84A2",
    disappointed: "#3E4473",
    satisfied: "#D475E2",
    confident: "#D475E2",
    ashamed: "#3E4473",
    jealous: "#1A5556",
    nostalgic: "#9A84A2",
    indifferent: "#9A84A2",
    disconnected: "#3E4473",
    connected: "#D475E2",
    inspired: "#D475E2",
    empowered: "#D475E2",
    guilty: "#3E4473",
    proud: "#D475E2",
    embarrassed: "#84242e",
    frustrated: "#84242e",
    disgusted: "#1A5556",
    surprised: "#D475E2",
    content: "#D475E2",
    overjoyed: "#D475E2",
    relieved: "#9A84A2",
    default: "#999999", // Default color for unknown moods
  };

  return colors[mood.toLowerCase()] || colors.default;
};
