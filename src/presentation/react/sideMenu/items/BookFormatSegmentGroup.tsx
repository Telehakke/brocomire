import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import {
  BookFormat,
  BookFormatEnum,
  type BookFormatType,
} from "../../../../domain/models/userSettings/valueObjects/bookFormat";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { SegmentGroup, type SegmentGroupItem } from "../../utils/SegmentGroup";

export const BookFormatSegmentGroup = (): JSX.Element => {
  const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);
  const setUserSettings = useSetAtom(Atom.userSettings);

  const handleValueChange = (value: string | null): void => {
    setUserSettings((u) =>
      UserSettings.setBookFormat(u, value as BookFormat, new LocalStorageUserSettingsRepository()),
    );
  };

  return (
    <SegmentGroup
      label="書式"
      items={getItems()}
      value={bookFormat}
      onValueChange={handleValueChange}
    />
  );
};

const getItems = (): SegmentGroupItem[] => {
  return Object.values(BookFormatEnum).map((v) => ({
    value: v,
    label: getBookFormatLabel(v),
  }));
};

const getBookFormatLabel = (key: BookFormatType): string => {
  switch (key) {
    case "vertical":
      return "縦書き";
    case "horizontal":
      return "横書き";
    default:
      exhaustiveCheck(key);
      throw new Error();
  }
};
