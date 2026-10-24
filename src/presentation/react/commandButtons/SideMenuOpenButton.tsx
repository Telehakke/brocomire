import { useSetAtom } from "jotai";
import { EllipsisVertical } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { createIsOpenSideMenu } from "../../../application/appState/isOpenSideMenu";
import { isOpenSideMenuAtom } from "../../atoms";
import { IconButton } from "../utils/IconButton";

export const SideMenuOpenButton = (): JSX.Element => {
  const setIsOpenSideMenu = useSetAtom(isOpenSideMenuAtom);

  const handleClick = (): void => {
    setIsOpenSideMenu(createIsOpenSideMenu(true));
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <EllipsisVertical className={Object.values(IconButton.className).join(" ")} />
    </IconButton.Button>
  );
};
