import { BehaviorSubject, filter, Subject } from "rxjs";
import { Singleton } from "../../packages/core/singleton";
import { GameConfigService } from "./gameConfig.service";
import { GamePhase, GamePhaseService } from "./gamePhase.service";

export class ReelSetService {
  private static _instance: ReelSetService;

  removeSymbol$ = new Subject<{ reelId: number; lastIndex?: number }>();
  spinComplete$ = new BehaviorSubject(undefined);
  slotFace$ = new BehaviorSubject<string[][]>([]);

  gamePhaseService = GamePhaseService.Instance;
  gameConfigService = GameConfigService.Instance;

  constructor() {
    this.spinComplete$
      .pipe(filter((_, i) => i % this.gameConfigService.reels.length === 0))
      .subscribe(() => {
        this.gamePhaseService.endGamePhase(GamePhase.ReelSetStopped); // Now Idle or any feature
      });
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  onReelComplete() {
    this.spinComplete$.next(undefined);
  }

  paintSymbol(reelId: number, symbolIndex: number) {}
}
