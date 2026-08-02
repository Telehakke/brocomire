import { useSetAtom } from "jotai";
import { EllipsisVertical } from "lucide-react";
import type { JSX } from "react";
import { Atom } from "../../atoms";
import { IconButton } from "../../components/IconButton";

export const MenuButton = (): JSX.Element => {
    const setIsOpenSideMenu = useSetAtom(Atom.isOpenSideMenu);

    return (
        <IconButton.Button onClick={() => setIsOpenSideMenu(true)}>
            <EllipsisVertical
                className={Object.values(IconButton.iconClassName).join(" ")}
            />
        </IconButton.Button>
    );
};
