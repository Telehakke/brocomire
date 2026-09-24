import type { AppStore } from "../../application/appState/appStore";
import { goToLeft } from "../../application/viewer/goToLeft";
import { goToRight } from "../../application/viewer/goToRight";
import { scrollByPct } from "../../application/viewer/scrollByPct";
import { zoomIn } from "../../application/viewer/zoomIn";
import { zoomOut } from "../../application/viewer/zoomOut";
import type { UserSettings } from "../../domain/models/userSettings/userSettings";

export class GamepadMonitor {
    private readonly appStore: AppStore;
    private readonly userSettings: UserSettings;
    private readonly prevPressed: boolean[];

    constructor(appStore: AppStore, userSettings: UserSettings) {
        this.appStore = appStore;
        this.userSettings = userSettings;
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
            () => zoomIn(this.appStore, this.userSettings),
            () => zoomOut(this.appStore, this.userSettings),
            () => goToLeft(this.appStore, this.userSettings),
            () => goToRight(this.appStore, this.userSettings),
        );
        this.handleLeftStickTilt(gamepad, (x, y) =>
            scrollByPct(x, y, this.appStore),
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
