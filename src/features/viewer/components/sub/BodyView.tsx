import { useAtomValue, useSetAtom } from "jotai";
import React, {
    useEffect,
    useRef,
    type JSX,
    type ReactNode,
    type RefObject,
} from "react";
import { Atom } from "../../../../atoms";
import type { ViewerBody } from "../../../../models/viewerManager";
import type { ChevronMark, Position } from "../../../../types/types";

class TouchMoveManager {
    private beginPosition: Position;
    private prevX: number;
    private _isScrolled: boolean;

    constructor(x: number, y: number) {
        this.beginPosition = { x, y };
        this.prevX = x;
        this._isScrolled = false;
    }

    /** 一定量スクロールしたかどうか */
    readonly isScrolled = (touch: React.Touch): boolean => {
        if (this._isScrolled) return true;

        const x = Math.abs(this.beginPosition.x - touch.clientX);
        const y = Math.abs(this.beginPosition.y - touch.clientY);
        this.prevX = touch.clientX;
        if (Math.max(x, y) > 20) {
            this._isScrolled = true;
            return true;
        }
        return false;
    };

    /** 前回呼び出しからの水平方向変化量 */
    readonly getDeltaX = (touch: React.Touch): number => {
        const x = this.prevX - touch.clientX;
        this.prevX = touch.clientX;
        return x;
    };
}

class ClickManager {
    private canClick: boolean;
    private canSubClick: boolean;
    private canLongPress: boolean;
    private clickTimerId: number | undefined;
    private longPressTimerId: number | undefined;

    constructor() {
        this.canClick = true;
        this.canSubClick = true;
        this.canLongPress = true;
        this.clickTimerId = undefined;
        this.longPressTimerId = undefined;
    }

    /** 内部フラグを初期値に戻す */
    readonly resetFlags = (): void => {
        this.canClick = true;
        this.canSubClick = true;
        this.canLongPress = true;
    };

    /** クリック時に行う処理を実行 */
    readonly onClick = (action: () => void): void => {
        if (!this.canClick) {
            this.canClick = true;
            return;
        }
        window.clearInterval(this.clickTimerId);
        this.clickTimerId = window.setTimeout(() => {
            action();
        }, 300);
    };

    /** ダブルクリック時に行う処理を実行 */
    readonly onDoubleClick = (action: () => void): void => {
        window.clearTimeout(this.clickTimerId);
        action();
    };

    /** サブクリック時に行う処理を実行 */
    readonly onSubClick = (action: () => void): void => {
        if (!this.canSubClick) {
            this.canSubClick = true;
            return;
        }
        this.canLongPress = false;
        action();
    };

    /** 長押し時に行う処理を実行 */
    readonly onLongPress = (action: () => void): void => {
        this.longPressTimerId = window.setTimeout(() => {
            if (!this.canLongPress) {
                this.canLongPress = true;
                return;
            }
            this.canClick = false;
            this.canSubClick = false;
            action();
        }, 500);
    };

    /** 長押し時に行う処理をキャンセル */
    readonly cancelLongPress = (): void => {
        window.clearTimeout(this.longPressTimerId);
    };
}

class PullManager {
    private readonly threshold = 100;
    private count: number;

    constructor() {
        this.count = 0;
    }

    /** 水平方向の変化量を加算 */
    readonly add = (deltaX: number): void => {
        this.count += deltaX;
    };

    /** 状態を初期化 */
    readonly reset = (): void => {
        this.count = 0;
    };

    /** 表示すべきアイコンを取得 */
    readonly getChevronMark = (): ChevronMark => {
        if (this.canLeftPull()) return "left";
        if (this.canRightPull()) return "right";
        return "none";
    };

    /** 左端の限界を超えて引っ張られていれば処理を実行 */
    readonly onLeftSidePull = (action: () => void): void => {
        if (!this.canLeftPull()) return;
        action();
    };

    /** 右端の限界を超えて引っ張られていれば処理を実行 */
    readonly onRightSidePull = (action: () => void): void => {
        if (!this.canRightPull()) return;
        action();
    };

    private readonly canLeftPull = (): boolean => {
        return this.count < -this.threshold;
    };

    private readonly canRightPull = (): boolean => {
        return this.count > this.threshold;
    };
}

export const BodyView = ({
    body,
    onResize,
    onClick,
    onDoubleClick,
    onSubClick,
    onLeftSidePull,
    onRightSidePull,
    children,
}: {
    body: RefObject<ViewerBody>;
    onResize: () => void;
    onClick: () => void;
    onDoubleClick: () => void;
    onSubClick: () => void;
    onLeftSidePull: () => void;
    onRightSidePull: () => void;
    children: ReactNode;
}): JSX.Element => {
    const touchMoveManager = useRef(new TouchMoveManager(0, 0));
    const clickManager = useRef(new ClickManager());
    const pullManager = useRef(new PullManager());
    const viewerManager = useAtomValue(Atom.viewerManager);
    const setViewerManager = useSetAtom(Atom.viewerManager);
    const setOnChevron = useSetAtom(Atom.onChevron);
    const setIsUserScrolled = useSetAtom(Atom.isUserScrolled);

    useEffect(() => {
        setViewerManager((v) => v.setBody(body.current));
    }, [body, setViewerManager]);

    useEffect(() => {
        if (body.current == null) return;

        const observer = new ResizeObserver(onResize);
        observer.observe(body.current);
        return (): void => observer.disconnect();
    }, [body, onResize]);

    return (
        <div
            className="fixed inset-0 h-dvh w-dvw scrollbar-none overflow-scroll overscroll-contain bg-black select-none"
            ref={body}
            onClick={() => clickManager.current.onClick(onClick)}
            onDoubleClick={() =>
                clickManager.current.onDoubleClick(onDoubleClick)
            }
            onContextMenu={(ev) => {
                ev.preventDefault(); // ブラウザデフォルトのメニューを開かない
                clickManager.current.onSubClick(onSubClick);
            }}
            onTouchStart={(ev) => {
                const touch = ev.targetTouches[0];
                touchMoveManager.current = new TouchMoveManager(
                    touch.clientX,
                    touch.clientY,
                );

                clickManager.current.resetFlags();
                clickManager.current.onLongPress(onSubClick);

                pullManager.current.reset();
            }}
            onTouchMove={(ev) => {
                setIsUserScrolled(true);

                const touch = ev.targetTouches[0];
                if (touchMoveManager.current.isScrolled(touch)) {
                    clickManager.current.cancelLongPress();
                }

                if (viewerManager.isReachedLimitX()) {
                    pullManager.current.add(
                        touchMoveManager.current.getDeltaX(touch),
                    );
                } else {
                    pullManager.current.reset();
                }
                setOnChevron(pullManager.current.getChevronMark());
            }}
            onTouchEnd={() => {
                clickManager.current.cancelLongPress();
                pullManager.current.onLeftSidePull(onLeftSidePull);
                pullManager.current.onRightSidePull(onRightSidePull);
                setOnChevron("none");
            }}
            onWheel={() => setIsUserScrolled(true)}
        >
            {children}
        </div>
    );
};
