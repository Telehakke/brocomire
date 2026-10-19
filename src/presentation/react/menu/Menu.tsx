import { useAtom, useAtomValue } from "jotai";
import type { CSSProperties } from "react";
import type { JSX } from "react/jsx-runtime";
import * as InfoVisibility from "../../../application/appState/infoVisibility";
import { infoVisibilityAtom, UserSettingsAtom } from "../../atoms";
import { BookmarkButton } from "../commandButtons/BookmarkButton";
import { FullscreenButton } from "../commandButtons/FullscreenButton";
import { InvertFilterButton } from "../commandButtons/InvertFilterButton";
import { SharpeningFilterButton } from "../commandButtons/SharpeningFilterButton";
import { SideMenuOpenButton } from "../commandButtons/SideMenuOpenButton";
import { ClockView } from "../infos/ClockView";
import { ProgressBar } from "../infos/ProgressBar";
import {
  safeAreaPaddingLeft,
  safeAreaPaddingRight,
  safeAreaPaddingTop,
} from "../utils/safeAreaPadding";

export const Menu = (): JSX.Element | null => {
  const [infoVisibility, setInfoVisibility] = useAtom(infoVisibilityAtom);
  const menuOpacity = useAtomValue(UserSettingsAtom.menuOpacity);
  const shouldShowProgressBar = useAtomValue(UserSettingsAtom.shouldShowProgressBar);

  const handleAnimationEnd = (): void => {
    if (!InfoVisibility.isFadeOut(infoVisibility)) return;

    setInfoVisibility(() => InfoVisibility.create("none"));
  };

  return (
    <>
      {InfoVisibility.isNone(infoVisibility) || (
        <div
          className="data-[state=visible]:animate-fade-in data-[state=fade-out]:animate-fade-out data-[state=fade-out]:opacity-0"
          data-state={infoVisibility}
          onAnimationEnd={handleAnimationEnd}
        >
          <div style={{ opacity: `${menuOpacity}%` }}>
            <LeftTopGroup />
            <RightTopGroup />
            {shouldShowProgressBar || <BottomGroup />}
          </div>
        </div>
      )}
      {shouldShowProgressBar && <BottomGroup style={{ opacity: `${menuOpacity}%` }} />}
    </>
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
      <ClockView />
    </div>
  );
};

const BottomGroup = (props: { style?: CSSProperties }): JSX.Element => {
  return (
    <div
      className="fixed bottom-1 left-1/2 grid w-full -translate-x-1/2 place-items-center"
      style={props.style}
    >
      <ProgressBar />
    </div>
  );
};
