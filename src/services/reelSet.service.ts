import { BehaviorSubject, filter, skip, Subject } from "rxjs";
import { injectable, singleton } from "tsyringe";
import { container } from "tsyringe";
import { GameConfig } from "../GameConfig";
import { GamePhase, GamePhaseService } from "./gamePhase.service";

@singleton()
export class ReelSetService {
  removeSymbol$ = new Subject();
  spinComplete$ = new BehaviorSubject(undefined);

  constructor(gamePhaseService: GamePhaseService) {
    this.spinComplete$
      .pipe(filter((_, i) => i % GameConfig.reels.length === 0))
      .subscribe(() => {
        console.log("spin complete");
        gamePhaseService.setGamePhase(GamePhase.Idle);
      });
  }

  removeLastSymbolFromReel(reelId: number) {
    this.removeSymbol$.next(reelId);
  }

  onReelComplete() {
    this.spinComplete$.next(undefined);
  }
}
