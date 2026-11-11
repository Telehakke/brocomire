import { Bookmark } from "lucide-solid";
import { Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createBookmarkIndex } from "../../../application/appState/bookmarkIndex";
import { moveToIndexPage } from "../../../application/viewer/moveToIndexPage";
import {
  bookmarkIndexSignal,
  fileNavigatorSignal,
  notificationSignal,
  scrollPercentage2DSignal,
  userSettingsStore,
} from "../../signals";
import { IconButton } from "../utils/IconButton";
import { joinObjectValues } from "../utils/joinObjectValues";

export const BookmarkButton = (): JSX.Element => {
  const [userSettings] = userSettingsStore;

  return (
    <Show when={userSettings.shouldShowBookmarkButton}>
      <div class="flex gap-4">
        <AddBookmarkButton />
        <GoToBookmarkButton />
      </div>
    </Show>
  );
};

/* -------------------------------------------------------------------------- */

const AddBookmarkButton = (): JSX.Element => {
  const [, setBookmarkIndex] = bookmarkIndexSignal;
  const [fileNavigator] = fileNavigatorSignal;

  const handleClick = (): void => {
    setBookmarkIndex(createBookmarkIndex(fileNavigator().currentIndex));
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <Bookmark class={joinObjectValues(IconButton.className)} />
    </IconButton.Button>
  );
};

/* -------------------------------------------------------------------------- */

const GoToBookmarkButton = (): JSX.Element => {
  const [bookmarkIndex] = bookmarkIndexSignal;

  const handleClick = (): void => {
    if (bookmarkIndex() == null) return;

    runMoveToIndexPage(bookmarkIndex()!);
  };

  const className = {
    _: "size-10 text-sm font-bold text-black tabular-nums transition",
    grid: "grid place-items-center",
    bg: "bg-neutral-300",
    hoverBg: "group-hover:bg-neutral-400",
    activeBg: " group-active:bg-neutral-500",
  };

  return (
    <Show when={bookmarkIndex() != null}>
      <IconButton.Button onClick={handleClick}>
        <div class={joinObjectValues(className)}>{bookmarkIndex()! + 1}</div>
      </IconButton.Button>
    </Show>
  );
};

const runMoveToIndexPage = (index: number): void => {
  const [fileNavigator, setFileNavigator] = fileNavigatorSignal;
  const [, setNotification] = notificationSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;

  moveToIndexPage(
    index,
    () => fileNavigator(),
    (v) => setFileNavigator(v),
    (v) => setNotification(v),
    scrollPercentage2D(),
    () => userSettings,
  );
};
