import { BehaviorSubject, distinctUntilChanged, Observable } from "rxjs";
import { injectable, singleton } from "tsyringe";
import { container } from "tsyringe";
import { GamePhase, GamePhaseService } from "../services/gamePhase.service";

export enum CandyGamePhase {
  CrushCandies = "CrushCandies",
}

@singleton()
export class CandyCrushService {
  constructor(gamePhaseService: GamePhaseService) {
    gamePhaseService.addCustomGamePhase(
      CandyGamePhase.CrushCandies,
      GamePhase.ReelSetStopped
    );
  }
}
