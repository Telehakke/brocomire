import type { JSX, ReactNode } from "react";

const className = {
    _: "size-10 p-2 rounded-full opacity-50 transition",
    bg: "bg-neutral-500",
    hoverBg: "group-hover:bg-neutral-600",
    activeBg: " group-active:bg-neutral-700",
    border: "border border-neutral-200",
    stroke: "stroke-white",
};

export const IconButton = {
    Button: (props: {
        onClick: () => void;
        children: ReactNode;
    }): JSX.Element => {
        const className = {
            _: "group rounded-full transition select-none",
            outline: "outline-blue-500/75 focus-visible:outline-2",
        };

        return (
            <button
                className={Object.values(className).join(" ")}
                onClick={props.onClick}
            >
                {props.children}
            </button>
        );
    },
    iconClassName: className,
};
