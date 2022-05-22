const middleSymbols = [{ line: 0 }, { line: 1 }, { line: 2 }];

export interface IGameConfigSymbol {
  line: number;
}
export interface IGameConfigReel {
  position: { x: number; y: number };
  symbols: IGameConfigSymbol[];
}

const SYMBOL_WIDTH = 150;
const SYMBOL_HEIGHT = SYMBOL_WIDTH;

const REEL_SET_POSITION_X = 1920 / 2 - 3 * SYMBOL_WIDTH;
let REEL_SET_POSITION_Y = 100;

export const GameConfig1 = {
  spinSpeed: 60,
  spinDuration: 1000,
  timeBetweenReelStops: 300,

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
export const GameConfig2 = {
  spinSpeed: 60,
  spinDuration: 1000,
  timeBetweenReelStops: 300,

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

export const GameConfig3 = {
  spinSpeed: 100,
  spinDuration: 1000,
  timeBetweenReelStops: 300,

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

export const GameConfig4 = {
  spinSpeed: 100,
  spinDuration: 1000,
  timeBetweenReelStops: 300,

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

export const GameConfig = {
  spinSpeed: 100,
  spinDuration: 500,
  timeBetweenReelStops: 500,

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
