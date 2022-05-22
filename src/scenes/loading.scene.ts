import { GameObjects, Scene } from "phaser";
import { SceneService } from "../services/scene.service";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class LoadingScene extends Scene {
  private king!: GameObjects.Sprite;

  constructor(public sceneService: SceneService) {
    super("loading-scene");
  }
  create(): void {
    this.scene.start("slot-scene");
  }
  preload(): void {
    this.sceneService.setCurrentScene(this);
    console.log("loading");
    this.load.baseURL = "assets/";

    new Array(8).fill(null).map((_, i) => {
      this.load.image(`${i}`, `sprites/${i}.png`);
    });

    new Array(8).fill(null).map((_, i) => {
      this.load.image(`candy-${i}`, `sprites/candy-${i}.png`);
    });

    this.load.audio("reelStop", "sounds/reel-spin-end.mp3");
  }
}
