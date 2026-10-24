import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { setTapAreaSize } from "../../../../domain/models/userSettings/userSettings";
import {
  copyTapAreaSizeWith,
  getSizeValues,
  type SizeValue,
} from "../../../../domain/models/userSettings/valueObjects/tapAreaSize";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { SegmentGroup, type SegmentGroupItem } from "../../utils/SegmentGroup";

export const TapAreaHeightSegmentGroup = (): JSX.Element => {
  const tapAreaSize = useAtomValue(UserSettingsAtom.tapAreaSize);
  const setUserSettings = useSetAtom(Atom.userSettings);

  const handleValueChange = (value: string | null): void => {
    setUserSettings((v) =>
      setTapAreaSize(
        v,
        copyTapAreaSizeWith(v.tapAreaSize, { height: value as SizeValue }),
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <SegmentGroup
      label="下タップエリアの高さ"
      items={getItems()}
      value={tapAreaSize.height}
      onValueChange={handleValueChange}
    />
  );
};

/* -------------------------------------------------------------------------- */

const getItems = (): SegmentGroupItem[] => {
  return getSizeValues().map((v) => ({
    value: v,
    label: getSizeLabel(v),
  }));
};

const getSizeLabel = (value: SizeValue): string => {
  switch (value) {
    case "none":
      return "-";
    case "s":
      return "S";
    case "m":
      return "M";
    case "l":
      return "L";
    default:
      exhaustiveCheck(value);
      throw new Error();
  }
};
