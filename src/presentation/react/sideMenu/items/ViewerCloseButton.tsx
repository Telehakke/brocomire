import { atom, useSetAtom } from "jotai";
import { BookX } from "lucide-react";
import type { JSX } from "react";
import { createBookmarkIndexStore } from "../../../../application/appState/bookmarkIndex";
import { createIsOpenSideMenuStore } from "../../../../application/appState/isOpenSideMenu";
import { createOnViewerStore } from "../../../../application/appState/onViewer";
import { closeViewer } from "../../../../application/viewer/closeViewer";
import { createUserSettingsStore } from "../../../../domain/models/userSettings/userSettings";
import { createZoomPercentageStore } from "../../../../domain/models/zoom/zoomPercentage";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import {
  bookmarkIndexAtom,
  cacheAtom,
  fileManagerAtom,
  fileNavigatorAtom,
  isOpenSideMenuAtom,
  onViewerAtom,
  userSettingsAtom,
  zoomPercentageAtom,
} from "../../../atoms";
import { LargeIconButton } from "../../utils/LargeIconButton";

const closeViewerAtom = atom(null, (get, set) => {
  closeViewer(
    createBookmarkIndexStore(
      () => get(bookmarkIndexAtom),
      (v) => set(bookmarkIndexAtom, v),
    ),
    get(cacheAtom),
    get(fileManagerAtom),
    () => get(fileNavigatorAtom),
    createIsOpenSideMenuStore(
      () => get(isOpenSideMenuAtom),
      (v) => set(isOpenSideMenuAtom, v),
    ),
    createOnViewerStore(
      () => get(onViewerAtom),
      (v) => set(onViewerAtom, v),
    ),
    createUserSettingsStore(
      () => get(userSettingsAtom),
      (v) => set(userSettingsAtom, v),
    ),
    new LocalStorageUserSettingsRepository(),
    createZoomPercentageStore(
      () => get(zoomPercentageAtom),
      (v) => set(zoomPercentageAtom, v),
    ),
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
