import { atom, useSetAtom } from "jotai";
import { FileImage } from "lucide-react";
import type { ChangeEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { createOnViewerStore } from "../../../application/appState/onViewer";
import { openImageFiles } from "../../../application/file/openImageFiles";
import { createFileNavigatorStore } from "../../../domain/models/file/fileNavigator";
import { createNotificationStore } from "../../../domain/models/notification/notification";
import { ImageFileManger } from "../../../infrastructure/file/imageFileManager";
import {
  fileManagerAtom,
  fileNavigatorAtom,
  notificationAtom,
  onViewerAtom,
  scrollPercentage2DAtom,
  userSettingsAtom,
} from "../../atoms";
import { FileOpenButton } from "./FileOpenButtons";

const openImageFilesAtom = atom(null, (get, set, files: File[]) => {
  set(fileManagerAtom, ImageFileManger.create(files));
  openImageFiles(
    get(fileManagerAtom),
    createFileNavigatorStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    createNotificationStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    createOnViewerStore(
      () => get(onViewerAtom),
      (v) => set(onViewerAtom, v),
    ),
    get(scrollPercentage2DAtom),
    () => get(userSettingsAtom),
  );
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
