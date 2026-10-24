import { atom, useSetAtom } from "jotai";
import { BookX } from "lucide-react";
import type { JSX } from "react";
import { getBookmarkIndexStore } from "../../../../application/appState/bookmarkIndex";
import { getIsOpenSideMenuStore } from "../../../../application/appState/isOpenSideMenu";
import { getOnViewerStore } from "../../../../application/appState/onViewer";
import { closeViewer } from "../../../../application/viewer/closeViewer";
import { getFileNavigatorStore } from "../../../../domain/models/file/fileNavigator";
import { getUserSettingsStore } from "../../../../domain/models/userSettings/userSettings";
import { getZoomPercentageStore } from "../../../../domain/models/zoom/zoomPercentage";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import {
  Atom,
  bookmarkIndexAtom,
  cacheAtom,
  fileManagerAtom,
  fileNavigatorAtom,
  isOpenSideMenuAtom,
  onViewerAtom,
  zoomPercentageAtom,
} from "../../../atoms";
import { LargeIconButton } from "../../utils/LargeIconButton";

const closeViewerAtom = atom(null, (get, set) => {
  closeViewer({
    bookmarkIndexStore: getBookmarkIndexStore(
      () => get(bookmarkIndexAtom),
      (v) => set(bookmarkIndexAtom, v),
    ),
    cache: get(cacheAtom),
    fileManager: get(fileManagerAtom),
    fileNavigatorStore: getFileNavigatorStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    isOpenSideMenuStore: getIsOpenSideMenuStore(
      () => get(isOpenSideMenuAtom),
      (v) => set(isOpenSideMenuAtom, v),
    ),
    OnViewerStore: getOnViewerStore(
      () => get(onViewerAtom),
      (v) => set(onViewerAtom, v),
    ),
    userSettingsStore: getUserSettingsStore(
      () => get(Atom.userSettings),
      (v) => set(Atom.userSettings, v),
    ),
    userSettingsRepository: new LocalStorageUserSettingsRepository(),
    zoomPercentageStore: getZoomPercentageStore(
      () => get(zoomPercentageAtom),
      (v) => set(zoomPercentageAtom, v),
    ),
  });
});

export const ViewerCloseButton = (): JSX.Element => {
  const closeViewer = useSetAtom(closeViewerAtom);

  return (
    <LargeIconButton text="本を閉じる" onClick={closeViewer}>
      <BookX className="size-8" />
    </LargeIconButton>
  );
};
