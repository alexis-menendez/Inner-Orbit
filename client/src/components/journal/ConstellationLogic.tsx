// File: client/src/components/journal/ConstellationLogic.tsx

export interface StarPoint {
  x: number;
  y: number;
  size?: number; // optional star size
}

export interface Constellation {
  name: string;
  description?: string;
  stars: StarPoint[];
  connections: [number, number][]; 
}

export const CONSTELLATIONS: Constellation[] = [
  {
    name: "The Key",
    description: "A winding shaft ending in a toothed edge—an ancient key to memory.",
    stars: [
      { x: 15, y: 31, size: .5 },  
      { x: 26, y: 30, size: 1 },  
      { x: 43, y: 29, size: 1.25 },  
      { x: 51, y: 31, size: .5 },  
      { x: 51, y: 47, size: 1 },  
      { x: 58, y: 32, size: 1.25 }, 
      { x: 57.5, y: 45, size: .5 },  
      { x: 62, y: 30, size: 1 },  
      { x: 62.5, y: 53, size: 1.25 },  
 
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
      { x: 46, y: 18, size: .4 }, 
      { x: 46, y: 18, size: .7 }, 
      { x: 50, y: 35, size: .9 },  
      { x: 43, y: 50, size: 1.20 },  
      { x: 40, y: 46, size: .5 }, 
      { x: 39, y: 38, size: .75 },  
      { x: 42, y: 28, size: 1 }, 
    
      // Candle body
      { x: 41, y: 61, size: 1.25 },
      { x: 50.5, y: 60, size: .5 }, 
      { x: 50, y: 65, size: .75 }, 
      { x: 51, y: 81, size: 1 }, 
      { x: 60, y: 80, size: 1.20 }, 
      { x: 65, y: 95, size: .5 },
      { x: 61.5, y: 111, size: .65 }, 
      { x: 50, y: 110, size: .9 }, 
      { x: 50.5, y: 120, size: 1.23 }, 
      { x: 39.5, y: 121, size: .55 }, 
      { x: 40.5, y: 90, size: .7 }, 
      { x: 40, y: 80, size: 1.1 }, 
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
    name: "The Sun",
    description: "NEED TO WRITE DESCRIPTION.",
    stars: [
      //center
      { x: 60.5, y: 40.5, size: .5 }, 
      { x: 60.5, y: 40.5, size: .75 }, 
      { x: 65, y: 46, size: 1 }, 
      { x: 60.5, y: 50.5, size: 1.25 }, 
      { x: 55, y: 45, size: .5 }, 

      // top point
      { x: 50.5, y: 35.5, size: .75 }, 
      { x: 30, y: 26, size: 1 },
      { x: 50.5, y: 41.5, size: 1.25 }, 
      { x: 55, y: 35, size: .5 },
      { x: 60.5, y: 10.5, size: .75 },
      { x: 65, y: 31, size: 1.1 }, 
      { x: 65.5, y: 30.5, size: 1.20 }, 

      // bottom point 
      { x: 70, y: 56, size: .4 }, 
      { x: 90.5, y: 65.5, size: .78 }, 
      { x: 70, y: 51, size: .9 },
      { x: 65.5, y: 56.5, size: 1.15 }, 
      { x: 60, y: 80, size: .6 }, 
      { x: 55.5, y: 60.5, size: .7 }, 
      { x: 55, y: 61, size: 1.05 }, 
      
      // left point
      { x: 70.5, y: 35.5, size: 1.23 }, 
      { x: 80, y: 15, size: .63 },
      { x: 65.5, y: 36.5, size: .77 },
      { x: 70, y: 40, size: .95 },
      { x: 95.5, y: 45.5, size: 1.24 }, 
      { x: 75, y: 51, size: .55 }, 
      { x: 75.5, y: 50.5, size: .73 }, 

      // right ray
      { x: 50, y: 56, size: .92 }, 
      { x: 40.5, y: 75.5, size: 1.20  }, 
      { x: 55, y: 56, size: .5 }, 
      { x: 50.5, y: 51.5, size: .75 }, 
      { x: 25, y: 45, size: 1 }, 
      { x: 45.5, y: 40.5, size: 1.25 },
      { x: 45, y: 41, size: .5 },

    ],
connections: [
  // center
  [1, 2], 
  [2, 3], 
  [3, 4], 
  [4, 1], 

  // top
  [5, 6],  
  [6, 7],  
  [7, 8],  
  [7, 8],  
  [8, 9],  
  [9, 10], 

  // bottom
  [12, 13], 
  [13, 14], 
  [14, 15], 
  [15, 16], 
  [16, 17], 
  [17, 18], 

  // left ray
  [19, 20],
  [20, 21],
  [21, 22],
  [22, 23],
  [23, 24],
  [24, 25],

  // right ray
  [26, 27],
  [27, 28],
  [28, 29],
  [29, 30],
  [30, 31],
  [31, 32],
],
  },
  {
    name: "The Spiral",
    description: "A tightening curl of stars, always pulling inward toward a core.",
    stars: [

      { x: 60.5, y: 42, size: .5 }, 
      { x: 60.5, y: 42, size: .75 }, 
      { x: 65, y: 45, size: 1 }, 
      { x: 60.5, y: 50, size: 1.25 }, 
      { x: 55, y: 45, size: .5 }, 
      { x: 58.5, y: 35, size: .75 },
      { x: 65, y: 38, size: 1.25 },
      { x: 70.5, y: 46, size: .5 },
      { x: 63, y: 58, size: .75 },
      { x: 55.5, y: 54, size: 1 },
      { x: 50, y: 48, size: 1.25 },
      { x: 51.5, y: 40, size: .5 },

    ],
    connections: [
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], 
    ]
  },
  {
    name: "The Bridge",
    description: "A graceful arc crossing the dark—a path between two worlds.",
    stars: [
      { x: 15, y: 70 },
      { x: 20, y: 65 },
      { x: 30, y: 60 },
      { x: 40, y: 60 },
      { x: 50, y: 65 },
      { x: 60, y: 70 },
      { x: 60, y: 50 },
      { x: 50, y: 55 },
      { x: 35, y: 48 },
      { x: 25, y: 55 },
      { x: 15, y: 50 },
      
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 0], [3, 7], [4, 7], [2, 8], [3, 8], [1, 9], [2, 9],
    ]
  },
  {
    name: "The Seed",
    description: "A tiny core enclosed in potential—growth written in the stars.",
    stars: [
      { x: 15, y: 70 },
      { x: 20, y: 65 },
      { x: 30, y: 60 },
      { x: 40, y: 60 },
      { x: 50, y: 65 },
      { x: 60, y: 70 },
      { x: 60, y: 80 },
      { x: 50, y: 85 },
      { x: 40, y: 88 },
      { x: 30, y: 85 },
      { x: 20, y: 75 },
      
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 0]
    ]
  }
];

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

    if (remainingEntries < totalStars) {
      return {
        constellation,
        activeStars: constellation.stars.slice(0, remainingEntries),
        isComplete: false
      };
    }

    if (remainingEntries === totalStars) {
      return {
        constellation,
        activeStars: constellation.stars,
        isComplete: true,
        completedName: constellation.name,
        completedDescription: constellation.description
      };
    }

    remainingEntries -= totalStars;
  }
    const lastConstellation = CONSTELLATIONS[CONSTELLATIONS.length - 1];

    return {
      constellation: lastConstellation,
      activeStars: lastConstellation.stars,
      isComplete: true,
      completedName: lastConstellation.name,
      completedDescription: lastConstellation.description
  };
}
