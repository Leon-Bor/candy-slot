let middleSymbols = [{ line: 0 }, { line: 1 }, { line: 2 }];

interface GameConfig {
  gameType: GameType;
  spinSpeed: number;
  spinDuration: number;
  timeBetweenReelStops: number;
  symbolSize: {
    width: number;
    height: number;
  };
  symbolTextures: string[];
  symbolFallDelay: number;
  reels: {
    position: {
      x: number;
      y: number;
    };
    symbols: {
      line: number;
    }[];
  }[];
}

export enum GameType {
  Slot = "Slot",
  CandyCrush = "CandyCrush",
}

export interface IGameConfigSymbol {
  line: number;
}
export interface IGameConfigReel {
  position: { x: number; y: number };
  symbols: IGameConfigSymbol[];
}

let SYMBOL_WIDTH = 150;
let SYMBOL_HEIGHT = SYMBOL_WIDTH;

let REEL_SET_POSITION_X = 1920 / 2 - 3 * SYMBOL_WIDTH;
let REEL_SET_POSITION_Y = 100;

export const GameConfig1: GameConfig = {
  gameType: GameType.Slot,
  spinSpeed: 60,
  spinDuration: 1000,
  timeBetweenReelStops: 300,
  symbolFallDelay: 0,

  symbolSize: { width: SYMBOL_WIDTH, height: SYMBOL_HEIGHT },
  symbolTextures: ["1", "2", "3", "4", "5", "6", "7"],
  reels: [
    {
      position: {
        x: REEL_SET_POSITION_X,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 2,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 3,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 4,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
  ],
};

const fiveSymbols = [
  { line: 0 },
  { line: 1 },
  { line: 2 },
  { line: 3 },
  { line: 4 },
];
export const GameConfig2: GameConfig = {
  gameType: GameType.Slot,
  spinSpeed: 60,
  spinDuration: 1000,
  timeBetweenReelStops: 300,
  symbolFallDelay: 0,

  symbolSize: { width: SYMBOL_WIDTH, height: SYMBOL_HEIGHT },
  symbolTextures: ["1", "2", "3", "4", "5", "6", "7"],
  reels: [
    {
      position: {
        x: REEL_SET_POSITION_X,
        y: REEL_SET_POSITION_Y,
      },
      symbols: fiveSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH,
        y: REEL_SET_POSITION_Y,
      },
      symbols: fiveSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 2,
        y: REEL_SET_POSITION_Y,
      },
      symbols: fiveSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 3,
        y: REEL_SET_POSITION_Y,
      },
      symbols: fiveSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 4,
        y: REEL_SET_POSITION_Y,
      },
      symbols: fiveSymbols,
    },
  ],
};

export const GameConfig3: GameConfig = {
  gameType: GameType.Slot,
  spinSpeed: 100,
  spinDuration: 1000,
  timeBetweenReelStops: 300,
  symbolFallDelay: 0,

  symbolSize: { width: SYMBOL_WIDTH, height: SYMBOL_HEIGHT },
  symbolTextures: ["1", "2", "3", "4", "5", "6", "7"],
  reels: [
    {
      position: {
        x: REEL_SET_POSITION_X,
        y: REEL_SET_POSITION_Y + SYMBOL_HEIGHT / 2,
      },
      symbols: [{ line: 0 }, { line: 1 }],
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 2,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 3,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 4,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 5,
        y: REEL_SET_POSITION_Y + SYMBOL_HEIGHT / 2,
      },
      symbols: [{ line: 1 }, { line: 2 }],
    },
  ],
};

export const GameConfig4: GameConfig = {
  gameType: GameType.Slot,
  spinSpeed: 100,
  spinDuration: 1000,
  timeBetweenReelStops: 300,
  symbolFallDelay: 0,

  symbolSize: { width: SYMBOL_WIDTH, height: SYMBOL_HEIGHT },
  symbolTextures: ["1", "2", "3", "4", "5", "6", "7"],
  reels: [
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 2,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 3,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 4,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 5,
        y: REEL_SET_POSITION_Y + SYMBOL_HEIGHT / 2,
      },
      symbols: [{ line: 1 }, { line: 2 }],
    },
    {
      position: {
        x: REEL_SET_POSITION_X,
        y: REEL_SET_POSITION_Y + SYMBOL_HEIGHT / 2,
      },
      symbols: [{ line: 0 }, { line: 1 }],
    },
  ],
};

const tripleSpin = (i: number) => {
  return [
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * i,
        y: REEL_SET_POSITION_Y,
      },
      symbols: [{ line: 0 }],
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * i,
        y: REEL_SET_POSITION_Y + SYMBOL_HEIGHT,
      },
      symbols: [{ line: 0 }],
    },

    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * i,
        y: REEL_SET_POSITION_Y + SYMBOL_HEIGHT * 2,
      },
      symbols: [{ line: 0 }],
    },
  ];
};

export const GameConfig5: GameConfig = {
  gameType: GameType.Slot,
  spinSpeed: 100,
  spinDuration: 500,
  timeBetweenReelStops: 500,
  symbolFallDelay: 0,

  symbolSize: { width: SYMBOL_WIDTH, height: SYMBOL_HEIGHT },
  symbolTextures: ["1", "2", "3", "4", "5", "6", "7"],
  reels: [
    ...tripleSpin(0),
    ...tripleSpin(1),
    ...tripleSpin(2),
    ...tripleSpin(3),
    ...tripleSpin(4),
  ],
};

// candy crush

SYMBOL_WIDTH = 100;
SYMBOL_HEIGHT = SYMBOL_WIDTH;

REEL_SET_POSITION_X = 1920 / 2 - 4 * SYMBOL_WIDTH;
REEL_SET_POSITION_Y = 1080 / 2 - 4 * SYMBOL_WIDTH;

middleSymbols = [
  { line: 0 },
  { line: 1 },
  { line: 2 },
  { line: 3 },
  { line: 4 },
  { line: 5 },
  { line: 6 },
  { line: 7 },
];

export const GameConfig6: GameConfig = {
  gameType: GameType.CandyCrush,
  spinSpeed: 60,
  spinDuration: 0,
  timeBetweenReelStops: 100,
  symbolFallDelay: 50,
  symbolSize: { width: SYMBOL_WIDTH, height: SYMBOL_HEIGHT },
  symbolTextures: [
    "candy-0",
    "candy-1",
    "candy-2",
    "candy-3",
    "candy-4",
    "candy-5",
    "candy-6",
    "candy-7",
  ],
  reels: [
    {
      position: {
        x: REEL_SET_POSITION_X,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 2,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 3,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 4,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 5,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 6,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
    {
      position: {
        x: REEL_SET_POSITION_X + SYMBOL_WIDTH * 7,
        y: REEL_SET_POSITION_Y,
      },
      symbols: middleSymbols,
    },
  ],
};
