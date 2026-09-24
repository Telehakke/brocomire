import { useAtomValue } from "jotai";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import type { JSX } from "react/jsx-runtime";
import { AppStateAtom } from "../../../atoms";

export const LoadingAnimation = (): JSX.Element | null => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const timerId = useRef<number | undefined>(undefined);
    const onLoadingAnimation = useAtomValue(AppStateAtom.onLoadingAnimation);

    useEffect(() => {
        const svg = svgRef.current;
        if (svg == null) return;
        if (onLoadingAnimation) {
            timerId.current = window.setTimeout(() => {
                svg.style.display = "inline";
            }, 100);
            return;
        }
        window.clearTimeout(timerId.current);
        svg.style.display = "none";
    }, [onLoadingAnimation]);

    return (
        <LoaderCircle
            className="fixed inset-0 m-auto inline size-16 animate-spin stroke-green-500"
            ref={svgRef}
        />
    );
};
