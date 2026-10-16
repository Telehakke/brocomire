import { useAtomValue } from "jotai";
import type { JSX } from "react/jsx-runtime";
import * as BookFormat from "../../../../domain/models/userSettings/valueObjects/bookFormat";
import { fileNavigatorAtom, UserSettingsAtom } from "../../../atoms";
import { LinearProgress } from "../../utils/LinearProgress";

export const ProgressBar = (): JSX.Element | null => {
  const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);
  const fileNavigator = useAtomValue(fileNavigatorAtom);
  const shouldShowProgressBar = useAtomValue(UserSettingsAtom.shouldShowProgressBar);

  const className = {
    _: "fixed bottom-1 left-1/2 w-8/10 -translate-x-1/2",
    scale: BookFormat.isVertical(bookFormat) ? "-scale-x-100" : "",
  };

  if (!shouldShowProgressBar) return null;
  return (
    <LinearProgress
      className={Object.values(className).join(" ")}
      max={fileNavigator.fileLength - 1}
      value={fileNavigator.currentIndex}
    />
  );
};
