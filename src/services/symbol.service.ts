import { Subject } from "rxjs";

export class SymbolService {
  private static _instance: SymbolService;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  onSymbolPaint$ = new Subject<{
    reelId: number;
    symbolIndex: number;
    color: string;
  }>();

  paintSymbol(reelId: number, symbolIndex: number) {
    this.onSymbolPaint$.next({
      reelId,
      symbolIndex,
      color: "red",
    });
  }
}
