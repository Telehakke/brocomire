import type { JSX, ReactNode } from "react";

const className = {
    _: "size-10 p-2 rounded-full transition",
    bg: "bg-blue-300/75",
    hoverBg: "group-hover:bg-blue-400/75",
    activeBg: " group-active:bg-blue-500/75",
    stroke: "stroke-black",
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
