import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import {
  SizeEnum,
  TapAreaSize,
  type SizeType,
} from "../../../../domain/models/userSettings/valueObjects/tapAreaSize";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { SegmentGroup, type SegmentGroupItem } from "../../utils/SegmentGroup";

export const TapAreaHeightSegmentGroup = (): JSX.Element => {
  const tapAreaSize = useAtomValue(UserSettingsAtom.tapAreaSize);
  const setUserSettings = useSetAtom(Atom.userSettings);

  const handleValueChange = (value: string | null): void => {
    setUserSettings((u) =>
      UserSettings.setTapAreaSize(
        u,
        TapAreaSize.copyWith(u.tapAreaSize, { height: value as SizeType }),
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

const getItems = (): SegmentGroupItem[] => {
  return Object.values(SizeEnum).map((v) => ({ value: v, label: getSizeLabel(v) }));
};

const getSizeLabel = (value: SizeType): string => {
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
