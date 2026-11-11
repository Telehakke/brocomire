import { EllipsisVertical } from "lucide-solid";
import type { JSX } from "solid-js/jsx-runtime";
import { createIsOpenSideMenu } from "../../../application/appState/isOpenSideMenu";
import { isOpenSideMenuSignal } from "../../signals";
import { IconButton } from "../utils/IconButton";
import { joinObjectValues } from "../utils/joinObjectValues";

export const SideMenuOpenButton = (): JSX.Element => {
  const [, setIsOpenSideMenu] = isOpenSideMenuSignal;

  const handleClick = (): void => {
    setIsOpenSideMenu(createIsOpenSideMenu(true));
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <EllipsisVertical class={joinObjectValues(IconButton.className)} />
    </IconButton.Button>
  );
};
