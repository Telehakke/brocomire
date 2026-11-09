import { atom, useSetAtom } from "jotai";
import { FileText } from "lucide-react";
import type { ChangeEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { createOnViewerStore } from "../../../application/appState/onViewer";
import { openFile } from "../../../application/file/openFile";
import { createFileNavigatorStore } from "../../../domain/models/file/fileNavigator";
import { createNotificationStore } from "../../../domain/models/notification/notification";
import { createUserSettingsStore } from "../../../domain/models/userSettings/userSettings";
import { PDFFileManager } from "../../../infrastructure/file/pdfFileManager";
import { LocalStorageUserSettingsRepository } from "../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import {
  fileManagerAtom,
  fileNavigatorAtom,
  notificationAtom,
  onViewerAtom,
  scrollPercentage2DAtom,
  userSettingsAtom,
} from "../../atoms";
import { FileOpenButton } from "./FileOpenButtons";

const openPDFFileAtom = atom(null, async (get, set, file: File) => {
  set(fileManagerAtom, await PDFFileManager.create(file));
  void openFile(
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
    createUserSettingsStore(
      () => get(userSettingsAtom),
      (v) => set(userSettingsAtom, v),
    ),
    new LocalStorageUserSettingsRepository(),
  );
});

export const PDFFileOpenButton = (): JSX.Element => {
  const openPDFFile = useSetAtom(openPDFFileAtom);

  const handleChange = (ev: ChangeEvent<HTMLInputElement, HTMLInputElement>): void => {
    const file = ev.currentTarget.files?.[0];
    if (file == null) return;

    void openPDFFile(file);
    ev.currentTarget.value = "";
  };

  return (
    <FileOpenButton text="PDFファイルを開く" accept=".pdf" onChange={(ev) => handleChange(ev)}>
      <FileText className="size-8" />
    </FileOpenButton>
  );
};
