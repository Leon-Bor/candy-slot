import { BehaviorSubject } from "rxjs";
import { Singleton } from "../../packages/core/singleton";
import {
  GameConfig1,
  GameConfig2,
  GameConfig3,
  GameConfig4,
  GameConfig5,
  GameConfig6,
} from "../game.config";

export class GameConfigService {
  private static _instance: GameConfigService;
  private _currentConfig = new BehaviorSubject(GameConfig6);

  constructor() {
    const params = new URLSearchParams(location.search);
    const configs = [
      GameConfig1,
      GameConfig2,
      GameConfig3,
      GameConfig4,
      GameConfig5,
      GameConfig6,
    ];

    if (configs[parseInt(params.get("config") || "&")]) {
      this._currentConfig.next(configs[parseInt(params.get("config") || "6")]);
    }
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

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
