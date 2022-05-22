import { Game, GameObjects } from "phaser";
import { filter } from "rxjs";
import { autoInjectable } from "tsyringe";
import { GameConfig, GameType, IGameConfigReel } from "../GameConfig";
import { GamePhase, GamePhaseService } from "../services/gamePhase.service";
import { NetworkService } from "../services/network.service";
import { ReelSetService } from "../services/reelSet.service";
import { SceneService } from "../services/scene.service";
import { SymbolContainer } from "./symbol.container";

@autoInjectable()
export class ReelContainer extends GameObjects.Container {
  reelId: number = 0;
  symbols: SymbolContainer[] = [];

  reelHeight: number = 0;
  reelConfig!: IGameConfigReel;
  reelStopSound = this.scene.sound.add("reelStop");

  public constructor(
    id: number,
    reelConfig: IGameConfigReel,
    sceneService?: SceneService,
    public reelSetService?: ReelSetService,
    public gamePhaseService?: GamePhaseService,
    public networkService?: NetworkService
  ) {
    super(sceneService!.currentScene, 0, 0);
    this.reelId = id;
    this.reelConfig = reelConfig;
    this.reelHeight =
      this.reelConfig.symbols.length * GameConfig.symbolSize.height;

    // Set reel on position
    this.x = this.reelConfig.position.x;
    this.y = this.reelConfig.position.y;

    // destroy symbol when reached out of screen
    reelSetService?.removeSymbol$
      .pipe(filter(({ reelId }) => reelId == this.reelId))
      .subscribe(async ({ reelId, lastIndex }) => {
        // remove out of screen symbol
        this.symbols.pop()?.destroy();

        // add a new one on top
        const nextSymbol = networkService?.getNextSymbol(this.reelId);
        const symbolsLeft = networkService?.symbolsLeft(this.reelId) ?? 0;

        if (nextSymbol) {
          const symbol = this.createSymbol(nextSymbol, -1);

          if (GameConfig.gameType == GameType.Slot) {
            if (networkService?.hasNextSymbol(this.reelId)) {
              if (symbolsLeft <= this.reelConfig.symbols.length) {
                // last symbol needs to stay on top
                if (symbolsLeft !== 0) {
                  symbol.moveSymbolDown({ stopIndex: symbolsLeft - 1 });
                }
              } else {
                symbol.moveSymbolDown({});
              }
            } else {
              // no more symbols coming, do the bounce
              this.onSpinStopping();
            }
          }

          if (GameConfig.gameType == GameType.CandyCrush) {
            await symbol.moveSymbolDown({
              stopIndex: symbolsLeft,
              delay:
                GameConfig.timeBetweenReelStops * this.reelId +
                (this.reelConfig.symbols.length - symbolsLeft) *
                  GameConfig!.symbolFallDelay,
            });

            // send stop when no next symbol and top symbol has arrived
            if (
              networkService?.hasNextSymbol(this.reelId) == false &&
              lastIndex == 0
            ) {
              // no more symbols coming, do the bounce
              this.onSpinStopping();
            }
          }
        }
      });

    // init slot with symbols
    this.createSymbols();

    // add symbol row above
    if (GameConfig.gameType == GameType.Slot) {
      this.createSymbol(networkService!.getRandomSymbol(), -1);
    }

    this.createMask();
  }

  private createSymbols() {
    this.reelConfig.symbols.map((_, i) => {
      this.createSymbol(this.networkService!.getRandomSymbol(), i);
    });
  }

  createSymbol(texture: string, startPositionY: number) {
    const symbol = new SymbolContainer(this.reelId, this.reelHeight, texture);
    symbol.y = GameConfig.symbolSize.height * startPositionY;
    if (startPositionY >= 0) {
      this.symbols.push(symbol);
    } else {
      this.symbols.unshift(symbol);
    }
    this.add(symbol);
    return symbol;
  }

  moveSymbolsDown() {
    this.symbols.map((symbol) => {
      symbol.moveSymbolDown();
    });
  }

  private createMask() {
    const shape = this.scene.make.graphics({});

    //  Create a hash shape Graphics object
    shape.fillStyle(0xffffff);

    //  You have to begin a path for a Geometry mask to work
    shape.beginPath();

    shape.fillRect(
      this.reelConfig.position.x,
      this.y,
      GameConfig.symbolSize.width,
      GameConfig.symbolSize.height * this.reelConfig.symbols.length
    );

    this.mask = shape.createGeometryMask();
  }

  async onSpinStopping() {
    this.gamePhaseService?.setGamePhase(GamePhase.ReelStopping);
    if (GameConfig.gameType == GameType.Slot) {
      this.reelStopSound.play();
      await this.bounceReel();
    }
    this.reelSetService?.onReelComplete();
  }

  async bounceReel() {
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
