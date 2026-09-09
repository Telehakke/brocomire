import { atom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useRef, useState, type JSX } from "react";
import { AppStateAtom, Atom } from "../../../atoms";
import { TapAreaLengthEnum } from "../../../models/appState";
import type { Position } from "../../../types/types";
import {
    goToLeftAtom,
    goToNextAtom,
    goToPreviousAtom,
    goToRightAtom,
} from "../actions/viewerActions";

/** 左端をクリック */
const handleLeftEdgeClickAtom = atom(null, (get, set) => {
    if (get(Atom.appStore).shouldAdvance) {
        set(goToNextAtom);
        return;
    }
    set(goToLeftAtom);
});

/** 左端を右クリック */
const handleLeftEdgeSubClickAtom = atom(null, (get, set) => {
    if (get(Atom.appStore).shouldAdvance) {
        set(goToPreviousAtom);
        return;
    }
    set(goToRightAtom);
});

/** 右端をクリック */
const handleRightEdgeClickAtom = atom(null, (get, set) => {
    if (get(Atom.appStore).shouldAdvance) {
        set(goToNextAtom);
        return;
    }
    set(goToRightAtom);
});

/** 右端を右クリック */
const handleRightEdgeSubClickAtom = atom(null, (get, set) => {
    if (get(Atom.appStore).shouldAdvance) {
        set(goToPreviousAtom);
        return;
    }
    set(goToLeftAtom);
});

/** 下端をクリック */
const handleBottomClickAtom = atom(null, (_, set) => {
    set(goToNextAtom);
});

/** 下端を右クリック */
const handleBottomSubClickAtom = atom(null, (_, set) => {
    set(goToPreviousAtom);
});

/* -------------------------------------------------------------------------- */

/** 水平方向にスクロール */
const handleHorizontalScrollAtom = atom(null, (get, set, delta: Position) => {
    const body = get(Atom.viewerManager).body;
    if (body == null) return;

    const x = get(Atom.appStore).scrollSpeed * delta.x + body.scrollLeft;
    body.scroll(x, body.scrollTop);
    set(Atom.isUserScrolled, true);
});

/** 垂直方向にスクロール */
const handleVerticalScrollAtom = atom(null, (get, set, delta: Position) => {
    const body = get(Atom.viewerManager).body;
    if (body == null) return;

    const y = get(Atom.appStore).scrollSpeed * delta.y + body.scrollTop;
    body.scroll(body.scrollLeft, y);
    set(Atom.isUserScrolled, true);
});

/* -------------------------------------------------------------------------- */

export const TapAreas = (): JSX.Element => {
    const tapAreaWidth = useAtomValue(AppStateAtom.tapAreaWidth);
    const tapAreaHeight = useAtomValue(AppStateAtom.tapAreaHeight);
    const handleLeftEdgeClick = useSetAtom(handleLeftEdgeClickAtom);
    const handleLeftEdgeSubClick = useSetAtom(handleLeftEdgeSubClickAtom);
    const handleRightEdgeClick = useSetAtom(handleRightEdgeClickAtom);
    const handleRightEdgeSubClick = useSetAtom(handleRightEdgeSubClickAtom);
    const handleBottomClick = useSetAtom(handleBottomClickAtom);
    const handleBottomSubClick = useSetAtom(handleBottomSubClickAtom);
    const handleVerticalScroll = useSetAtom(handleVerticalScrollAtom);
    const handleHorizontalScroll = useSetAtom(handleHorizontalScrollAtom);

    return (
        <>
            <TapArea
                className="inset-x-0 bottom-0"
                style={{ height: TapAreaLengthEnum[tapAreaHeight].length }}
                onClick={() => handleBottomClick()}
                onSubClick={() => handleBottomSubClick()}
                onScroll={(delta) => handleHorizontalScroll(delta)}
            />
            <TapArea
                className="inset-y-0 left-0"
                style={{ width: TapAreaLengthEnum[tapAreaWidth].length }}
                onClick={() => handleLeftEdgeClick()}
                onSubClick={() => handleLeftEdgeSubClick()}
                onScroll={(delta) => handleVerticalScroll(delta)}
            />
            <TapArea
                className="inset-y-0 right-0"
                style={{ width: TapAreaLengthEnum[tapAreaWidth].length }}
                onClick={() => handleRightEdgeClick()}
                onSubClick={() => handleRightEdgeSubClick()}
                onScroll={(delta) => handleVerticalScroll(delta)}
            />
        </>
    );
};

/* -------------------------------------------------------------------------- */

class TouchMoveManager {
    private beginPosition: Position;
    private prevPosition: Position;
    private _isScrolled: boolean;

    constructor(x: number, y: number) {
        this.beginPosition = { x, y };
        this.prevPosition = { x, y };
        this._isScrolled = false;
    }

    /** 一定量スクロールしたかどうか */
    readonly isScrolled = (touch: Touch): boolean => {
        if (this._isScrolled) return true;

        const x = Math.abs(this.beginPosition.x - touch.clientX);
        const y = Math.abs(this.beginPosition.y - touch.clientY);
        this.prevPosition.x = touch.clientX;
        this.prevPosition.y = touch.clientY;
        if (Math.max(x, y) > 20) {
            this._isScrolled = true;
            return true;
        }
        return false;
    };

    /** 前回呼び出しからの変化量 */
    readonly getDelta = (touch: Touch): Position => {
        const x = this.prevPosition.x - touch.clientX;
        const y = this.prevPosition.y - touch.clientY;
        this.prevPosition.x = touch.clientX;
        this.prevPosition.y = touch.clientY;
        return { x, y };
    };
}

class ClickManager {
    private canClick: boolean;
    private canSubClick: boolean;
    private canLongPress: boolean;
    private timerId: number | undefined;

    constructor() {
        this.canClick = true;
        this.canSubClick = true;
        this.canLongPress = true;
        this.timerId = undefined;
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
        this.timerId = window.setTimeout(() => {
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
        window.clearTimeout(this.timerId);
    };
}

class SmoothScroll {
    static readonly SIZE = 10;
    private deltaXList: number[] = [];
    private deltaYList: number[] = [];

    push(deltaX: number, deltaY: number): void {
        this.deltaXList.push(deltaX);
        if (this.deltaXList.length > SmoothScroll.SIZE) {
            this.deltaXList.shift();
        }
        this.deltaYList.push(deltaY);
        if (this.deltaYList.length > SmoothScroll.SIZE) {
            this.deltaYList.shift();
        }
    }

    getPosition(): Position {
        const x =
            this.deltaXList.length === 0
                ? 0
                : this.deltaXList.reduce((acc, current) => {
                      return acc + current;
                  }, 0) / this.deltaXList.length;
        const y =
            this.deltaYList.length === 0
                ? 0
                : this.deltaYList.reduce((acc, current) => {
                      return acc + current;
                  }, 0) / this.deltaYList.length;
        return { x, y };
    }
}

const TapArea = (props: {
    className: string;
    style: React.CSSProperties;
    onClick: () => void;
    onSubClick: () => void;
    onScroll: (delta: Position) => void;
}): JSX.Element => {
    const div = useRef<HTMLDivElement | null>(null);
    const touchMoveManager = useRef(new TouchMoveManager(0, 0));
    const clickManager = useRef(new ClickManager());
    const smoothScroll = useRef(new SmoothScroll());
    const timerId = useRef<number | undefined>(undefined);
    const isSmoothScrollEnabled = useAtomValue(
        AppStateAtom.isSmoothScrollEnabled,
    );
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const el = div.current;
        if (el == null) return;

        const handleTouchMove = (ev: TouchEvent): void => {
            ev.preventDefault(); // 背景要素にスクロールイベントを伝播させない

            const touch = ev.targetTouches[0];
            if (!touchMoveManager.current.isScrolled(touch)) return;

            clickManager.current.cancelLongPress();
            let delta = touchMoveManager.current.getDelta(touch);
            if (isSmoothScrollEnabled) {
                smoothScroll.current.push(delta.x, delta.y);
                delta = smoothScroll.current.getPosition();
            }
            props.onScroll(delta);
        };

        const handleWheel = (ev: WheelEvent): void => {
            ev.preventDefault(); // 背景要素にホイールイベントを伝播させない

            let delta: Position = { x: ev.deltaX, y: ev.deltaY };
            if (isSmoothScrollEnabled) {
                smoothScroll.current.push(delta.x, delta.y);
                delta = smoothScroll.current.getPosition();
            }
            props.onScroll(delta);
            setIsActive(true);
            window.clearTimeout(timerId.current);
            timerId.current = window.setTimeout(() => {
                smoothScroll.current = new SmoothScroll();
                setIsActive(false);
            }, 100);
        };

        const option: AddEventListenerOptions = { passive: false };
        el.addEventListener("touchmove", handleTouchMove, option);
        el.addEventListener("wheel", handleWheel, option);
        return (): void => {
            el.removeEventListener("touchmove", handleTouchMove, option);
            el.removeEventListener("wheel", handleWheel, option);
        };
    }, [isSmoothScrollEnabled, props]);

    const className = {
        _: "fixed transition select-none",
        activeBg: "active:bg-blue-500/15",
        activeBg2: isActive ? "bg-blue-500/15" : "",
        props: props.className,
    };

    return (
        <div
            className={Object.values(className).join(" ")}
            style={props.style}
            ref={div}
            onClick={() => clickManager.current.onClick(props.onClick)}
            onContextMenu={(ev) => {
                ev.preventDefault(); // ブラウザデフォルトのメニューを開かない
                clickManager.current.onSubClick(props.onSubClick);
            }}
            onTouchStart={(ev) => {
                const touch = ev.targetTouches[0];
                touchMoveManager.current = new TouchMoveManager(
                    touch.clientX,
                    touch.clientY,
                );
                clickManager.current.resetFlags();
                clickManager.current.onLongPress(props.onSubClick);
                smoothScroll.current = new SmoothScroll();
            }}
            onTouchEnd={() => clickManager.current.cancelLongPress()}
        />
    );
};
