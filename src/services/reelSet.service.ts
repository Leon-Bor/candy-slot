import { Subject } from "rxjs";
import { injectable, singleton } from "tsyringe";
import { container } from "tsyringe";

@singleton()
export class ReelSetService {
  removeSymbol$ = new Subject();

  constructor() {}

  removeLastSymbolFromReel(reelId: number) {
    this.removeSymbol$.next(reelId);
  }
}
