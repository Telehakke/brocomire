import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { Atom } from "../../../../atoms";
import {
    goToLeftAtom,
    goToRightAtom,
    zoomInAtom,
    zoomOutAtom,
} from "../../actions/viewerActions";

export const KeydownMonitor = (): null => {
    const isOpenSideMenu = useAtomValue(Atom.isOpenSideMenu);
    const goToLeft = useSetAtom(goToLeftAtom);
    const goToRight = useSetAtom(goToRightAtom);
    const zoomIn = useSetAtom(zoomInAtom);
    const zoomOut = useSetAtom(zoomOutAtom);

    useEffect(() => {
        const handleKeyDown = (ev: KeyboardEvent): void => {
            if (isOpenSideMenu) return;

            behaveKeyDown({ ev, goToLeft, goToRight, zoomIn, zoomOut });
        };
        document.body.addEventListener("keydown", handleKeyDown);
        return (): void =>
            document.body.removeEventListener("keydown", handleKeyDown);
    }, [goToLeft, goToRight, isOpenSideMenu, zoomIn, zoomOut]);

    return null;
};

/* -------------------------------------------------------------------------- */

/** キーボードの操作に応じて処理を実行する */
const behaveKeyDown = (props: {
    ev: KeyboardEvent;
    goToLeft: () => void;
    goToRight: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
}): void => {
    switch (props.ev.code) {
        case "ArrowLeft":
            props.ev.preventDefault(); // ブラウザのデフォルトの振る舞いを無効
            props.goToLeft();
            break;
        case "ArrowRight":
            props.ev.preventDefault();
            props.goToRight();
            break;
        case "ArrowUp":
            props.ev.preventDefault();
            props.zoomIn();
            break;
        case "ArrowDown":
            props.ev.preventDefault();
            props.zoomOut();
            break;
    }
};
