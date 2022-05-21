import { autoInjectable } from "tsyringe";
import { MathUtils } from "../utils/math-utils";
import { GameObjects, Scene } from "phaser";
import { SceneService } from "../services/scene.service";
import { ReelContainer } from "./reel.container";
import { GameConfig } from "../GameConfig";
import { GamePhase, GamePhaseService } from "../services/gamePhase.service";

@autoInjectable()
export class ReelSetContainer extends GameObjects.Container {
  reels: ReelContainer[] = [];

  public constructor(
    sceneService?: SceneService,
    public gamePhaseService?: GamePhaseService
  ) {
    super(sceneService!.currentScene, 0, 0);

    GameConfig.reels.map((reelConfig, i) => {
      const reel = new ReelContainer(i, reelConfig);
      this.reels.push(reel);
      this.add(reel);
    });

    this.scene.add.existing(this);
  }

  spinReels() {
    this.gamePhaseService?.setGamePhase(GamePhase.ReelSpinning);
    this.reels.map((reel) => {
      reel.moveSymbolsDown();
    });
  }
}
