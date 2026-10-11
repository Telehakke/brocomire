import { atom, useSetAtom } from "jotai";
import { FileImage } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { OnViewer } from "../../../application/appState/valueObjects/onViewer";
import { openImageFiles } from "../../../application/file/openImageFiles";
import { FileNavigator } from "../../../domain/models/file/fileNavigator";
import { Notification } from "../../../domain/models/notification/notification";
import { UserSettings } from "../../../domain/models/userSettings/userSettings";
import { ImageFileManger } from "../../../infrastructure/file/imageFileManager";
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

const openImageFilesAtom = atom(null, (get, set, files: File[]) => {
  set(fileManagerAtom, ImageFileManger.create(files));
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
  openImageFiles(
    get(cacheAtom),
    get(fileManagerAtom),
    fileNavigatorStore,
    notificationStore,
    onViewerStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
    get(viewerManagerAtom),
  );
});

export const ImageFilesOpenButton = (): JSX.Element => {
  const openImageFiles = useSetAtom(openImageFilesAtom);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement, HTMLInputElement>): void => {
    const files = ev.currentTarget.files;
    if (files == null) return;
    openImageFiles(Array.from(files));
    ev.currentTarget.value = "";
  };

  return (
    <FileOpenButton text="画像ファイルを開く" accept="image/*" multiple onChange={handleChange}>
      <FileImage className="size-8" />
    </FileOpenButton>
  );
};
