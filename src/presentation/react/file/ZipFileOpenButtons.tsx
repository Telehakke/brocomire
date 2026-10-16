import { atom, useSetAtom } from "jotai";
import { FileArchive } from "lucide-react";
import type { ChangeEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import * as OnViewer from "../../../application/appState/onViewer";
import { openZipFile } from "../../../application/file/openZipFile";
import * as FileNavigator from "../../../domain/models/file/fileNavigator";
import * as Notification from "../../../domain/models/notification/notification";
import * as UserSettings from "../../../domain/models/userSettings/userSettings";
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
  void openZipFile({
    cache: get(cacheAtom),
    fileManager: get(fileManagerAtom),
    fileNavigatorStore: FileNavigator.getStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    notificationStore: Notification.getStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    onViewerStore: OnViewer.getStore(
      () => get(onViewerAtom),
      (v) => set(onViewerAtom, v),
    ),
    scrollPercentage2D: get(scrollPercentage2DAtom),
    userSettingsStore: UserSettings.getStore(
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
