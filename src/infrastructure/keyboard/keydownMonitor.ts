import type { IsOpenSideMenuGetter } from "../../application/appState/isOpenSideMenu";
import type {
  IsUserScrolledGetter,
  IsUserScrolledSetter,
} from "../../application/appState/isUserScrolled";
import { goToLeftPosition } from "../../application/viewer/goToLeftPosition";
import { goToRightPosition } from "../../application/viewer/goToRightPosition";
import { zoomIn } from "../../application/viewer/zoomIn";
import { zoomOut } from "../../application/viewer/zoomOut";
import type {
  FileNavigatorGetter,
  FileNavigatorSetter,
} from "../../domain/models/file/fileNavigator";
import type { NotificationSetter } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type {
  ZoomPercentageGetter,
  ZoomPercentageSetter,
} from "../../domain/models/zoom/zoomPercentage";

export class KeydownMonitor {
  private readonly fileNavigatorGetter: FileNavigatorGetter;
  private readonly fileNavigatorSetter: FileNavigatorSetter;
  private readonly isUserScrolledGetter: IsUserScrolledGetter;
  private readonly isUserScrolledSetter: IsUserScrolledSetter;
  private readonly isOpenSideMenuGetter: IsOpenSideMenuGetter;
  private readonly notificationSetter: NotificationSetter;
  private readonly scrollPercentage2D: ScrollPercentage2D;
  private readonly userSettingsGetter: UserSettingsGetter;
  private readonly viewerManager: ViewerManager;
  private readonly zoomPercentageGetter: ZoomPercentageGetter;
  private readonly zoomPercentageSetter: ZoomPercentageSetter;

  constructor(
    fileNavigatorGetter: FileNavigatorGetter,
    fileNavigatorSetter: FileNavigatorSetter,
    isUserScrolledGetter: IsUserScrolledGetter,
    isUserScrolledSetter: IsUserScrolledSetter,
    isOpenSideMenuGetter: IsOpenSideMenuGetter,
    notificationSetter: NotificationSetter,
    scrollPercentage2D: ScrollPercentage2D,
    userSettingsGetter: UserSettingsGetter,
    viewerManager: ViewerManager,
    zoomPercentageGetter: ZoomPercentageGetter,
    zoomPercentageSetter: ZoomPercentageSetter,
  ) {
    this.fileNavigatorGetter = fileNavigatorGetter;
    this.fileNavigatorSetter = fileNavigatorSetter;
    this.isUserScrolledGetter = isUserScrolledGetter;
    this.isUserScrolledSetter = isUserScrolledSetter;
    this.isOpenSideMenuGetter = isOpenSideMenuGetter;
    this.notificationSetter = notificationSetter;
    this.scrollPercentage2D = scrollPercentage2D;
    this.userSettingsGetter = userSettingsGetter;
    this.viewerManager = viewerManager;
    this.zoomPercentageGetter = zoomPercentageGetter;
    this.zoomPercentageSetter = zoomPercentageSetter;
  }

  /** キーダウンの監視を開始 */
  start(): void {
    document.body.addEventListener("keydown", this.handleKeyDown);
  }

  /** キーダウンの監視を終了 */
  end(): void {
    document.body.removeEventListener("keydown", this.handleKeyDown);
  }

  private handleKeyDown = (ev: KeyboardEvent): void => {
    if (this.isOpenSideMenuGetter()) return;
    this._handleKeyDown(
      ev,
      () =>
        goToLeftPosition(
          this.fileNavigatorGetter,
          this.fileNavigatorSetter,
          this.isUserScrolledGetter,
          this.isUserScrolledSetter,
          this.notificationSetter,
          this.scrollPercentage2D,
          this.userSettingsGetter,
          this.viewerManager,
        ),
      () =>
        goToRightPosition(
          this.fileNavigatorGetter,
          this.fileNavigatorSetter,
          this.isUserScrolledGetter,
          this.isUserScrolledSetter,
          this.notificationSetter,
          this.scrollPercentage2D,
          this.userSettingsGetter,
          this.viewerManager,
        ),
      () =>
        zoomIn(
          this.isUserScrolledGetter,
          this.isUserScrolledSetter,
          this.notificationSetter,
          this.scrollPercentage2D,
          this.userSettingsGetter,
          this.viewerManager,
          this.zoomPercentageGetter,
          this.zoomPercentageSetter,
        ),
      () =>
        zoomOut(
          this.isUserScrolledGetter,
          this.isUserScrolledSetter,
          this.notificationSetter,
          this.scrollPercentage2D,
          this.userSettingsGetter,
          this.viewerManager,
          this.zoomPercentageGetter,
          this.zoomPercentageSetter,
        ),
    );
  };

  private _handleKeyDown(
    ev: KeyboardEvent,
    arrowLeft: () => void,
    arrowRight: () => void,
    arrowUp: () => void,
    arrowDown: () => void,
  ): void {
    switch (ev.code) {
      case "ArrowLeft":
        ev.preventDefault(); // ブラウザのデフォルトの振る舞いを無効化
        arrowLeft();
        break;
      case "ArrowRight":
        ev.preventDefault();
        arrowRight();
        break;
      case "ArrowUp":
        ev.preventDefault();
        arrowUp();
        break;
      case "ArrowDown":
        ev.preventDefault();
        arrowDown();
        break;
    }
  }
}
