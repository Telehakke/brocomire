import { Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import {
  createInfoVisibility,
  InfoVisibilityEnum,
} from "../../../application/appState/infoVisibility";
import { infoVisibilitySignal, userSettingsStore } from "../../signals";
import { BookmarkButton } from "../commandButtons/BookmarkButton";
import { FullscreenButton } from "../commandButtons/FullscreenButton";
import { InvertFilterButton } from "../commandButtons/InvertFilterButton";
import { InvertLightnessButton } from "../commandButtons/InvertLightnessButton";
import { SharpeningFilterButton } from "../commandButtons/SharpeningFilterButton";
import { SideMenuOpenButton } from "../commandButtons/SideMenuOpenButton";
import { ClockView } from "../infos/ClockView";
import { ProgressBar } from "../infos/ProgressBar";
import {
  safeAreaPaddingLeft,
  safeAreaPaddingRight,
  safeAreaPaddingTop,
} from "../utils/safeAreaPadding";

export const Menu = (): JSX.Element => {
  const [infoVisibility, setInfoVisibility] = infoVisibilitySignal;
  const [userSettings] = userSettingsStore;

  const handleAnimationEnd = (): void => {
    if (infoVisibility() !== InfoVisibilityEnum.fadeOut) return;

    setInfoVisibility(createInfoVisibility("none"));
  };

  return (
    <>
      <Show when={infoVisibility() !== InfoVisibilityEnum.none}>
        <div
          class="data-[state=visible]:animate-fade-in data-[state=fade-out]:animate-fade-out data-[state=fade-out]:opacity-0"
          data-state={infoVisibility()}
          onAnimationEnd={handleAnimationEnd}
        >
          <div style={{ opacity: `${userSettings.menuOpacity}%` }}>
            <LeftTopGroup />
            <RightTopGroup />
            <Show when={!userSettings.shouldShowProgressBar}>
              <BottomGroup />
            </Show>
          </div>
        </div>
      </Show>
      <Show when={userSettings.shouldShowProgressBar}>
        <BottomGroup style={{ opacity: `${userSettings.menuOpacity}%` }} />
      </Show>
    </>
  );
};

/* -------------------------------------------------------------------------- */

const LeftTopGroup = (): JSX.Element => {
  return (
    <div
      class="fixed top-8 left-4 flex gap-4"
      style={{ ...safeAreaPaddingTop, ...safeAreaPaddingLeft }}
    >
      <SideMenuOpenButton />
      <SharpeningFilterButton />
      <InvertFilterButton />
      <InvertLightnessButton />
      <BookmarkButton />
      <FullscreenButton />
    </div>
  );
};

const RightTopGroup = (): JSX.Element => {
  return (
    <div
      class="fixed top-8 right-4 flex gap-2 text-xs"
      style={{ ...safeAreaPaddingTop, ...safeAreaPaddingRight }}
    >
      <ClockView />
    </div>
  );
};

const BottomGroup = (props: { style?: JSX.CSSProperties }): JSX.Element => {
  return (
    <div
      class="fixed bottom-1 left-1/2 grid w-full -translate-x-1/2 place-items-center"
      style={props.style}
    >
      <ProgressBar />
    </div>
  );
};
