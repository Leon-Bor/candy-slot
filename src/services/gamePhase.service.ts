import { BehaviorSubject, distinctUntilChanged, Observable } from "rxjs";
import { injectable, singleton } from "tsyringe";
import { container } from "tsyringe";

export enum GamePhase {
  Loading = "Loading",
  Idle = "Idle",
  ReelSpinning = "ReelSpinning",
  ReelStopping = "ReelStopping",
  ReelStopped = "ReelStopped",
  // LinePinging = "LinePinging",
  // WinParty = "WinParty",
}

@singleton()
export class GamePhaseService {
  private _currentPhase = new BehaviorSubject(GamePhase.Loading);
  private _availablePhases = [...Object.keys(GamePhase)];

  constructor() {
    this._currentPhase.pipe(distinctUntilChanged()).subscribe((p) => {
      console.log("GamePhase: ", p);
    });
  }

  setGamePhase(phase: GamePhase) {
    const currentGamePhaseIndex = this._availablePhases.findIndex(
      (p) => p == this._currentPhase.value
    );

    if (this._availablePhases[currentGamePhaseIndex + 1] === phase) {
      this._currentPhase.next(phase);
    }

    if (
      this._currentPhase.value ===
        this._availablePhases[this._availablePhases.length - 1] &&
      phase === GamePhase.Idle
    ) {
      this._currentPhase.next(GamePhase.Idle);
    }
  }

  addCustomGamePhase(
    gamePhase: string,
    gamePhasePositionAfter: GamePhase | string
  ) {
    const gamePhaseIndex = this._availablePhases.findIndex(
      (p) => p == gamePhasePositionAfter
    );
    this._availablePhases.splice(gamePhaseIndex, 0, gamePhase);
    console.log(this._availablePhases);
  }
  get currentPhase$() {
    return this._currentPhase.pipe(distinctUntilChanged());
  }

  get currentPhase() {
    return this._currentPhase.value;
  }
}
