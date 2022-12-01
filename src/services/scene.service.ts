import { Scene } from "phaser";
import { Singleton } from "../../packages/core/singleton";

export class SceneService {
  private static _instance: SceneService;

  currentScene!: Scene;

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  setCurrentScene(currentScene: Scene) {
    this.currentScene = currentScene;
  }
}
