import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import {
  ScrollStepCount,
  ScrollStepCountEnum,
  type ScrollStepCountType,
} from "../../../../domain/models/userSettings/valueObjects/scrollStepCount";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { SegmentGroup, type SegmentGroupItem } from "../../utils/SegmentGroup";

export const ScrollStepCountSegmentGroup = (): JSX.Element => {
  const scrollStepCount = useAtomValue(UserSettingsAtom.scrollStepCount);
  const setUserSettings = useSetAtom(Atom.userSettings);

  const handleValueChange = (value: string | null): void => {
    setUserSettings((u) =>
      UserSettings.setScrollStepCount(
        u,
        value as ScrollStepCount,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <SegmentGroup
      label="スクロールステップ数"
      items={getItems()}
      value={scrollStepCount}
      onValueChange={handleValueChange}
    />
  );
};

const getItems = (): SegmentGroupItem[] => {
  return Object.values(ScrollStepCountEnum).map((v) => ({
    value: v,
    label: getScrollStepCountLabel(v),
  }));
};

const getScrollStepCountLabel = (value: ScrollStepCountType): string => {
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
