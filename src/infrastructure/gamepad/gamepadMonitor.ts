import type {
  IsUserScrolledGetter,
  IsUserScrolledSetter,
} from "../../application/appState/isUserScrolled";
import { goToLeftPosition } from "../../application/viewer/goToLeftPosition";
import { goToRightPosition } from "../../application/viewer/goToRightPosition";
import { scrollByPercentage } from "../../application/viewer/scrollByPercentage";
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

export class GamepadMonitor {
  private readonly fileNavigatorGetter: FileNavigatorGetter;
  private readonly fileNavigatorSetter: FileNavigatorSetter;
  private readonly isUserScrolledGetter: IsUserScrolledGetter;
  private readonly isUserScrolledSetter: IsUserScrolledSetter;
  private readonly notificationSetter: NotificationSetter;
  private readonly scrollPercentage2D: ScrollPercentage2D;
  private readonly userSettingsGetter: UserSettingsGetter;
  private readonly viewerManager: ViewerManager;
  private readonly zoomPercentageGetter: ZoomPercentageGetter;
  private readonly zoomPercentageSetter: ZoomPercentageSetter;
  private readonly prevPressed: boolean[];

  constructor(
    fileNavigatorGetter: FileNavigatorGetter,
    fileNavigatorSetter: FileNavigatorSetter,
    isUserScrolledGetter: IsUserScrolledGetter,
    isUserScrolledSetter: IsUserScrolledSetter,
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
    this.notificationSetter = notificationSetter;
    this.scrollPercentage2D = scrollPercentage2D;
    this.userSettingsGetter = userSettingsGetter;
    this.viewerManager = viewerManager;
    this.zoomPercentageGetter = zoomPercentageGetter;
    this.zoomPercentageSetter = zoomPercentageSetter;
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
    );
    this.handleLeftStickTilt(gamepad, (x, y) =>
      scrollByPercentage(
        x,
        y,
        this.isUserScrolledGetter,
        this.scrollPercentage2D,
        this.viewerManager,
      ),
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
