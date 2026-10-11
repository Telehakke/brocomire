import { atom, useSetAtom } from "jotai";
import { FileArchive } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { OnViewer } from "../../../application/appState/valueObjects/onViewer";
import { openZipFile } from "../../../application/file/openZipFile";
import { FileNavigator } from "../../../domain/models/file/fileNavigator";
import { Notification } from "../../../domain/models/notification/notification";
import { UserSettings } from "../../../domain/models/userSettings/userSettings";
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
  const fileNavigatorStore = FileNavigator.getStore(
    () => get(fileNavigatorAtom),
    (v) => set(fileNavigatorAtom, v),
  );
  const notificationStore = Notification.getStore(
    () => get(notificationAtom),
    (v) => set(notificationAtom, v),
  );
  const onViewerStore = OnViewer.getStore(
    () => get(onViewerAtom),
    (v) => set(onViewerAtom, v),
  );
  const userSettingsStore = UserSettings.getStore(
    () => get(Atom.userSettings),
    (v) => set(Atom.userSettings, v),
  );
  await openZipFile(
    get(cacheAtom),
    get(fileManagerAtom),
    fileNavigatorStore,
    notificationStore,
    onViewerStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
    new LocalStorageUserSettingsRepository(),
    get(viewerManagerAtom),
  );
});

export const ZipFileOpenButton = (): JSX.Element => {
  const openZipFile = useSetAtom(openZipFileAtom);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement, HTMLInputElement>): void => {
    const file = ev.currentTarget.files?.[0];
    if (file == null) return;
    ev.currentTarget.value = "";
    void openZipFile(file);
  };

  return (
    <FileOpenButton text="Zipファイルを開く" accept=".zip" onChange={(ev) => handleChange(ev)}>
      <FileArchive className="size-8" />
    </FileOpenButton>
  );
};
