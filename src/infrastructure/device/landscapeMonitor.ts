import { createIsLandscape, type IsLandscapeStore } from "../../application/appState/isLandscape";

export class LandscapeMonitor {
  private readonly isLandscapeStore: IsLandscapeStore;
  private readonly mediaQuery: MediaQueryList;

  constructor(isLandscapeStore: IsLandscapeStore) {
    this.isLandscapeStore = isLandscapeStore;
    this.mediaQuery = window.matchMedia("(orientation: landscape)");
  }

  /** デバイス方向を一度だけ確認 */
  runOnce(): void {
    this.isLandscapeStore.set(createIsLandscape(this.mediaQuery.matches));
  }

  /** デバイス方向の監視を開始 */
  start(): void {
    this.mediaQuery.addEventListener("change", this.handleChange);
  }

  /** デバイス方向の監視を終了 */
  end(): void {
    this.mediaQuery.removeEventListener("change", this.handleChange);
  }

  private handleChange = (ev: MediaQueryListEvent): void => {
    this.isLandscapeStore.set(createIsLandscape(ev.matches));
  };
}
