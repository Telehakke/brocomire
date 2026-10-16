import type { IsOpenSideMenuStore } from "../../application/appState/isOpenSideMenu";
import type { IsUserScrolledStore } from "../../application/appState/isUserScrolled";
import { goToLeftPosition } from "../../application/viewer/goToLeftPosition";
import { goToRightPosition } from "../../application/viewer/goToRightPosition";
import { zoomIn } from "../../application/viewer/zoomIn";
import { zoomOut } from "../../application/viewer/zoomOut";
import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { ZoomPercentageStore } from "../../domain/models/zoom/zoomPercentage";

export class KeydownMonitor {
  private readonly fileNavigatorStore: FileNavigatorStore;
  private readonly isOpenSideMenuStore: IsOpenSideMenuStore;
  private readonly isUserScrolledStore: IsUserScrolledStore;
  private readonly notificationStore: NotificationStore;
  private readonly scrollPercentage2D: ScrollPercentage2D;
  private readonly userSettingsGetter: UserSettingsGetter;
  private readonly viewerManager: ViewerManager;
  private readonly zoomPercentageStore: ZoomPercentageStore;

  constructor(
    fileNavigationStore: FileNavigatorStore,
    isOpenSideMenuStore: IsOpenSideMenuStore,
    isUserScrolledStore: IsUserScrolledStore,
    notificationStore: NotificationStore,
    scrollPercentage2D: ScrollPercentage2D,
    userSettingsGetter: UserSettingsGetter,
    viewerManager: ViewerManager,
    zoomPercentageStore: ZoomPercentageStore,
  ) {
    this.fileNavigatorStore = fileNavigationStore;
    this.isOpenSideMenuStore = isOpenSideMenuStore;
    this.isUserScrolledStore = isUserScrolledStore;
    this.notificationStore = notificationStore;
    this.scrollPercentage2D = scrollPercentage2D;
    this.userSettingsGetter = userSettingsGetter;
    this.viewerManager = viewerManager;
    this.zoomPercentageStore = zoomPercentageStore;
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
    if (this.isOpenSideMenuStore.get()) return;
    this._handleKeyDown(
      ev,
      () =>
        goToLeftPosition({
          fileNavigatorStore: this.fileNavigatorStore,
          isUserScrolledStore: this.isUserScrolledStore,
          notificationStore: this.notificationStore,
          scrollPercentage2D: this.scrollPercentage2D,
          userSettingsGetter: this.userSettingsGetter,
          viewerManager: this.viewerManager,
        }),
      () =>
        goToRightPosition({
          fileNavigatorStore: this.fileNavigatorStore,
          isUserScrolledStore: this.isUserScrolledStore,
          notificationStore: this.notificationStore,
          scrollPercentage2D: this.scrollPercentage2D,
          userSettingsGetter: this.userSettingsGetter,
          viewerManager: this.viewerManager,
        }),
      () =>
        zoomIn({
          isUserScrolledStore: this.isUserScrolledStore,
          notificationStore: this.notificationStore,
          scrollPercentage2D: this.scrollPercentage2D,
          userSettingsGetter: this.userSettingsGetter,
          viewerManager: this.viewerManager,
          zoomPercentageStore: this.zoomPercentageStore,
        }),
      () =>
        zoomOut({
          isUserScrolledStore: this.isUserScrolledStore,
          notificationStore: this.notificationStore,
          scrollPercentage2D: this.scrollPercentage2D,
          userSettingsGetter: this.userSettingsGetter,
          viewerManager: this.viewerManager,
          zoomPercentageStore: this.zoomPercentageStore,
        }),
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
