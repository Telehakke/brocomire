import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { InfoVisibility } from "../../../application/appState/valueObjects/infoVisibility";
import { infoVisibilityAtom } from "../../atoms";
import { ClockView } from "../clock/ClockView";
import { FullscreenButton } from "../commandButtons/FullscreenButton";
import { InvertFilterButton } from "../commandButtons/InvertFilterButton";
import { SideMenuOpenButton } from "../commandButtons/MenuButtons";
import { SharpeningFilterButton } from "../commandButtons/SharpeningFilterButton";
import { PageNumber } from "../info/PageNumber";
import {
  safeAreaPaddingLeft,
  safeAreaPaddingRight,
  safeAreaPaddingTop,
} from "../utils/safeAreaPadding";

export const Menu = (): JSX.Element | null => {
  const infoVisibility = useAtomValue(infoVisibilityAtom);
  const setInfoVisibility = useSetAtom(infoVisibilityAtom);

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
        <FullscreenButton />
      </div>
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
    </div>
  );
};
