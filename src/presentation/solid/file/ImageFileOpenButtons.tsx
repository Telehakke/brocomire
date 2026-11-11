import { FileImage } from "lucide-solid";
import type { JSX } from "solid-js/jsx-runtime";
import { openImageFiles } from "../../../application/file/openImageFiles";
import { ImageFileManger } from "../../../infrastructure/file/imageFileManager";
import {
  fileManagerSignal,
  fileNavigatorSignal,
  notificationSignal,
  onViewerSignal,
  scrollPercentage2DSignal,
  userSettingsStore,
} from "../../signals";
import { FileOpenButton } from "./FileOpenButtons";

export const ImageFilesOpenButton = (): JSX.Element => {
  const handleChange = (ev: Event & { target: HTMLInputElement }): void => {
    const files = ev.target.files;
    if (files == null) return;

    runOpenImageFiles(Array.from(files));
    ev.target.value = "";
  };

  return (
    <FileOpenButton text="画像ファイルを開く" accept="image/*" multiple onChange={handleChange}>
      <FileImage class="size-8" />
    </FileOpenButton>
  );
};

/* -------------------------------------------------------------------------- */

const runOpenImageFiles = (files: File[]): void => {
  const [fileManager, setFileManager] = fileManagerSignal;
  const [fileNavigator, setFileNavigator] = fileNavigatorSignal;
  const [, setNotification] = notificationSignal;
  const [, setOnViewer] = onViewerSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;

  setFileManager(ImageFileManger.create(files));
  openImageFiles(
    fileManager(),
    () => fileNavigator(),
    (v) => setFileNavigator(v),
    (v) => setNotification(v),
    (v) => setOnViewer(v),
    scrollPercentage2D(),
    () => userSettings,
  );
};
