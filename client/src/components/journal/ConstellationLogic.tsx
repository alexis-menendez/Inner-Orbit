// File: client/src/components/journal/ConstellationLogic.tsx

interface StarPoint {
  x: number; // % of width
  y: number; // % of height
}

interface Constellation {
  name: string;
  stars: StarPoint[];
}

// Preset constellations (add more shapes later)
export const CONSTELLATIONS: Constellation[] = [
  {
    name: "Lyra",
    stars: [
      { x: 20, y: 30 },
      { x: 30, y: 40 },
      { x: 40, y: 35 },
      { x: 50, y: 45 },
      { x: 60, y: 40 },
      { x: 70, y: 50 },
    ]
  },
  {
    name: "Orion",
    stars: [
      { x: 10, y: 60 },
      { x: 20, y: 65 },
      { x: 30, y: 62 },
      { x: 40, y: 68 },
      { x: 50, y: 60 },
      { x: 60, y: 66 },
      { x: 70, y: 64 },
    ]
  }
];

export function getConstellationForEntryCount(entryCount: number): { constellation: Constellation; activeStars: StarPoint[] } {
  const index = Math.floor(entryCount / 6); // Every 6 entries builds a new constellation
  const constellation = CONSTELLATIONS[Math.min(index, CONSTELLATIONS.length - 1)];
  const activeStars = constellation.stars.slice(0, entryCount % 6 || constellation.stars.length);

  return { constellation, activeStars };
}
