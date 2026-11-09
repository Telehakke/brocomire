import { atom, useAtomValue, useSetAtom } from "jotai";
import { Bookmark } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { createBookmarkIndex } from "../../../application/appState/bookmarkIndex";
import { moveToIndexPage } from "../../../application/viewer/moveToIndexPage";
import { createFileNavigatorStore } from "../../../domain/models/file/fileNavigator";
import { createNotificationStore } from "../../../domain/models/notification/notification";
import {
  bookmarkIndexAtom,
  fileNavigatorAtom,
  notificationAtom,
  scrollPercentage2DAtom,
  shouldShowBookmarkButtonAtom,
  userSettingsAtom,
} from "../../atoms";
import { IconButton } from "../utils/IconButton";

export const BookmarkButton = (): JSX.Element | null => {
  const shouldShowButton = useAtomValue(shouldShowBookmarkButtonAtom);

  if (!shouldShowButton) return null;
  return (
    <div className="flex gap-4">
      <AddBookmarkButton />
      <GoToBookmarkButton />
    </div>
  );
};

/* -------------------------------------------------------------------------- */

const AddBookmarkButton = (): JSX.Element => {
  const setBookmarkIndex = useSetAtom(bookmarkIndexAtom);
  const fileNavigator = useAtomValue(fileNavigatorAtom);

  const handleClick = (): void => {
    setBookmarkIndex(createBookmarkIndex(fileNavigator.currentIndex));
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <Bookmark className={Object.values(IconButton.className).join(" ")} />
    </IconButton.Button>
  );
};

/* -------------------------------------------------------------------------- */

const moveToIndexPageAtom = atom(null, (get, set, index: number) => {
  moveToIndexPage(
    createFileNavigatorStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    index,
    createNotificationStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    get(scrollPercentage2DAtom),
    () => get(userSettingsAtom),
  );
});

const GoToBookmarkButton = (): JSX.Element | null => {
  const bookmarkIndex = useAtomValue(bookmarkIndexAtom);
  const moveToIndexPage = useSetAtom(moveToIndexPageAtom);

  const handleClick = (): void => {
    if (bookmarkIndex == null) return;

    moveToIndexPage(bookmarkIndex);
  };

  const className = {
    _: "size-10 text-sm font-bold text-black tabular-nums transition",
    bg: "bg-neutral-300",
    hoverBg: "group-hover:bg-neutral-400",
    activeBg: " group-active:bg-neutral-500",
  };

  if (bookmarkIndex == null) return null;
  return (
    <IconButton.Button onClick={handleClick}>
      <div className={`grid place-items-center ${Object.values(className).join(" ")}`}>
        {bookmarkIndex + 1}
      </div>
    </IconButton.Button>
  );
};
