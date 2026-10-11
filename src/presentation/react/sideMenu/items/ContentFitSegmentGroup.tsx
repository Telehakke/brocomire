import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import {
  ContentFit,
  ContentFitEnum,
  type ContentFitType,
} from "../../../../domain/models/userSettings/valueObjects/contentFit";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { SegmentGroup, type SegmentGroupItem } from "../../utils/SegmentGroup";

export const ContentFitSegmentGroup = (): JSX.Element => {
  const contentFit = useAtomValue(UserSettingsAtom.contentFit);
  const setUserSettings = useSetAtom(Atom.userSettings);

  const handleValueChange = (value: string | null): void => {
    setUserSettings((u) =>
      UserSettings.setContentFit(u, value as ContentFit, new LocalStorageUserSettingsRepository()),
    );
  };

  return (
    <SegmentGroup
      label="コンテンツフィット"
      items={getItems()}
      value={contentFit}
      onValueChange={handleValueChange}
    />
  );
};

const getItems = (): SegmentGroupItem[] => {
  return Object.values(ContentFitEnum).map((v) => ({
    value: v,
    label: getContentFitLabel(v),
  }));
};

const getContentFitLabel = (value: ContentFitType): string => {
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
