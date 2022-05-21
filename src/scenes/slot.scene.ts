import { GameObjects, Scene } from "phaser";
import { SceneService } from "../services/scene.service";
import { autoInjectable, instanceCachingFactory } from "tsyringe";
import { MathUtils } from "../utils/math-utils";
import { ReelSetContainer } from "../container/reelSet.container";
import { GamePhase, GamePhaseService } from "../services/gamePhase.service";
import { NetworkService } from "../services/network.service";

@autoInjectable()
export class SlotScene extends Scene {
  reelSet!: ReelSetContainer;

  public constructor(
    public sceneService: SceneService,
    public gamePhaseService: GamePhaseService,
    public networkService: NetworkService
  ) {
    super("slot-scene");
  }

  preload(): void {
    this.sceneService.setCurrentScene(this);
    this.gamePhaseService.setGamePhase(GamePhase.Idle);
  }

  create(): void {
    console.log("slot scene");
    this.reelSet = new ReelSetContainer();

    // const container = this.add.container(200, 200);
    // container.add(this.add.sprite(100, 100, "2"));
    // container.x = -50;

    this.input.on(
      Phaser.Input.Events.POINTER_DOWN,
      () => {
        this.spin();
      },
      this
    );

    this.input.keyboard
      .addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
      .on("down", () => {
        this.spin();
      });
  }

  update(time: number, delta: number): void {}

  async spin() {
    if (this.gamePhaseService.currentPhase == GamePhase.Idle) {
      await this.networkService.fetch();
      this.reelSet.spinReels();
    }
  }
}
