import { useAtomValue } from "jotai";
import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type JSX,
} from "react";
import { ClickGestureManager } from "../../../../infrastructure/viewer/clickGestureManager";
import { SmoothScroll } from "../../../../infrastructure/viewer/smoothScroll";
import { TouchMoveManager } from "../../../../infrastructure/viewer/touchMoveManager";
import { UserSettingsAtom } from "../../../atoms";

export const TapArea = (props: {
    className: string;
    style: CSSProperties;
    onClick: () => void;
    onSubClick: () => void;
    onScroll: (deltaX: number, deltaY: number) => void;
}): JSX.Element => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const timerId = useRef<number | undefined>(undefined);
    const clickGestureManager = useRef(new ClickGestureManager(false));
    const touchMoveManager = useRef(new TouchMoveManager(0, 0));
    const smoothScroll = useRef(new SmoothScroll());
    const isSmoothScrollEnabled = useAtomValue(
        UserSettingsAtom.isSmoothScrollEnabled,
    );
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const div = divRef.current;
        if (div == null) return;

        const handleTouchMove = (ev: TouchEvent): void => {
            ev.preventDefault(); // 背景要素にスクロールイベントを伝播させない

            const { clientX, clientY } = ev.targetTouches[0];
            if (!touchMoveManager.current.isScrolled(clientX, clientY)) return;

            clickGestureManager.current.cancelLongPress();
            let deltaX = touchMoveManager.current.deltaX(clientX);
            let deltaY = touchMoveManager.current.deltaY(clientY);
            if (isSmoothScrollEnabled.value) {
                smoothScroll.current.push(deltaX, deltaY);
                const { x, y } = smoothScroll.current.getPosition();
                deltaX = x;
                deltaY = y;
            }
            props.onScroll(deltaX, deltaY);
        };

        const handleWheel = (ev: WheelEvent): void => {
            ev.preventDefault(); // 背景要素にホイールイベントを伝播させない

            let deltaX = ev.deltaX;
            let deltaY = ev.deltaY;
            if (isSmoothScrollEnabled.value) {
                smoothScroll.current.push(deltaX, deltaY);
                const { x, y } = smoothScroll.current.getPosition();
                deltaX = x;
                deltaY = y;
            }
            props.onScroll(deltaX, deltaY);
            setIsActive(true);
            window.clearTimeout(timerId.current);
            timerId.current = window.setTimeout(() => {
                smoothScroll.current = new SmoothScroll();
                setIsActive(false);
            }, 100);
        };

        const option: AddEventListenerOptions = { passive: false };
        div.addEventListener("touchmove", handleTouchMove, option);
        div.addEventListener("wheel", handleWheel, option);
        return (): void => {
            div.removeEventListener("touchmove", handleTouchMove, option);
            div.removeEventListener("wheel", handleWheel, option);
        };
    }, [isSmoothScrollEnabled, props]);

    const className = {
        _: "fixed transition select-none",
        activeBg: "active:bg-blue-500/15",
        activeBg2: isActive ? "bg-blue-500/15" : "",
        props: props.className,
    };

    const handleClick = (): void => {
        clickGestureManager.current.onClick(props.onClick);
    };

    const handleContextMenu = (
        ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ): void => {
        ev.preventDefault(); // ブラウザデフォルトのメニューを開かない
        clickGestureManager.current.onSubClick(props.onSubClick);
    };

    const handleTouchStart = (ev: React.TouchEvent<HTMLDivElement>): void => {
        const { clientX, clientY } = ev.targetTouches[0];
        touchMoveManager.current = new TouchMoveManager(clientX, clientY);
        clickGestureManager.current.reset();
        clickGestureManager.current.onLongPress(props.onSubClick);
        smoothScroll.current = new SmoothScroll();
    };

    const handleTouchEnd = (): void => {
        clickGestureManager.current.cancelLongPress();
    };

    return (
        <div
            className={Object.values(className).join(" ")}
            style={props.style}
            ref={divRef}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        />
    );
};
