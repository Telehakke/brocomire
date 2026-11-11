import { FileArchive } from "lucide-solid";
import type { JSX } from "solid-js/jsx-runtime";
import { openFile } from "../../../application/file/openFile";
import { ZipFileManager } from "../../../infrastructure/file/zipFileManager";
import { LocalStorageUserSettingsRepository } from "../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import {
  fileManagerSignal,
  fileNavigatorSignal,
  notificationSignal,
  onViewerSignal,
  scrollPercentage2DSignal,
  userSettingsStore,
} from "../../signals";
import { FileOpenButton } from "./FileOpenButtons";

export const ZipFileOpenButton = (): JSX.Element => {
  const handleChange = (ev: Event & { target: HTMLInputElement }): void => {
    const file = ev.target.files?.[0];
    if (file == null) return;

    void runOpenZipFile(file);
    ev.target.value = "";
  };

  return (
    <FileOpenButton text="Zipファイルを開く" accept=".zip" onChange={(ev) => handleChange(ev)}>
      <FileArchive class="size-8" />
    </FileOpenButton>
  );
};

const runOpenZipFile = async (file: File): Promise<void> => {
  const [fileManager, setFileManager] = fileManagerSignal;
  const [fileNavigator, setFileNavigator] = fileNavigatorSignal;
  const [, setNotification] = notificationSignal;
  const [, setOnViewer] = onViewerSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings, setUserSettings] = userSettingsStore;

  setFileManager(await ZipFileManager.create(file));
  void openFile(
    fileManager(),
    () => fileNavigator(),
    (v) => setFileNavigator(v),
    (v) => setNotification(v),
    (v) => setOnViewer(v),
    scrollPercentage2D(),
    () => userSettings,
    (v) => setUserSettings(v),
    new LocalStorageUserSettingsRepository(),
  );
};
