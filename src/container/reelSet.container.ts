import { autoInjectable } from "tsyringe";
import { MathUtils } from "../utils/math-utils";
import { GameObjects, Scene } from "phaser";
import { SceneService } from "../services/scene.service";
import { ReelContainer } from "./reel.container";
import { GameConfig } from "../GameConfig";
import { GamePhase, GamePhaseService } from "../services/gamePhase.service";
import { NetworkService } from "../services/network.service";

@autoInjectable()
export class ReelSetContainer extends GameObjects.Container {
  reels: ReelContainer[] = [];

  public constructor(
    sceneService?: SceneService,
    public gamePhaseService?: GamePhaseService,
    public networkService?: NetworkService
  ) {
    super(sceneService!.currentScene, 0, 0);

    GameConfig.reels.map((reelConfig, i) => {
      const reel = new ReelContainer(i, reelConfig);
      this.reels.push(reel);
      this.add(reel);
    });

    this.scene.add.existing(this);
  }

  async spinReels() {
    if (this.gamePhaseService?.currentPhase == GamePhase.Idle) {
      this.gamePhaseService?.setGamePhase(GamePhase.ReelSpinning);
      await this.networkService?.fetch();
      this.reels.map((reel) => {
        reel.moveSymbolsDown();
      });
    }
  }
}
