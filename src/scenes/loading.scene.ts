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
    this.load.image("0", "sprites/king.png");
    this.load.image("1", "sprites/1.png");
    this.load.image("2", "sprites/2.png");
    this.load.image("3", "sprites/3.png");
    this.load.image("4", "sprites/4.png");
    this.load.image("5", "sprites/5.png");
    this.load.image("6", "sprites/6.png");
    this.load.image("7", "sprites/7.png");

    this.load.audio("reelStop", "sounds/reel-spin-end.mp3");
    this.load.audio("reelStop2", "sounds/s_s3_reelstop1.wav");
  }
}
