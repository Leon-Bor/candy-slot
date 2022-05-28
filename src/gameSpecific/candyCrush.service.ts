import { BehaviorSubject, distinctUntilChanged, Observable } from "rxjs";
import { injectable, singleton } from "tsyringe";
import { container } from "tsyringe";
import { GamePhase, GamePhaseService } from "../services/gamePhase.service";
import { ReelSetService } from "../services/reelSet.service";

export enum CandyGamePhase {
  CrushCandies = "CrushCandies",
}

@singleton()
export class CandyCrushService {
  constructor(
    public gamePhaseService: GamePhaseService,
    public reelSetService: ReelSetService
  ) {
    gamePhaseService.addCustomGamePhase(
      CandyGamePhase.CrushCandies,
      GamePhase.ReelSetStopped
    );

    gamePhaseService.currentPhase$.subscribe((currentPhase) => {
      if (currentPhase == CandyGamePhase.CrushCandies) {
        console.log("Time to crash");
      }
    });
  }

  findCandyBlock() {
    const candyFace = this.reelSetService.slotFace$.value;
  }
}
