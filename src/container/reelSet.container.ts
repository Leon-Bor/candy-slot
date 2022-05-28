import { GameObjects } from "phaser";
import { autoInjectable } from "tsyringe";
import { GameConfigService } from "../services/gameConfig.service";
import { GamePhase, GamePhaseService } from "../services/gamePhase.service";
import { NetworkService } from "../services/network.service";
import { ReelSetService } from "../services/reelSet.service";
import { SceneService } from "../services/scene.service";
import { ReelContainer } from "./reel.container";

@autoInjectable()
export class ReelSetContainer extends GameObjects.Container {
  reels: ReelContainer[] = [];

  public constructor(
    sceneService?: SceneService,
    public gamePhaseService?: GamePhaseService,
    public networkService?: NetworkService,
    gameConfigService?: GameConfigService,
    reelSetService?: ReelSetService
  ) {
    super(sceneService!.currentScene, 0, 0);

    gameConfigService?.reels.map((reelConfig, i) => {
      const reel = new ReelContainer(i, reelConfig);
      this.reels.push(reel);
      this.add(reel);
    });

    gamePhaseService?.currentPhase$.subscribe((currentPhase) => {
      if (currentPhase == GamePhase.ReelSetStopping) {
        reelSetService?.slotFace$.next(this.getSlotFace());
      }
    });

    this.scene.add.existing(this);
  }

  getSlotFace() {
    return this.reels.map((reel) => {
      return reel.symbols.map((s) => s.symbol.texture.key);
    });
  }

  async spinReels() {
    if (this.gamePhaseService?.currentPhase == GamePhase.Idle) {
      this.gamePhaseService?.endGamePhase(GamePhase.Idle);
      await this.networkService?.fetch();
      this.gamePhaseService?.endGamePhase(GamePhase.FetchSpinData);
      this.reels.map((reel) => {
        reel.moveSymbolsDown();
      });
    }
  }
}
