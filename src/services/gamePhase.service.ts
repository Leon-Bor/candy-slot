import { BehaviorSubject, Observable } from "rxjs";
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

  constructor() {}

  setGamePhase(phase: GamePhase) {
    this._currentPhase.next(phase);
  }

  get currentPhase$() {
    return this._currentPhase;
  }

  get currentPhase() {
    return this._currentPhase.value;
  }
}
