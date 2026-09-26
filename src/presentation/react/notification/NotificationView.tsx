import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, type JSX } from "react";
import { AppStateAtom, Atom } from "../../atoms";
import { safeAreaPaddingBottom } from "../utils/safeAreaPadding";

export const NotificationView = (): JSX.Element | null => {
    const timerId = useRef<number | undefined>(undefined);
    const notification = useAtomValue(AppStateAtom.notification);
    const setAppState = useSetAtom(Atom.appState);

    useEffect(() => {
        if (notification.visibility !== "visible") return;
        window.clearTimeout(timerId.current);
        timerId.current = window.setTimeout(() => {
            setAppState((a) =>
                a.copyWith({ notification: a.notification.hidden() }),
            );
        }, 1000);
    }, [notification, setAppState]);

    if (notification.value == null || notification.visibility === "none")
        return null;
    return (
        <div
            className="fixed bottom-4 left-1/2 -translate-x-1/2"
            style={safeAreaPaddingBottom()}
        >
            <Text />
        </div>
    );
};

const Text = (): JSX.Element => {
    const notification = useAtomValue(AppStateAtom.notification);
    const setAppState = useSetAtom(Atom.appState);

    const className = {
        _: "w-max rounded-md px-2 py-1 tabular-nums, select-none",
        opacity: "data-[state=hidden]:opacity-0",
        text: "text-neutral-100",
        bg: "bg-neutral-900",
        animation:
            "data-[state=visible]:animate-fade-in data-[state=hidden]:animate-fade-out",
    };

    const handleAnimationEnd = (): void => {
        if (notification.visibility !== "hidden") return;
        setAppState((a) => a.copyWith({ notification: a.notification.none() }));
    };

    return (
        <p
            className={Object.values(className).join(" ")}
            data-state={notification.visibility}
            onAnimationEnd={handleAnimationEnd}
        >
            {notification.value}
        </p>
    );
};
