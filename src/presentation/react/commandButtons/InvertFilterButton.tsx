import { useAtomValue, useSetAtom } from "jotai";
import { Droplet } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { AppStateAtom, Atom, UserSettingsAtom } from "../../atoms";
import { IconBlueButton } from "../utils/IconBlueButton";
import { IconButton } from "../utils/IconButton";

export const InvertFilterButton = (): JSX.Element | null => {
    const shouldShowButton = useAtomValue(
        UserSettingsAtom.shouldShowInvertButton,
    );
    const onFilter = useAtomValue(AppStateAtom.onInvertFilter);

    if (!shouldShowButton.value) return null;
    if (onFilter) {
        return <InvertIconBlueButton />;
    }
    return <InvertIconButton />;
};

const InvertIconBlueButton = (): JSX.Element => {
    const setAppState = useSetAtom(Atom.appState);

    const handleClick = (): void => {
        setAppState((a) => a.setOnInvertFilter(() => false));
    };

    return (
        <IconBlueButton.Button onClick={handleClick}>
            <Droplet
                className={Object.values(IconBlueButton.className).join(" ")}
            />
        </IconBlueButton.Button>
    );
};

const InvertIconButton = (): JSX.Element => {
    const setAppState = useSetAtom(Atom.appState);

    const handleClick = (): void => {
        setAppState((a) => a.setOnInvertFilter(() => true));
    };

    return (
        <IconButton.Button onClick={handleClick}>
            <Droplet
                className={Object.values(IconButton.className).join(" ")}
            />
        </IconButton.Button>
    );
};
