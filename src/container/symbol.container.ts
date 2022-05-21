import { autoInjectable, inject } from "tsyringe";
import { GameConfig } from "../GameConfig";
import { ReelSetService } from "../services/reelSet.service";
import { SceneService } from "../services/scene.service";

@autoInjectable()
export class SymbolContainer extends Phaser.GameObjects.Container {
  reelId: number = 0;
  symbol!: Phaser.GameObjects.Image;

  public constructor(
    reelId: number,
    texture: string,
    sceneService?: SceneService,
    public reelSetService?: ReelSetService
  ) {
    super(sceneService!.currentScene, 0, 0);
    this.reelId = reelId;

    this.symbol = this.scene.add.image(
      GameConfig.symbolSize.width / 2,
      GameConfig.symbolSize.height / 2,
      texture
    );
    this.symbol.setOrigin(0.5, 0.5);

    this.add(this.symbol);

    this.width = GameConfig.symbolSize.width;
    this.height = GameConfig.symbolSize.height;
  }

  moveSymbolDown(reelHeight: number, stopIndex?: number) {
    const symbolSlotsInReel = reelHeight / GameConfig.symbolSize.height;

    const currentIndex = this.y / GameConfig.symbolSize.height;

    const stopPosition =
      typeof stopIndex == "number"
        ? stopIndex * GameConfig.symbolSize.height
        : reelHeight;

    const spinSpeed =
      typeof stopIndex == "number"
        ? GameConfig.spinSpeed * (stopIndex + 1)
        : GameConfig.spinSpeed * (symbolSlotsInReel - currentIndex);

    this.scene.add.tween({
      targets: this,
      duration: spinSpeed,
      y: stopPosition,
      ease: "Linear",
      onComplete: () => {
        if (this.y >= reelHeight) {
          this.reelSetService?.removeSymbol$.next(this.reelId);
        }
      },
    });
  }

  bounce() {
    return new Promise((res) => {
      this.scene.add.tween({
        targets: this,
        duration: 266 / 2,
        delay: 10,
        ease: Phaser.Math.Easing.Quadratic.Out,
        y: this.y + 30,
        yoyo: true,
        onComplete: () => {
          res(undefined);
        },
      });
    });
  }
}
