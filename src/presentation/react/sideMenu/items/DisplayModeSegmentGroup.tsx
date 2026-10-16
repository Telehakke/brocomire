import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import * as UserSettings from "../../../../domain/models/userSettings/userSettings";
import * as DisplayMode from "../../../../domain/models/userSettings/valueObjects/displayMode";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { SegmentGroup, type SegmentGroupItem } from "../../utils/SegmentGroup";

export const DisplayModeSegmentGroup = (): JSX.Element => {
  const displayMode = useAtomValue(UserSettingsAtom.displayMode);
  const setUserSettings = useSetAtom(Atom.userSettings);

  const handleValueChange = (value: string | null): void => {
    setUserSettings((v) =>
      UserSettings.setDisplayMode(
        v,
        value as DisplayMode.DisplayMode,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <SegmentGroup
      label="画像の表示数"
      items={getItems()}
      value={displayMode}
      onValueChange={handleValueChange}
    />
  );
};

/* -------------------------------------------------------------------------- */

const getItems = (): SegmentGroupItem[] => {
  return DisplayMode.getValues().map((v) => ({
    value: v,
    label: getDisplayModeLabel(v),
  }));
};

const getDisplayModeLabel = (value: DisplayMode.DisplayModeValue): string => {
  switch (value) {
    case "single":
      return "1";
    case "book":
      return "1・2";
    case "double":
      return "2";
    default:
      exhaustiveCheck(value);
      throw new Error();
  }
};
