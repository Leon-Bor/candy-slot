import { singleton } from "tsyringe";
import { GameType } from "../game.config";
import { MathUtils } from "../utils/math-utils";
import { GameConfigService } from "./gameConfig.service";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@singleton()
export class NetworkService {
  spinData!: string[][];

  spinningTime: number = new Date().getTime();

  constructor(public gameConfigService: GameConfigService) {}

  async fetch() {
    await delay(MathUtils.getRandomInt(50, 100));
    this.spinData = this.gameConfigService!.reels.map((reel, i) => {
      const maxNumbersOfSymbols = Math.max(
        ...this.gameConfigService!.reels.map((r) => r.symbols.length)
      );

      const reelData = new Array(maxNumbersOfSymbols).fill(0).map(() => {
        return this.getRandomSymbol();
      });

      if (this.gameConfigService?.gameType == GameType.Slot) {
        // one more on top
        reelData.push(this.getRandomSymbol());
      }

      return reelData;
    });
    this.spinningTime = new Date().getTime();
  }

  getNextSymbol(reelId: number) {
    const reelStopDelay = reelId * this.gameConfigService!.timeBetweenReelStops;
    if (
      new Date().getTime() - this.spinningTime - reelStopDelay >
        this.gameConfigService!.spinDuration ||
      this.gameConfigService?.gameType == GameType.CandyCrush
    ) {
      return this.spinData[reelId].pop();
    } else {
      return this.getRandomSymbol();
    }
  }

  hasNextSymbol(reelId: number) {
    this.spinData[reelId].length;
    return this.spinData[reelId].length > 0;
  }

  symbolsLeft(reelId: number) {
    return this.spinData[reelId].length;
  }

  getRandomSymbol() {
    const randInt = MathUtils.getRandomInt(
      0,
      this.gameConfigService!.symbolTextures.length - 1
    );
    return this.gameConfigService?.symbolTextures[randInt];
  }
}
