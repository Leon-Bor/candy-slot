import { BehaviorSubject, distinctUntilChanged } from "rxjs";
import { singleton } from "tsyringe";

export enum GamePhase {
  Loading = "Loading",
  Idle = "Idle",
  FetchSpinData = "FetchSpinData",
  ReelSetSpinning = "ReelSetSpinning",
  ReelSetStopping = "ReelSetStopping",
  ReelSetStopped = "ReelSetStopped",
  // LinePinging = "LinePinging",
  // WinParty = "WinParty",
}

@singleton()
export class GamePhaseService {
  private _currentPhase$ = new BehaviorSubject<GamePhase | string>(
    GamePhase.Loading
  );
  private _featureActive$ = new BehaviorSubject(false);
  private _availablePhases = [...Object.keys(GamePhase)];

  constructor() {
    this._currentPhase$.pipe(distinctUntilChanged()).subscribe((p) => {
      console.log("GamePhase: ", p);
    });
  }

  endGamePhase(phase: GamePhase | string) {
    if (this._currentPhase$.value == phase) {
      const gamePhaseIndex = this._availablePhases.findIndex((p) => p == phase);

      const nextPhase = this._availablePhases?.[gamePhaseIndex + 1];
      if (nextPhase) {
        this._currentPhase$.next(nextPhase);
      } else {
        this._currentPhase$.next(GamePhase.Idle);
      }
    }
  }

  addCustomGamePhase(
    gamePhase: string,
    gamePhasePositionAfter: GamePhase | string
  ) {
    const gamePhaseIndex = this._availablePhases.findIndex(
      (p) => p == gamePhasePositionAfter
    );
    this._availablePhases.splice(gamePhaseIndex + 1, 0, gamePhase);
    console.log(this._availablePhases);
  }
  get currentPhase$() {
    return this._currentPhase$.pipe(distinctUntilChanged());
  }

  get currentPhase() {
    return this._currentPhase$.value;
  }
}
