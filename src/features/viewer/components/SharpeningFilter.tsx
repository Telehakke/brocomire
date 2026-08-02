import { useAtomValue } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { AppStateAtom } from "../../../atoms";

export const SharpeningFilter = {
    className: "filter-[url(#sharpen)] ",
    Component: (): JSX.Element | null => {
        const onFilter = useAtomValue(AppStateAtom.onSharpeningFilter);
        const strength = useAtomValue(AppStateAtom.sharpeningFilterStrength);

        if (!onFilter) return null;
        return (
            <svg>
                <filter id="sharpen">
                    <feConvolveMatrix
                        order={3}
                        kernelMatrix={createMatrix(strength)}
                    ></feConvolveMatrix>
                </filter>
            </svg>
        );
    },
} as const;

const createMatrix = (strength: number): string => {
    const base = 0.05;
    const matrix = [...Array(9)].map((_, i) => {
        if (i === 4) {
            return (base * strength * 8 + 1).toFixed(2);
        }
        return (-base * strength).toFixed(2);
    });
    return matrix.join(" ");
};
