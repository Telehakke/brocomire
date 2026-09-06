import { useAtomValue, useSetAtom } from "jotai";
import { Droplet } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { AppStateAtom, Atom } from "../../atoms";
import { IconBlueButton } from "../../components/IconBlueButton";
import { IconButton } from "../../components/IconButton";

export const InvertFilterButton = (): JSX.Element | null => {
    const shouldShowButton = useAtomValue(AppStateAtom.shouldShowInvertButton);
    const onInvertFilter = useAtomValue(Atom.onInvertFilter);
    const setOnInvertFilter = useSetAtom(Atom.onInvertFilter);

    if (!shouldShowButton) return null;
    if (onInvertFilter) {
        return (
            <IconBlueButton.Button onClick={() => setOnInvertFilter((v) => !v)}>
                <Droplet
                    className={Object.values(IconBlueButton.iconClassName).join(
                        " ",
                    )}
                />
            </IconBlueButton.Button>
        );
    }
    return (
        <IconButton.Button onClick={() => setOnInvertFilter((v) => !v)}>
            <Droplet
                className={Object.values(IconButton.iconClassName).join(" ")}
            />
        </IconButton.Button>
    );
};
