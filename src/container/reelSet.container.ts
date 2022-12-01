import { GameObjects } from "phaser";
import { GameConfigService } from "../services/gameConfig.service";
import { GamePhase, GamePhaseService } from "../services/gamePhase.service";
import { NetworkService } from "../services/network.service";
import { ReelSetService } from "../services/reelSet.service";
import { SceneService } from "../services/scene.service";
import { ReelContainer } from "./reel.container";

export class ReelSetContainer extends GameObjects.Container {
  reels: ReelContainer[] = [];

  sceneService = SceneService.Instance;
  gamePhaseService = GamePhaseService.Instance;
  networkService = NetworkService.Instance;
  gameConfigService = GameConfigService.Instance;
  reelSetService = ReelSetService.Instance;

  public constructor() {
    super(SceneService.Instance.currentScene, 0, 0);

    this.gameConfigService?.reels.map((reelConfig, i) => {
      const reel = new ReelContainer(i, reelConfig);
      this.reels.push(reel);
      this.add(reel);
    });

    this.gamePhaseService?.currentPhase$.subscribe((currentPhase) => {
      if (currentPhase == GamePhase.ReelSetStopping) {
        this.reelSetService?.slotFace$.next(this.getSlotFace());
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
