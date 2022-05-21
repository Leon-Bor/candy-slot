import { Scene } from "phaser";
import { singleton } from "tsyringe";

@singleton()
export class SceneService {
  currentScene!: Scene;

  setCurrentScene(currentScene: Scene) {
    this.currentScene = currentScene;
  }
}
