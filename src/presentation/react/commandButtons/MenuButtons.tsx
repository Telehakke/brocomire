import { useSetAtom } from "jotai";
import { EllipsisVertical } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { Atom } from "../../atoms";
import { IconButton } from "../utils/IconButton";

export const SideMenuOpenButton = (): JSX.Element => {
    const setAppState = useSetAtom(Atom.appState);

    const handleClick = (): void => {
        setAppState((a) => a.copyWith({ isOpenSideMenu: true }));
    };

    return (
        <IconButton.Button onClick={handleClick}>
            <EllipsisVertical
                className={Object.values(IconButton.className).join(" ")}
            />
        </IconButton.Button>
    );
};
