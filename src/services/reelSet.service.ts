import { BehaviorSubject, filter, Subject } from "rxjs";
import { singleton } from "tsyringe";
import { GameConfigService } from "./gameConfig.service";
import { GamePhase, GamePhaseService } from "./gamePhase.service";

@singleton()
export class ReelSetService {
  removeSymbol$ = new Subject<{ reelId: number; lastIndex?: number }>();
  spinComplete$ = new BehaviorSubject(undefined);

  constructor(
    gamePhaseService: GamePhaseService,
    gameConfigService: GameConfigService
  ) {
    this.spinComplete$
      .pipe(filter((_, i) => i % gameConfigService.reels.length === 0))
      .subscribe(() => {
        gamePhaseService.endGamePhase(GamePhase.ReelSetStopped); // Now Idle or any feature
      });
  }

  onReelComplete() {
    this.spinComplete$.next(undefined);
  }
}
