import type { JSX } from "solid-js/jsx-runtime";
import { setScrollStepCount } from "../../../../domain/models/userSettings/userSettings";
import {
  getScrollStepCountValues,
  type ScrollStepCount,
  type ScrollStepCountValue,
} from "../../../../domain/models/userSettings/valueObjects/scrollStepCount";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { SegmentGroup, type SegmentGroupItem } from "../../utils/SegmentGroup";

export const ScrollStepCountSegmentGroup = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;

  const handleValueChange = (value: string | null): void => {
    setUserSettings((v) =>
      setScrollStepCount(v, value as ScrollStepCount, new LocalStorageUserSettingsRepository()),
    );
  };

  return (
    <SegmentGroup
      label="スクロールステップ数"
      items={getItems()}
      value={userSettings.scrollStepCount}
      onValueChange={handleValueChange}
    />
  );
};

/* -------------------------------------------------------------------------- */

const getItems = (): SegmentGroupItem[] => {
  return getScrollStepCountValues().map((v) => ({
    value: v,
    label: getScrollStepCountLabel(v),
  }));
};

const getScrollStepCountLabel = (value: ScrollStepCountValue): string => {
  switch (value) {
    case "four":
      return "4";
    case "six":
      return "6";
    default:
      exhaustiveCheck(value);
      throw new Error();
  }
};
