import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { Atom } from "../../../../atoms";
import {
    goToLeftAtom,
    goToRightAtom,
    zoomInAtom,
    zoomOutAtom,
} from "../../actions/viewerActions";

const scrollAtom = atom(null, (get, set, x: number, y: number) => {
    const scroll = get(Atom.scrollManager).add(x, y);
    scroll.applyScroll(get(Atom.viewerManager));
    set(Atom.scrollManager, scroll);
    set(Atom.isUserScrolled, true);
});

export const GamepadMonitor = (): null => {
    const goToLeft = useSetAtom(goToLeftAtom);
    const goToRight = useSetAtom(goToRightAtom);
    const zoomIn = useSetAtom(zoomInAtom);
    const zoomOut = useSetAtom(zoomOutAtom);
    const scroll = useSetAtom(scrollAtom);

    useEffect(() => {
        const gamepadLoop = (ev: GamepadEvent): void => {
            behaveGamepad({ ev, goToLeft, goToRight, zoomIn, zoomOut, scroll });
            requestAnimationFrame(() => gamepadLoop(ev));
        };
        window.addEventListener("gamepadconnected", gamepadLoop);
        return (): void =>
            window.removeEventListener("gamepadconnected", gamepadLoop);
    }, [goToLeft, goToRight, scroll, zoomIn, zoomOut]);

    return null;
};

/* -------------------------------------------------------------------------- */

const prevPressed: boolean[] = [];

/** ゲームパッドの操作に応じて処理を実行する */
const behaveGamepad = (props: {
    ev: GamepadEvent;
    goToLeft: () => void;
    goToRight: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
    scroll: (x: number, y: number) => void;
}): void => {
    const index = props.ev.gamepad.index;
    const gamepad = navigator.getGamepads()[index];
    if (gamepad == null) return;

    gamepad.buttons.forEach((b, i) => {
        if (b.pressed && !prevPressed[i]) {
            switch (i) {
                case 12: // 方向キー上
                    props.zoomIn();
                    break;
                case 13: // 方向キー下
                    props.zoomOut();
                    break;
                case 14: // 方向キー左
                    props.goToLeft();
                    break;
                case 15: // 方向キー右
                    props.goToRight();
                    break;
            }
        }
        prevPressed[i] = b.pressed;
    });
    gamepad.axes.forEach((a, i) => {
        if (!isTilt(a)) return;
        switch (i) {
            case 0: // 左スティックの水平方向
                props.scroll(a * 2, 0);
                break;
            case 1: // 左スティックの垂直方向
                props.scroll(0, a * 2);
                break;
        }
    });
};

/** スティックを倒しているかどうか */
const isTilt = (value: number): boolean => {
    return value <= -0.1 || 0.1 <= value;
};
