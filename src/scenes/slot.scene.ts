import { GameObjects, Scene } from "phaser";
import { SceneService } from "../services/scene.service";
import { autoInjectable, instanceCachingFactory } from "tsyringe";
import { MathUtils } from "../utils/math-utils";
import { ReelSetContainer } from "../container/reelSet.container";
import { GamePhase, GamePhaseService } from "../services/gamePhase.service";
import { NetworkService } from "../services/network.service";
import { CandyCrushService } from "../gameSpecific/candyCrush.service";

@autoInjectable()
export class SlotScene extends Scene {
  reelSet!: ReelSetContainer;

  spaceKey!: Phaser.Input.Keyboard.Key;

  public constructor(
    public sceneService: SceneService,
    public gamePhaseService: GamePhaseService,
    public networkService: NetworkService,
    public candyCrushService: CandyCrushService
  ) {
    super("slot-scene");
  }

  preload(): void {
    this.sceneService.setCurrentScene(this);
    this.gamePhaseService.endGamePhase(GamePhase.Loading);
  }

  create(): void {
    console.log("slot scene");
    this.reelSet = new ReelSetContainer();

    // this.cameras.main.setZoom(1.3);
    // this.cameras.main.scrollY = -15;

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

    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    // .on("down", () => {
    //   this.spin();
    // });
  }

  update(time: number, delta: number): void {
    if (this.spaceKey.isDown) {
      this.spin();
    }
  }

  async spin() {
    this.reelSet.spinReels();
  }
}
