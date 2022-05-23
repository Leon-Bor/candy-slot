import { BehaviorSubject, skip } from "rxjs";
import { autoInjectable, inject } from "tsyringe";
import { GameConfig, GameType } from "../GameConfig";
import { ReelSetService } from "../services/reelSet.service";
import { SceneService } from "../services/scene.service";

@autoInjectable()
export class SymbolContainer extends Phaser.GameObjects.Container {
  reelId: number = 0;
  reelHeight: number = 0;
  symbol!: Phaser.GameObjects.Image;

  symbolArriveSound = this.scene.sound.add("reelStop", { volume: 0.2 });

  public constructor(
    reelId: number,
    reelHeight: number,
    texture: string,
    sceneService?: SceneService,
    public reelSetService?: ReelSetService
  ) {
    super(sceneService!.currentScene, 0, 0);
    this.reelId = reelId;
    this.reelHeight = reelHeight;

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

  moveSymbolDown({
    stopIndex,
    delay,
  }: { stopIndex?: number; delay?: number } = {}) {
    return new Promise((res) => {
      const symbolSlotsInReel = this.reelHeight / GameConfig.symbolSize.height;

      const currentIndex = this.y / GameConfig.symbolSize.height;

      const stopPosition =
        typeof stopIndex == "number"
          ? stopIndex * GameConfig.symbolSize.height
          : this.reelHeight;

      const spinSpeed =
        typeof stopIndex == "number"
          ? GameConfig.spinSpeed * (stopIndex + 1)
          : GameConfig.spinSpeed * (symbolSlotsInReel - currentIndex);

      this.scene.add.tween({
        targets: this,
        duration: spinSpeed,
        y: stopPosition,
        ease: "Linear",
        delay: delay ?? 0,
        onComplete: async () => {
          // candy crush specific
          if (
            this.y < this.reelHeight &&
            GameConfig.gameType == GameType.CandyCrush
          ) {
            this.symbolArriveSound.play();
            await this.wabble();
          }

          // remove out of screen symbol
          if (this.y >= this.reelHeight) {
            this.reelSetService?.removeSymbol$.next({
              reelId: this.reelId,
              lastIndex: currentIndex,
            });
          }
          res(undefined);
        },
      });
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

  wabble() {
    return new Promise((res) => {
      var timeline = this.scene.tweens.createTimeline();

      const wabbleTime = 120;

      timeline.add({
        targets: this.symbol,
        duration: wabbleTime,
        ease: Phaser.Math.Easing.Bounce,
        yoyo: true,
        scaleY: this.symbol.scaleY - 0.1,
        scaleX: this.symbol.scaleX - 0.1,
        y: this.symbol.y + 5,
        x: this.symbol.x + 5,
      });

      timeline.add({
        targets: this.symbol,
        duration: wabbleTime,
        ease: Phaser.Math.Easing.Bounce,
        yoyo: true,
        scaleY: this.symbol.scaleY - 0.05,
        scaleX: this.symbol.scaleX - 0.05,
        y: this.symbol.y + 2.5,
        x: this.symbol.x + 2.5,
        onComplete: () => {
          res(undefined);
        },
      });

      timeline.play();
    });
  }
}
