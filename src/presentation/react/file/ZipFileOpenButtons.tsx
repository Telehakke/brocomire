import { atom, useSetAtom } from "jotai";
import { FileArchive } from "lucide-react";
import type { ChangeEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { getOnViewerStore } from "../../../application/appState/onViewer";
import { openFile } from "../../../application/file/openFile";
import { getFileNavigatorStore } from "../../../domain/models/file/fileNavigator";
import { getNotificationStore } from "../../../domain/models/notification/notification";
import { getUserSettingsStore } from "../../../domain/models/userSettings/userSettings";
import { ZipFileManager } from "../../../infrastructure/file/zipFileManager";
import { LocalStorageUserSettingsRepository } from "../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import {
  Atom,
  cacheAtom,
  fileManagerAtom,
  fileNavigatorAtom,
  notificationAtom,
  onViewerAtom,
  scrollPercentage2DAtom,
  viewerManagerAtom,
} from "../../atoms";
import { FileOpenButton } from "./FileOpenButtons";

const openZipFileAtom = atom(null, async (get, set, file: File) => {
  set(fileManagerAtom, await ZipFileManager.create(file));
  void openFile({
    cache: get(cacheAtom),
    fileManager: get(fileManagerAtom),
    fileNavigatorStore: getFileNavigatorStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    notificationStore: getNotificationStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    onViewerStore: getOnViewerStore(
      () => get(onViewerAtom),
      (v) => set(onViewerAtom, v),
    ),
    scrollPercentage2D: get(scrollPercentage2DAtom),
    userSettingsStore: getUserSettingsStore(
      () => get(Atom.userSettings),
      (v) => set(Atom.userSettings, v),
    ),
    userSettingsRepository: new LocalStorageUserSettingsRepository(),
    viewerManager: get(viewerManagerAtom),
  });
});

export const ZipFileOpenButton = (): JSX.Element => {
  const openZipFile = useSetAtom(openZipFileAtom);

  const handleChange = (ev: ChangeEvent<HTMLInputElement, HTMLInputElement>): void => {
    const file = ev.currentTarget.files?.[0];
    if (file == null) return;

    void openZipFile(file);
    ev.currentTarget.value = "";
  };

  return (
    <FileOpenButton text="Zipファイルを開く" accept=".zip" onChange={(ev) => handleChange(ev)}>
      <FileArchive className="size-8" />
    </FileOpenButton>
  );
};
