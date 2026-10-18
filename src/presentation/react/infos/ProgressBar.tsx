import { useAtomValue } from "jotai";
import type { JSX } from "react/jsx-runtime";
import * as BookFormat from "../../../domain/models/userSettings/valueObjects/bookFormat";
import { fileNavigatorAtom, UserSettingsAtom } from "../../atoms";
import { LinearProgress } from "../utils/LinearProgress";

export const ProgressBar = (): JSX.Element | null => {
  const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);
  const fileNavigator = useAtomValue(fileNavigatorAtom);

  return (
    <LinearProgress
      className={`w-8/10 ${BookFormat.isVertical(bookFormat) ? "-scale-x-100" : ""}`}
      max={fileNavigator.fileLength - 1}
      value={fileNavigator.currentIndex}
    />
  );
};
