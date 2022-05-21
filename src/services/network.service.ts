import { BehaviorSubject, Observable } from "rxjs";
import { injectable, singleton } from "tsyringe";
import { container } from "tsyringe";
import { GameConfig } from "../GameConfig";
import { MathUtils } from "../utils/math-utils";
import { GamePhase } from "./gamePhase.service";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@singleton()
export class NetworkService {
  spinData!: string[][];

  spinningTime: number = new Date().getTime();

  constructor() {}

  async fetch() {
    await delay(MathUtils.getRandomInt(50, 100));
    this.spinData = GameConfig.reels.map((reel, i) => {
      const maxNumbersOfSymbols = Math.max(
        ...GameConfig.reels.map((r) => r.symbols.length)
      );

      const reelData = new Array(maxNumbersOfSymbols).fill(0).map(() => {
        return this.getRandomSymbol();
      });
      // one more on top
      reelData.push(this.getRandomSymbol());

      return reelData;
    });
    this.spinningTime = new Date().getTime();
  }

  getNextSymbol(reelId: number) {
    const reelStopDelay = reelId * GameConfig.timeBetweenReelStops;
    if (
      new Date().getTime() - this.spinningTime - reelStopDelay >
      GameConfig.spinDuration
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
    return MathUtils.getRandomInt(1, 7).toString();
  }
}
