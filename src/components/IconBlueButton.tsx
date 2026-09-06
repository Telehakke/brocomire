import type { JSX, ReactNode } from "react";

const className = {
    _: "size-10 p-2 rounded-full transition",
    bg: "bg-blue-600/50",
    hoverBg: "group-hover:bg-blue-700/50",
    activeBg: " group-active:bg-blue-800/50",
    stroke: "stroke-neutral-100",
};

export const IconBlueButton = {
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
