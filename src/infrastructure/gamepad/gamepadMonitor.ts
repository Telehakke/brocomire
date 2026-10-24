import type { IsUserScrolledStore } from "../../application/appState/isUserScrolled";
import { goToLeftPosition } from "../../application/viewer/goToLeftPosition";
import { goToRightPosition } from "../../application/viewer/goToRightPosition";
import { scrollByPercentage } from "../../application/viewer/scrollByPercentage";
import { zoomIn } from "../../application/viewer/zoomIn";
import { zoomOut } from "../../application/viewer/zoomOut";
import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { ZoomPercentageStore } from "../../domain/models/zoom/zoomPercentage";

export class GamepadMonitor {
  private readonly fileNavigatorStore: FileNavigatorStore;
  private readonly isUserScrolledStore: IsUserScrolledStore;
  private readonly notificationStore: NotificationStore;
  private readonly scrollPercentage2D: ScrollPercentage2D;
  private readonly userSettingsGetter: UserSettingsGetter;
  private readonly viewerManager: ViewerManager;
  private readonly zoomPercentageStore: ZoomPercentageStore;
  private readonly prevPressed: boolean[];

  constructor(
    fileNavigatorStore: FileNavigatorStore,
    isUserScrolledStore: IsUserScrolledStore,
    notificationStore: NotificationStore,
    scrollPercentage2D: ScrollPercentage2D,
    userSettingsGetter: UserSettingsGetter,
    viewerManager: ViewerManager,
    zoomPercentageStore: ZoomPercentageStore,
  ) {
    this.fileNavigatorStore = fileNavigatorStore;
    this.isUserScrolledStore = isUserScrolledStore;
    this.notificationStore = notificationStore;
    this.scrollPercentage2D = scrollPercentage2D;
    this.userSettingsGetter = userSettingsGetter;
    this.viewerManager = viewerManager;
    this.zoomPercentageStore = zoomPercentageStore;
    this.prevPressed = [];
  }

  /** ゲームパッドの監視を開始 */
  start(): void {
    window.addEventListener("gamepadconnected", this.handleGamepadEvent);
  }

  /** ゲームパッドの監視を終了 */
  end(): void {
    window.removeEventListener("gamepadconnected", this.handleGamepadEvent);
  }

  private handleGamepadEvent = (ev: GamepadEvent): void => {
    const gamepad = navigator.getGamepads()[ev.gamepad.index];
    this.handleButtonPress(
      gamepad,
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
    );
    this.handleLeftStickTilt(gamepad, (x, y) =>
      scrollByPercentage({
        x,
        y,
        isUserScrolledStore: this.isUserScrolledStore,
        scrollPercentage2D: this.scrollPercentage2D,
        viewerManager: this.viewerManager,
      }),
    );
    requestAnimationFrame(() => this.handleGamepadEvent(ev));
  };

  private handleButtonPress = (
    gamepad: Gamepad | null,
    handleUpPress: () => void,
    handleDownPress: () => void,
    handleLeftPress: () => void,
    handleRightPress: () => void,
  ): void => {
    if (gamepad == null) return;

    gamepad.buttons.forEach((b, i) => {
      // ボタンを押したら1度だけ処理を実行する
      if (b.pressed && !this.prevPressed[i]) {
        switch (i) {
          case 12:
            handleUpPress();
            break;
          case 13:
            handleDownPress();
            break;
          case 14:
            handleLeftPress();
            break;
          case 15:
            handleRightPress();
            break;
        }
      }
      this.prevPressed[i] = b.pressed;
    });
  };

  private handleLeftStickTilt = (
    gamepad: Gamepad | null,
    callback: (x: number, y: number) => void,
  ): void => {
    gamepad?.axes.forEach((a, i) => {
      if (!this.isTilt(a)) return;
      switch (i) {
        case 0:
          callback(a * 2, 0);
          break;
        case 1:
          callback(0, a * 2);
          break;
      }
    });
  };

  private isTilt = (value: number): boolean => {
    return value <= -0.1 || 0.1 <= value;
  };
}
