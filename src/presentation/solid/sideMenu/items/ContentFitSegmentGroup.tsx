import type { JSX } from "solid-js/jsx-runtime";
import { setContentFit } from "../../../../domain/models/userSettings/userSettings";
import {
  getContentFitValues,
  type ContentFit,
  type ContentFitValue,
} from "../../../../domain/models/userSettings/valueObjects/contentFit";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { SegmentGroup, type SegmentGroupItem } from "../../utils/SegmentGroup";

export const ContentFitSegmentGroup = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;

  const handleValueChange = (value: string | null): void => {
    setUserSettings((v) =>
      setContentFit(v, value as ContentFit, new LocalStorageUserSettingsRepository()),
    );
  };

  return (
    <SegmentGroup
      label="コンテンツフィット"
      items={getItems()}
      value={userSettings.contentFit}
      onValueChange={handleValueChange}
    />
  );
};

/* -------------------------------------------------------------------------- */

const getItems = (): SegmentGroupItem[] => {
  return getContentFitValues().map((v) => ({
    value: v,
    label: getContentFitLabel(v),
  }));
};

const getContentFitLabel = (value: ContentFitValue): string => {
  switch (value) {
    case "all":
      return "全体";
    case "fill":
      return "満たす";
    default:
      exhaustiveCheck(value);
      throw new Error();
  }
};
