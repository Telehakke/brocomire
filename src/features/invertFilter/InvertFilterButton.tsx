import { useAtomValue, useSetAtom } from "jotai";
import { Droplet, DropletOff } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { AppStateAtom, Atom } from "../../atoms";
import { IconButton } from "../../components/IconButton";

export const InvertFilterButton = (): JSX.Element | null => {
    const shouldShowButton = useAtomValue(AppStateAtom.shouldShowInvertButton);
    const setOnInvertFilter = useSetAtom(Atom.onInvertFilter);

    if (!shouldShowButton) return null;
    return (
        <IconButton.Button onClick={() => setOnInvertFilter((v) => !v)}>
            <Icon />
        </IconButton.Button>
    );
};

const Icon = (): JSX.Element => {
    const onInvertFilter = useAtomValue(Atom.onInvertFilter);

    if (onInvertFilter)
        return (
            <DropletOff
                className={Object.values(IconButton.iconClassName).join(" ")}
            />
        );
    return (
        <Droplet
            className={Object.values(IconButton.iconClassName).join(" ")}
        />
    );
};
