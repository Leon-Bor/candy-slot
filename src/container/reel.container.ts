import { Game, GameObjects } from "phaser";
import { filter } from "rxjs";
import { autoInjectable } from "tsyringe";
import { GameConfig, IGameConfigReel } from "../GameConfig";
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
    reelSetService?: ReelSetService,
    public gamePhaseService?: GamePhaseService,
    networkService?: NetworkService
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
      .pipe(filter((reelId) => reelId == this.reelId))
      .subscribe((reelId) => {
        console.log(reelId, this.reelId);
        this.symbols.pop()?.destroy();

        // add a new one on top
        const nextSymbol = networkService?.getNextSymbol(this.reelId);
        if (nextSymbol) {
          this.createSymbol(nextSymbol, -1);

          if (networkService?.hasNextSymbol(this.reelId)) {
            this.moveSymbolsDown();
          }

          if (networkService?.hasNextSymbol(this.reelId) == false) {
            this.onSpinStopping();
          }
        }
      });

    console.log("ReelContainer created");
    // init slot with symbols
    this.createSymbols();

    // add symbol row above
    this.createSymbol("1", -1);

    this.createMask();
  }

  private createSymbols() {
    this.reelConfig.symbols.map((_, i) => {
      this.createSymbol("1", i);
    });
  }

  createSymbol(texture: string, startPositionY: number) {
    const symbol = new SymbolContainer(this.reelId, texture);
    symbol.y = GameConfig.symbolSize.height * startPositionY;
    if (startPositionY >= 0) {
      this.symbols.push(symbol);
    } else {
      this.symbols.unshift(symbol);
    }
    this.add(symbol);
  }

  moveSymbolsDown() {
    this.symbols.map((symbol) => {
      symbol.moveSymbolDown(this.reelHeight);
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

  async bounceSymbols() {
    const bounces: Promise<unknown>[] = [];
    this.symbols.map((symbol) => {
      bounces.push(symbol.bounce());
    });
    return Promise.all(bounces);
  }

  async onSpinStopping() {
    this.gamePhaseService?.setGamePhase(GamePhase.ReelStopping);

    await this.bounceSymbols();
    this.reelStopSound.play();

    this.gamePhaseService?.setGamePhase(GamePhase.Idle);
  }
}
