// File: client/src/components/journal/ConstellationLogic.tsx

// Represents a star's position as a percentage of container width/height
export interface StarPoint {
  x: number;
  y: number;
}

// Each constellation has a name, star layout, connection lines, and a description
export interface Constellation {
  name: string;
  description?: string;
  stars: StarPoint[];
  connections: [number, number][]; // line from index A to B
}

// Preset constellations
export const CONSTELLATIONS: Constellation[] = [
  {
    name: "The Key",
    description: "A winding shaft ending in a toothed edge—an ancient key to memory.",
    stars: [
      { x: 15, y: 31 },  
      { x: 26, y: 30 },  
      { x: 43, y: 29 },  
      { x: 51, y: 31 },  
      { x: 51, y: 47 },  
      { x: 58, y: 32 }, 
      { x: 57.5, y: 45 },  
      { x: 62, y: 30 },  
      { x: 62.5, y: 53 },  
 
    ],
        connections: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [3, 5],
        [5, 6],
        [5, 7],
        [7, 8]
        ]
  },
  {
    name: "The Candle",
    description: "A glowing light suspended in the dark, carried across galaxies.",
    stars: [
    // Flame
      { x: 46, y: 48 }, 
      { x: 46, y: 48 }, 
      { x: 50, y: 65 },  
      { x: 43, y: 80 },  
      { x: 40, y: 76 }, 
      { x: 39, y: 68 },  
      { x: 42, y: 58 }, 
    
    // Candle
      { x: 41, y: 91 },
      { x: 50.5, y: 90 }, 
      { x: 50, y: 95 }, 
      { x: 51, y: 111 }, 
      { x: 60, y: 110 }, 
      { x: 65, y: 125 }, 
      { x: 61.5, y: 141 }, 
      { x: 50, y: 140 }, 
      { x: 50.5, y: 150 }, 
      { x: 39.5, y: 151 }, 
      { x: 40.5, y: 120 }, 
      { x: 40, y: 110 }, 

    ],
connections: [
  // Flame
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 1], 
  

  // Candle body
  [7, 8],     
  [8, 9],    
  [9, 10],    
  [10, 11],    
  [11, 12],    
  [12, 13],    
  [13, 14],    
  [14, 15],    
  [15, 16],    
  [16, 17],    
  [17, 18],   
  [18, 7],     
  [10, 14],    
  [10, 18]     
]
},
  {
    name: "The Willow",
    description: "A gentle arc with trailing branches that weep toward the stars.",
    stars: [
      { x: 20, y: 40 },
      { x: 30, y: 35 },
      { x: 40, y: 33 },
      { x: 50, y: 35 },
      { x: 60, y: 40 },
      { x: 25, y: 50 },
      { x: 45, y: 50 },
      { x: 55, y: 52 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [1, 5], [3, 6], [4, 7]
    ]
  },
  {
    name: "The Spiral",
    description: "A tightening curl of stars, always pulling inward toward a core.",
    stars: [
      { x: 60, y: 30 },
      { x: 55, y: 35 },
      { x: 50, y: 40 },
      { x: 48, y: 45 },
      { x: 50, y: 50 },
      { x: 53, y: 53 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5]
    ]
  },
  {
    name: "The Bridge",
    description: "A graceful arc crossing the dark—a path between two worlds.",
    stars: [
      { x: 10, y: 70 },
      { x: 20, y: 65 },
      { x: 30, y: 60 },
      { x: 40, y: 60 },
      { x: 50, y: 65 },
      { x: 60, y: 70 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5]
    ]
  },
  {
    name: "The Seed",
    description: "A tiny core enclosed in potential—growth written in the stars.",
    stars: [
      { x: 75, y: 60 }, // core
      { x: 70, y: 55 },
      { x: 70, y: 65 },
      { x: 80, y: 55 },
      { x: 80, y: 65 },
    ],
    connections: [
      [0, 1], [0, 2], [0, 3], [0, 4]
    ]
  }
];

// Determine which constellation and how many stars should be visible
export function getConstellationForEntryCount(entryCount: number): {
  constellation: Constellation;
  activeStars: StarPoint[];
  isComplete: boolean;
  completedName?: string;
  completedDescription?: string;
} {
  let remainingEntries = entryCount;

  for (let i = 0; i < CONSTELLATIONS.length; i++) {
    const constellation = CONSTELLATIONS[i];
    const totalStars = constellation.stars.length;

    // Not yet filled this constellation
    if (remainingEntries < totalStars) {
      return {
        constellation,
        activeStars: constellation.stars.slice(0, remainingEntries),
        isComplete: false
      };
    }

    // Just completed this constellation exactly
    if (remainingEntries === totalStars) {
      return {
        constellation,
        activeStars: constellation.stars,
        isComplete: true,
        completedName: constellation.name,
        completedDescription: constellation.description
      };
    }

    // Skip to next constellation
    remainingEntries -= totalStars;
  }

// If all constellations are completed, generate solo stars beyond the last constellation
const allStars = CONSTELLATIONS.flatMap(c => c.stars);
const overflowCount = remainingEntries;

// Generate unique solo star points
const soloStars: StarPoint[] = [];

while (soloStars.length < overflowCount) {
  const candidate: StarPoint = {
    x: Math.floor(Math.random() * 90) + 5, // stay 5–95% from edges
    y: Math.floor(Math.random() * 90) + 5
  };

  const isTooClose = allStars.concat(soloStars).some(existing =>
    Math.abs(existing.x - candidate.x) < 5 && Math.abs(existing.y - candidate.y) < 5
  );

  if (!isTooClose) {
    soloStars.push(candidate);
  }

  // Avoid infinite loops on a crowded screen
  if (soloStars.length > 100) break;
}

return {
  constellation: {
    name: "Wandering Stars",
    stars: soloStars,
    connections: []
  },
  activeStars: soloStars,
  isComplete: false
};

}
