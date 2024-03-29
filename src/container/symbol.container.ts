import { GameType } from "../game.config";
import { GameConfigService } from "../services/gameConfig.service";
import { ReelSetService } from "../services/reelSet.service";
import { SceneService } from "../services/scene.service";
import { SymbolService } from "../services/symbol.service";

export class SymbolContainer extends Phaser.GameObjects.Container {
  reelId: number = 0;
  reelHeight: number = 0;
  symbol!: Phaser.GameObjects.Image;
  stopPosition: number = 0;

  symbolArriveSound = this.scene.sound.add("reelStop", { volume: 0.2 });

  sceneService = SceneService.Instance;
  reelSetService = ReelSetService.Instance;
  gameConfigService = GameConfigService.Instance;
  symbolService = SymbolService.Instance;

  public constructor(reelId: number, reelHeight: number, texture: string) {
    super(SceneService.Instance.currentScene, 0, 0);
    this.reelId = reelId;
    this.reelHeight = reelHeight;

    this.symbol = this.scene.add.image(
      this.gameConfigService!.symbolSize.width / 2,
      this.gameConfigService!.symbolSize.height / 2,
      texture
    );
    this.symbol.setOrigin(0.5, 0.5);

    this.add(this.symbol);

    this.width = this.gameConfigService!.symbolSize.width;
    this.height = this.gameConfigService!.symbolSize.height;

    this.symbolService?.onSymbolPaint$.subscribe(({ reelId, symbolIndex }) => {
      if (this.reelId == reelId && symbolIndex == this.stopPosition) {
        this.symbol.tint = 100;
      }
    });
  }

  moveSymbolDown({
    stopIndex,
    delay,
  }: { stopIndex?: number; delay?: number } = {}) {
    return new Promise((res) => {
      const symbolSlotsInReel =
        this.reelHeight / this.gameConfigService!.symbolSize.height;

      const currentIndex = this.y / this.gameConfigService!.symbolSize.height;

      const stopPosition =
        typeof stopIndex == "number"
          ? stopIndex * this.gameConfigService!.symbolSize.height
          : this.reelHeight;

      this.stopPosition = stopPosition;

      const spinSpeed =
        typeof stopIndex == "number"
          ? this.gameConfigService!.spinSpeed * (stopIndex + 1)
          : this.gameConfigService!.spinSpeed *
            (symbolSlotsInReel - currentIndex);

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
            this.gameConfigService!.gameType == GameType.CandyCrush
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
