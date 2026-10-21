import { useAtomValue } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { isUserScrollingAtom, onSharpeningFilterAtom, UserSettingsAtom } from "../../../atoms";

export const SharpeningFilter = {
  className: "filter-[url(#sharpen)] ",
  Component: (): JSX.Element | null => {
    const isUserScrolling = useAtomValue(isUserScrollingAtom);
    const onFilter = useAtomValue(onSharpeningFilterAtom);
    const strength = useAtomValue(UserSettingsAtom.sharpeningFilterStrength);

    if (isUserScrolling || !onFilter) return null;
    return (
      <svg>
        <filter id="sharpen">
          <feConvolveMatrix order={3} kernelMatrix={createMatrix(strength)}></feConvolveMatrix>
        </filter>
      </svg>
    );
  },
} as const;

/* -------------------------------------------------------------------------- */

const createMatrix = (strength: number): string => {
  const base = 0.05;
  const matrix = [...Array(9)].map((_, i) => {
    if (i === 4) return (base * strength * 8 + 1).toFixed(2);
    return (-base * strength).toFixed(2);
  });
  return matrix.join(" ");
};
