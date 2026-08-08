import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { Atom } from "../../../../atoms";

export const LandscapeMonitor = (): null => {
    const setIsLandscape = useSetAtom(Atom.isLandscape);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(orientation: landscape)");
        setIsLandscape(mediaQuery.matches);

        const handleChange = (ev: MediaQueryListEvent): void => {
            setIsLandscape(ev.matches);
        };
        mediaQuery.addEventListener("change", handleChange);
        return (): void =>
            mediaQuery.removeEventListener("change", handleChange);
    }, [setIsLandscape]);

    return null;
};
