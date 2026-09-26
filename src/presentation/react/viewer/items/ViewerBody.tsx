import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, type JSX, type ReactNode } from "react";
import { ChevronMark } from "../../../../application/appState/valueObjects/chevronMark";
import { ClickGestureManager } from "../../../../infrastructure/viewer/clickGestureManager";
import { PullManager } from "../../../../infrastructure/viewer/pullManager";
import { TouchMoveManager } from "../../../../infrastructure/viewer/touchMoveManager";
import { AppStateAtom, Atom, UserSettingsAtom } from "../../../atoms";

export type Body = HTMLDivElement | null;

export const ViewerBody = ({
    onResize,
    onClick,
    onDoubleClick,
    onSubClick,
    onLeftSidePull,
    onRightSidePull,
    children,
}: {
    onResize: () => void;
    onClick: () => void;
    onDoubleClick: () => void;
    onSubClick: () => void;
    onLeftSidePull: () => void;
    onRightSidePull: () => void;
    children: ReactNode;
}): JSX.Element => {
    const bodyRef = useRef<Body>(null);
    const clickGestureManager = useRef(new ClickGestureManager(true));
    const touchMoveManager = useRef(new TouchMoveManager(0, 0));
    const pullManager = useRef(new PullManager());
    const viewerManager = useAtomValue(AppStateAtom.viewerManager);
    const longPressRecognitionTime = useAtomValue(
        UserSettingsAtom.longPressRecognitionTime,
    );
    const setAppState = useSetAtom(Atom.appState);

    useEffect(() => {
        const body = bodyRef.current;
        if (body == null) return;
        setAppState((a) =>
            a.copyWith({
                viewerManager: a.viewerManager.setBody(() => body),
            }),
        );
    }, [setAppState]);

    useEffect(() => {
        const body = bodyRef.current;
        if (body == null) return;

        const observer = new ResizeObserver(onResize);
        observer.observe(body);
        return (): void => observer.disconnect();
    }, [bodyRef, onResize]);

    const handleClick = (): void => {
        clickGestureManager.current.onClick(onClick);
    };

    const handleDoubleClick = (): void => {
        clickGestureManager.current.onDoubleClick(onDoubleClick);
    };

    const handleContextMenu = (
        ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ): void => {
        ev.preventDefault(); // ブラウザデフォルトのメニューを開かない
        clickGestureManager.current.onSubClick(onSubClick);
    };

    const handleTouchStart = (ev: React.TouchEvent<HTMLDivElement>): void => {
        const { clientX, clientY } = ev.targetTouches[0];
        touchMoveManager.current = new TouchMoveManager(clientX, clientY);
        clickGestureManager.current.reset();
        clickGestureManager.current.onLongPress(
            onSubClick,
            longPressRecognitionTime.value,
        );
        pullManager.current.reset();
    };

    const handleTouchMove = (ev: React.TouchEvent<HTMLDivElement>): void => {
        const { clientX, clientY } = ev.targetTouches[0];
        if (touchMoveManager.current.isScrolled(clientX, clientY)) {
            clickGestureManager.current.cancelLongPress();
        }
        if (viewerManager.isReachedLimitX()) {
            pullManager.current.add(touchMoveManager.current.deltaX(clientX));
        } else {
            pullManager.current.reset();
        }
        setAppState((a) =>
            a.copyWith({
                chevronMark: pullManager.current.getChevronMark(),
                isUserScrolled: true,
            }),
        );
    };

    const handleTouchEnd = (): void => {
        clickGestureManager.current.cancelLongPress();
        pullManager.current.onLeftSidePull(onLeftSidePull);
        pullManager.current.onRightSidePull(onRightSidePull);
        setAppState((a) =>
            a.copyWith({ chevronMark: new ChevronMark("none") }),
        );
    };

    const handleWheel = (): void => {
        setAppState((a) => a.copyWith({ isUserScrolled: true }));
    };

    return (
        <div
            className="fixed inset-0 h-dvh w-dvw scrollbar-none overflow-scroll overscroll-none bg-black select-none"
            ref={bodyRef}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onContextMenu={handleContextMenu}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
        >
            {children}
        </div>
    );
};
