import { atom, useSetAtom } from "jotai";
import { FileImage } from "lucide-react";
import type { ChangeEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { getOnViewerStore } from "../../../application/appState/onViewer";
import { openImageFiles } from "../../../application/file/openImageFiles";
import { getFileNavigatorStore } from "../../../domain/models/file/fileNavigator";
import { getNotificationStore } from "../../../domain/models/notification/notification";
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
  openImageFiles({
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
    userSettingsGetter: () => get(Atom.userSettings),
    viewerManager: get(viewerManagerAtom),
  });
});

export const ImageFilesOpenButton = (): JSX.Element => {
  const openImageFiles = useSetAtom(openImageFilesAtom);

  const handleChange = (ev: ChangeEvent<HTMLInputElement, HTMLInputElement>): void => {
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
