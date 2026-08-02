import { useAtom } from "jotai";
import { useEffect, useRef, type JSX } from "react";
import { Atom } from "../../atoms";
import { safeAreaPaddingBottom } from "../../utils/safeAreaPadding";

export const Notification = (): JSX.Element | null => {
    const timerRef = useRef<number | undefined>(undefined);
    const [message, setMessage] = useAtom(Atom.messageManager);

    useEffect(() => {
        if (message.visibility !== "visible") return;
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            setMessage((m) => m.hidden());
        }, 1000);
    }, [message, setMessage]);

    if (message.value == null || message.visibility === "none") return null;
    return (
        <div
            className="fixed bottom-4 left-1/2 -translate-x-1/2"
            style={safeAreaPaddingBottom()}
        >
            <p
                className={Object.values(className).join(" ")}
                data-state={message.visibility}
                onAnimationEnd={() => {
                    if (message.visibility !== "hidden") return;
                    setMessage((m) => m.none());
                }}
            >
                {message.value}
            </p>
        </div>
    );
};

const className = {
    _: "w-max rounded-md px-2 py-1 tabular-nums",
    opacity: "data-[state=hidden]:opacity-0",
    text: "text-neutral-100",
    bg: "bg-neutral-900",
    animation:
        "data-[state=visible]:animate-fade-in data-[state=hidden]:animate-fade-out",
};
