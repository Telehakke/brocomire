import { atom, useSetAtom } from "jotai";
import { BookX } from "lucide-react";
import type { JSX } from "react";
import * as BookmarkIndex from "../../../../application/appState/bookmarkIndex";
import * as IsOpenSideMenu from "../../../../application/appState/isOpenSideMenu";
import * as OnViewer from "../../../../application/appState/onViewer";
import { closeViewer } from "../../../../application/viewer/closeViewer";
import * as FileNavigator from "../../../../domain/models/file/fileNavigator";
import * as UserSettings from "../../../../domain/models/userSettings/userSettings";
import * as ZoomPercentage from "../../../../domain/models/zoom/zoomPercentage";
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
    bookmarkIndexStore: BookmarkIndex.getStore(
      () => get(bookmarkIndexAtom),
      (v) => set(bookmarkIndexAtom, v),
    ),
    cache: get(cacheAtom),
    fileManager: get(fileManagerAtom),
    fileNavigatorStore: FileNavigator.getStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    isOpenSideMenuStore: IsOpenSideMenu.getStore(
      () => get(isOpenSideMenuAtom),
      (v) => set(isOpenSideMenuAtom, v),
    ),
    OnViewerStore: OnViewer.getStore(
      () => get(onViewerAtom),
      (v) => set(onViewerAtom, v),
    ),
    userSettingsStore: UserSettings.getStore(
      () => get(Atom.userSettings),
      (v) => set(Atom.userSettings, v),
    ),
    userSettingsRepository: new LocalStorageUserSettingsRepository(),
    zoomPercentageStore: ZoomPercentage.getStore(
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
