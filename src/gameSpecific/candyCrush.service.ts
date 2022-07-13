import { BehaviorSubject, distinctUntilChanged, Observable } from "rxjs";
import { injectable, singleton } from "tsyringe";
import { container } from "tsyringe";
import { GamePhase, GamePhaseService } from "../services/gamePhase.service";
import { ReelSetService } from "../services/reelSet.service";
import { SymbolService } from "../services/symbol.service";

export enum CandyGamePhase {
  CrushCandies = "CrushCandies",
}

export interface CandyPosition {
  x: number;
  y: number;
  // weather the block has checked it surroundings or not
  checked: boolean;
}

@singleton()
export class CandyCrushService {
  constructor(
    public gamePhaseService: GamePhaseService,
    public reelSetService: ReelSetService,
    public symbolService: SymbolService
  ) {
    gamePhaseService.addCustomGamePhase(
      CandyGamePhase.CrushCandies,
      GamePhase.ReelSetStopped
    );

    gamePhaseService.currentPhase$.subscribe((currentPhase) => {
      if (currentPhase == CandyGamePhase.CrushCandies) {
        console.log("Time to crash");
        const candyFace = this.reelSetService.slotFace$.value;

        candyFace.map((x, xi) => {
          x.map((y, yi) => {
            const block = this.findCandyBlock(
              { x: xi, y: yi, checked: false },
              [],
              undefined
            );
            if (block.length >= 4) {
              console.log("block", block);
              block.map(({ x, y }) => {
                this.symbolService.paintSymbol(x, y);
              });
            }
          });
        });

        gamePhaseService.endGamePhase(CandyGamePhase.CrushCandies);
      }
    });
  }

  findCandyBlock(
    currentPosition: CandyPosition = { x: 0, y: 0, checked: false },
    candyBlock: CandyPosition[] = [],
    candyType: string | undefined
  ): CandyPosition[] {
    const candyFace = this.reelSetService.slotFace$.value;

    candyType = candyType ?? candyFace[currentPosition.x][currentPosition.y];

    currentPosition.checked = true;
    candyBlock.push(currentPosition);

    candyBlock = [
      ...candyBlock,
      ...this.findSurroundingCandies(currentPosition, candyType),
    ];

    candyBlock.map((block) => {
      if (block.checked == false) {
        candyBlock = [
          ...candyBlock,
          ...this.findSurroundingCandies(block, candyType as string),
        ];
      }
    });

    return candyBlock;
  }

  findSurroundingCandies(currentPosition: CandyPosition, candyType: string) {
    const candyFace = this.reelSetService.slotFace$.value;
    const surroundingSameBlocks: CandyPosition[] = [];

    const top = candyFace?.[currentPosition.x]?.[currentPosition.y - 1];
    const bottom = candyFace?.[currentPosition.x]?.[currentPosition.y + 1];
    const left = candyFace?.[currentPosition.x - 1]?.[currentPosition.y];
    const right = candyFace?.[currentPosition.x + 1]?.[currentPosition.y];

    if (top && top === candyType) {
      surroundingSameBlocks.push({
        x: currentPosition.x,
        y: currentPosition.y - 1,
        checked: false,
      });
    }
    if (bottom && bottom === candyType) {
      surroundingSameBlocks.push({
        x: currentPosition.x,
        y: currentPosition.y + 1,
        checked: false,
      });
    }
    if (left && left === candyType) {
      surroundingSameBlocks.push({
        x: currentPosition.x - 1,
        y: currentPosition.y,
        checked: false,
      });
    }
    if (right && right === candyType) {
      surroundingSameBlocks.push({
        x: currentPosition.x + 1,
        y: currentPosition.y,
        checked: false,
      });
    }

    return surroundingSameBlocks;
  }
}
