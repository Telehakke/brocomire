import type { JSX } from "solid-js/jsx-runtime";
import { BookFormatEnum } from "../../../domain/models/userSettings/valueObjects/bookFormat";
import { fileNavigatorSignal, userSettingsStore } from "../../signals";
import { LinearProgress } from "../utils/LinearProgress";

export const ProgressBar = (): JSX.Element => {
  const [userSettings] = userSettingsStore;
  const [fileNavigator] = fileNavigatorSignal;

  return (
    <LinearProgress
      className={`w-8/10 ${userSettings.bookFormat === BookFormatEnum.vertical ? "-scale-x-100" : ""}`}
      max={fileNavigator().fileLength - 1}
      value={fileNavigator().currentIndex}
    />
  );
};
