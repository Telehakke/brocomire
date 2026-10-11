import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import {
  DisplayMode,
  DisplayModeEnum,
  type DisplayModeType,
} from "../../../../domain/models/userSettings/valueObjects/displayMode";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { SegmentGroup, type SegmentGroupItem } from "../../utils/SegmentGroup";

export const DisplayModeSegmentGroup = (): JSX.Element => {
  const displayMode = useAtomValue(UserSettingsAtom.displayMode);
  const setUserSettings = useSetAtom(Atom.userSettings);

  const handleValueChange = (value: string | null): void => {
    setUserSettings((u) =>
      UserSettings.setDisplayMode(
        u,
        value as DisplayMode,
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

const getItems = (): SegmentGroupItem[] => {
  return Object.values(DisplayModeEnum).map((v) => ({
    value: v,
    label: getDisplayModeLabel(v),
  }));
};

const getDisplayModeLabel = (value: DisplayModeType): string => {
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
