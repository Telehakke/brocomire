import { useAtomValue } from "jotai";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import type { JSX } from "react";
import { Atom } from "../atoms";
import {
    safeAreaPaddingLeft,
    safeAreaPaddingRight,
} from "../utils/safeAreaPadding";

export const ChevronLeft = (): JSX.Element | null => {
    const onChevron = useAtomValue(Atom.onChevron);

    if (onChevron !== "left") return null;
    return (
        <div
            className="fixed top-1/2 left-0 -translate-y-1/2"
            style={safeAreaPaddingLeft()}
        >
            <CircleChevronLeft className="size-15 stroke-green-500" />
        </div>
    );
};

export const ChevronRight = (): JSX.Element | null => {
    const onChevron = useAtomValue(Atom.onChevron);

    if (onChevron !== "right") return null;
    return (
        <div
            className="fixed top-1/2 right-0 -translate-y-1/2"
            style={safeAreaPaddingRight()}
        >
            <CircleChevronRight className="size-15 stroke-green-500" />
        </div>
    );
};
