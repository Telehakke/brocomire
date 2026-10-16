import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import * as UserSettings from "../../../../domain/models/userSettings/userSettings";
import * as ScrollStepCount from "../../../../domain/models/userSettings/valueObjects/scrollStepCount";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { SegmentGroup, type SegmentGroupItem } from "../../utils/SegmentGroup";

export const ScrollStepCountSegmentGroup = (): JSX.Element => {
  const scrollStepCount = useAtomValue(UserSettingsAtom.scrollStepCount);
  const setUserSettings = useSetAtom(Atom.userSettings);

  const handleValueChange = (value: string | null): void => {
    setUserSettings((v) =>
      UserSettings.setScrollStepCount(
        v,
        value as ScrollStepCount.ScrollStepCount,
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

/* -------------------------------------------------------------------------- */

const getItems = (): SegmentGroupItem[] => {
  return ScrollStepCount.getValues().map((v) => ({
    value: v,
    label: getScrollStepCountLabel(v),
  }));
};

const getScrollStepCountLabel = (value: ScrollStepCount.ScrollStepCountValue): string => {
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
