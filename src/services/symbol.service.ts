import { BehaviorSubject, filter, Subject } from "rxjs";
import { singleton } from "tsyringe";
import { GameConfigService } from "./gameConfig.service";
import { GamePhase, GamePhaseService } from "./gamePhase.service";

@singleton()
export class SymbolService {
  onSymbolPaint$ = new Subject<{
    reelId: number;
    symbolIndex: number;
    color: string;
  }>();

  constructor() {}

  paintSymbol(reelId: number, symbolIndex: number) {
    this.onSymbolPaint$.next({
      reelId,
      symbolIndex,
      color: "red",
    });
  }
}
