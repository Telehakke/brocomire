import { createIsLandscape, type IsLandscapeSetter } from "../../application/appState/isLandscape";

export class LandscapeMonitor {
  private readonly isLandscapeSetter: IsLandscapeSetter;
  private readonly mediaQuery: MediaQueryList;

  constructor(isLandscapeSetter: IsLandscapeSetter) {
    this.isLandscapeSetter = isLandscapeSetter;
    this.mediaQuery = window.matchMedia("(orientation: landscape)");
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
    this.isLandscapeSetter(createIsLandscape(ev.matches));
  };

  /** デバイス方向を更新*/
  update(): void {
    this.isLandscapeSetter(createIsLandscape(this.mediaQuery.matches));
  }
}
