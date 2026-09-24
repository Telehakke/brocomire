import { useAtomValue, useSetAtom } from "jotai";
import { Sparkle } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { AppStateAtom, Atom, UserSettingsAtom } from "../../atoms";
import { IconBlueButton } from "../utils/IconBlueButton";
import { IconButton } from "../utils/IconButton";

export const SharpeningFilterButton = (): JSX.Element | null => {
    const shouldShowButton = useAtomValue(
        UserSettingsAtom.shouldShowSharpeningFilterButton,
    );
    const onFilter = useAtomValue(AppStateAtom.onSharpeningFilter);

    if (!shouldShowButton.value) return null;
    if (onFilter) {
        return <SharpeningFilterIconBlueButton />;
    }
    return <SharpeningFilterIconButton />;
};

const SharpeningFilterIconBlueButton = (): JSX.Element => {
    const setAppState = useSetAtom(Atom.appState);

    const handleClick = (): void => {
        setAppState((a) => a.copyWith({ onSharpeningFilter: false }));
    };

    return (
        <IconBlueButton.Button onClick={handleClick}>
            <Sparkle
                className={Object.values(IconBlueButton.className).join(" ")}
            />
        </IconBlueButton.Button>
    );
};

const SharpeningFilterIconButton = (): JSX.Element => {
    const setAppState = useSetAtom(Atom.appState);

    const handleClick = (): void => {
        setAppState((a) => a.copyWith({ onSharpeningFilter: true }));
    };

    return (
        <IconButton.Button onClick={handleClick}>
            <Sparkle
                className={Object.values(IconButton.className).join(" ")}
            />
        </IconButton.Button>
    );
};
