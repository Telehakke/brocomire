import type { JSX, ReactNode } from "react";

export const LargeIconButton = (props: {
    text: string;
    onClick: () => void;
    children: ReactNode;
}): JSX.Element => {
    const className = {
        _: "rounded-xl px-4 py-2 text-xs transition",
        flex: "flex flex-col items-center gap-1",
        bg: "bg-white dark:bg-neutral-900",
        hoverBg: "hover:bg-neutral-100 dark:hover:bg-neutral-800",
        activeBg: "active:bg-neutral-200 dark:active:bg-neutral-700",
        border: "border border-neutral-300 dark:border-neutral-600",
        focusBorder: "focus-visible:border-transparent",
        outline:
            "-outline-offset-2 outline-blue-500/75 focus-visible:outline-2",
    };

    return (
        <button
            className={Object.values(className).join(" ")}
            onClick={props.onClick}
        >
            {props.children}
            {props.text}
        </button>
    );
};
