import { BehaviorSubject, distinctUntilChanged, Observable } from "rxjs";
import { injectable, singleton } from "tsyringe";
import { container } from "tsyringe";

export enum GamePhase {
  Loading = "Loading",
  Idle = "Idle",
  ReelSpinning = "ReelSpinning",
  ReelStopping = "ReelStopping",
  ReelStopped = "ReelStopped",
  LinePinging = "LinePinging",
  WinParty = "WinParty",
}

@singleton()
export class GamePhaseService {
  private _currentPhase = new BehaviorSubject(GamePhase.Loading);

  constructor() {
    this._currentPhase.pipe(distinctUntilChanged()).subscribe((p) => {
      console.log("GamePhase: ", p);
    });
  }

  setGamePhase(phase: GamePhase) {
    this._currentPhase.next(phase);
  }

  get currentPhase$() {
    return this._currentPhase.pipe(distinctUntilChanged());
  }

  get currentPhase() {
    return this._currentPhase.value;
  }
}
