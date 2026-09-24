import type { CSSProperties } from "react";

export const safeAreaPaddingLeft = (): CSSProperties => {
    return {
        paddingLeft: "env(safe-area-inset-left,0)",
    };
};

export const safeAreaPaddingRight = (): CSSProperties => {
    return {
        paddingRight: "env(safe-area-inset-right,0)",
    };
};

export const safeAreaPaddingTop = (): CSSProperties => {
    return {
        paddingTop: "env(safe-area-inset-top,0)",
    };
};

export const safeAreaPaddingBottom = (): CSSProperties => {
    return {
        paddingBottom: "env(safe-area-inset-bottom,0)",
    };
};
