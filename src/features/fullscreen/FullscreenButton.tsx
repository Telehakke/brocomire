import { useAtomValue, useSetAtom } from "jotai";
import { Fullscreen, Minimize } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { AppStateAtom, Atom } from "../../atoms";
import { IconButton } from "../../components/IconButton";

export const FullscreenButton = (): JSX.Element | null => {
    const shouldShowButton = useAtomValue(
        AppStateAtom.shouldShowFullscreenButton,
    );
    const setFullscreenManager = useSetAtom(Atom.fullscreenManager);

    if (!shouldShowButton) return null;
    return (
        <IconButton.Button
            onClick={() =>
                setFullscreenManager((f) => {
                    if (!f.canFullscreen()) return f;
                    return f.toggle();
                })
            }
        >
            <Icon />
        </IconButton.Button>
    );
};

const Icon = (): JSX.Element => {
    const fullscreenManager = useAtomValue(Atom.fullscreenManager);

    if (fullscreenManager.onFullscreen) {
        return (
            <Minimize
                className={Object.values(IconButton.iconClassName).join(" ")}
            />
        );
    }
    return (
        <Fullscreen
            className={Object.values(IconButton.iconClassName).join(" ")}
        />
    );
};
