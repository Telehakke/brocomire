import { useAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import * as InfoVisibility from "../../../application/appState/infoVisibility";
import { infoVisibilityAtom } from "../../atoms";
import { ClockView } from "../clock/ClockView";
import { BookmarkButton } from "../commandButtons/BookmarkButton";
import { FullscreenButton } from "../commandButtons/FullscreenButton";
import { InvertFilterButton } from "../commandButtons/InvertFilterButton";
import { SharpeningFilterButton } from "../commandButtons/SharpeningFilterButton";
import { SideMenuOpenButton } from "../commandButtons/SideMenuOpenButton";
import { PageNumber } from "../info/PageNumber";
import {
  safeAreaPaddingLeft,
  safeAreaPaddingRight,
  safeAreaPaddingTop,
} from "../utils/safeAreaPadding";

export const Menu = (): JSX.Element | null => {
  const [infoVisibility, setInfoVisibility] = useAtom(infoVisibilityAtom);

  const handleAnimationEnd = (): void => {
    if (!InfoVisibility.isFadeOut(infoVisibility)) return;

    setInfoVisibility(() => InfoVisibility.create("none"));
  };

  if (InfoVisibility.isNone(infoVisibility)) return null;
  return (
    <div
      className="data-[state=visible]:animate-fade-in data-[state=fade-out]:animate-fade-out data-[state=fade-out]:opacity-0"
      data-state={infoVisibility}
      onAnimationEnd={handleAnimationEnd}
    >
      <LeftTopGroup />
      <RightTopGroup />
    </div>
  );
};

/* -------------------------------------------------------------------------- */

const LeftTopGroup = (): JSX.Element => {
  return (
    <div
      className="fixed top-4 left-4 flex gap-4"
      style={{
        ...safeAreaPaddingTop(),
        ...safeAreaPaddingLeft(),
      }}
    >
      <SideMenuOpenButton />
      <SharpeningFilterButton />
      <InvertFilterButton />
      <BookmarkButton />
      <FullscreenButton />
    </div>
  );
};

const RightTopGroup = (): JSX.Element => {
  return (
    <div
      className="fixed top-4 right-4 flex gap-2 text-xs"
      style={{
        ...safeAreaPaddingTop(),
        ...safeAreaPaddingRight(),
      }}
    >
      <PageNumber />
      <ClockView />
    </div>
  );
};
