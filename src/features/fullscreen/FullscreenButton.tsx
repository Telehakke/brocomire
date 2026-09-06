import { useAtomValue, useSetAtom } from "jotai";
import { Fullscreen } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { AppStateAtom, Atom } from "../../atoms";
import { IconBlueButton } from "../../components/IconBlueButton";
import { IconButton } from "../../components/IconButton";

export const FullscreenButton = (): JSX.Element | null => {
    const shouldShowButton = useAtomValue(
        AppStateAtom.shouldShowFullscreenButton,
    );
    const fullscreenManager = useAtomValue(Atom.fullscreenManager);
    const setFullscreenManager = useSetAtom(Atom.fullscreenManager);

    if (!shouldShowButton) return null;
    if (fullscreenManager.onFullscreen) {
        return (
            <IconBlueButton.Button
                onClick={() =>
                    setFullscreenManager((f) => {
                        if (!f.canFullscreen()) return f;
                        return f.toggle();
                    })
                }
            >
                <Fullscreen
                    className={Object.values(IconBlueButton.iconClassName).join(
                        " ",
                    )}
                />
            </IconBlueButton.Button>
        );
    }
    return (
        <IconButton.Button
            onClick={() =>
                setFullscreenManager((f) => {
                    if (!f.canFullscreen()) return f;
                    return f.toggle();
                })
            }
        >
            <Fullscreen
                className={Object.values(IconButton.iconClassName).join(" ")}
            />
        </IconButton.Button>
    );
};
