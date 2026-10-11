import { atom, useSetAtom } from "jotai";
import { BookX } from "lucide-react";
import type { JSX } from "react";
import { IsOpenSideMenu } from "../../../../application/appState/valueObjects/isOpenSideMenu";
import { OnViewer } from "../../../../application/appState/valueObjects/onViewer";
import { closeViewer } from "../../../../application/viewer/closeViewer";
import { FileNavigator } from "../../../../domain/models/file/fileNavigator";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import { ZoomPercentage } from "../../../../domain/models/zoom/zoomPercentage";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import {
  Atom,
  fileManagerAtom,
  fileNavigatorAtom,
  isOpenSideMenuAtom,
  onViewerAtom,
  zoomPercentageAtom,
} from "../../../atoms";
import { LargeIconButton } from "../../utils/LargeIconButton";

const closeViewerAtom = atom(null, (get, set) => {
  const fileNavigatorStore = FileNavigator.getStore(
    () => get(fileNavigatorAtom),
    (v) => set(fileNavigatorAtom, v),
  );
  const isOpenSideMenuStore = IsOpenSideMenu.getStore(
    () => get(isOpenSideMenuAtom),
    (v) => set(isOpenSideMenuAtom, v),
  );
  const onViewerStore = OnViewer.getStore(
    () => get(onViewerAtom),
    (v) => set(onViewerAtom, v),
  );
  const userSettingsStore = UserSettings.getStore(
    () => get(Atom.userSettings),
    (v) => set(Atom.userSettings, v),
  );
  const zoomPercentageStore = ZoomPercentage.getStore(
    () => get(zoomPercentageAtom),
    (v) => set(zoomPercentageAtom, v),
  );
  closeViewer(
    get(fileManagerAtom),
    fileNavigatorStore,
    isOpenSideMenuStore,
    onViewerStore,
    userSettingsStore,
    new LocalStorageUserSettingsRepository(),
    zoomPercentageStore,
  );
});

export const ViewerCloseButton = (): JSX.Element => {
  const closeViewer = useSetAtom(closeViewerAtom);

  return (
    <LargeIconButton text="本を閉じる" onClick={closeViewer}>
      <BookX className="size-8" />
    </LargeIconButton>
  );
};
