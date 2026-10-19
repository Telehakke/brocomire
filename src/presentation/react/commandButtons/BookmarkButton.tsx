import { atom, useAtomValue, useSetAtom } from "jotai";
import { Bookmark } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import * as BookmarkIndex from "../../../application/appState/bookmarkIndex";
import { moveToIndexPage } from "../../../application/viewer/moveToIndexPage";
import * as FileNavigator from "../../../domain/models/file/fileNavigator";
import * as Notification from "../../../domain/models/notification/notification";
import {
  Atom,
  bookmarkIndexAtom,
  fileNavigatorAtom,
  notificationAtom,
  scrollPercentage2DAtom,
  UserSettingsAtom,
} from "../../atoms";
import { IconButton } from "../utils/IconButton";

export const BookmarkButton = (): JSX.Element | null => {
  const shouldShowButton = useAtomValue(UserSettingsAtom.shouldShowBookmarkButton);

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
    setBookmarkIndex(BookmarkIndex.create(fileNavigator.currentIndex));
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <Bookmark className={Object.values(IconButton.className).join(" ")} />
    </IconButton.Button>
  );
};

/* -------------------------------------------------------------------------- */

const moveToIndexPageAtom = atom(null, (get, set, index: number) => {
  moveToIndexPage({
    fileNavigatorStore: FileNavigator.getStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    index,
    notificationStore: Notification.getStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    scrollPercentage2D: get(scrollPercentage2DAtom),
    userSettingsGetter: () => get(Atom.userSettings),
  });
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
