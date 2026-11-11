import type { JSX } from "solid-js/jsx-runtime";
import { setDisplayMode } from "../../../../domain/models/userSettings/userSettings";
import {
  getDisplayModeValues,
  type DisplayMode,
  type DisplayModeValue,
} from "../../../../domain/models/userSettings/valueObjects/displayMode";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { SegmentGroup, type SegmentGroupItem } from "../../utils/SegmentGroup";

export const DisplayModeSegmentGroup = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;

  const handleValueChange = (value: string | null): void => {
    setUserSettings((v) =>
      setDisplayMode(v, value as DisplayMode, new LocalStorageUserSettingsRepository()),
    );
  };

  return (
    <SegmentGroup
      label="画像の表示数"
      items={getItems()}
      value={userSettings.displayMode}
      onValueChange={handleValueChange}
    />
  );
};

/* -------------------------------------------------------------------------- */

const getItems = (): SegmentGroupItem[] => {
  return getDisplayModeValues().map((v) => ({
    value: v,
    label: getDisplayModeLabel(v),
  }));
};

const getDisplayModeLabel = (value: DisplayModeValue): string => {
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
