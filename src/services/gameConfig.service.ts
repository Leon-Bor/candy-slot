import { BehaviorSubject } from "rxjs";
import { singleton } from "tsyringe";
import { GameConfig1, GameConfig5, GameConfig6 } from "../game.config";

@singleton()
export class GameConfigService {
  private _currentConfig = new BehaviorSubject(GameConfig6);

  constructor() {}

  get config() {
    return this._currentConfig.value;
  }

  get gameType() {
    return this._currentConfig.value.gameType;
  }

  get timeBetweenReelStops() {
    return this._currentConfig.value.timeBetweenReelStops;
  }

  get symbolSize() {
    return this._currentConfig.value.symbolSize;
  }

  get reels() {
    return this._currentConfig.value.reels;
  }

  get spinSpeed() {
    return this._currentConfig.value.spinSpeed;
  }

  get spinDuration() {
    return this._currentConfig.value.spinDuration;
  }

  get symbolTextures() {
    return this._currentConfig.value.symbolTextures;
  }

  get symbolFallDelay() {
    return this._currentConfig.value.symbolFallDelay;
  }
}
