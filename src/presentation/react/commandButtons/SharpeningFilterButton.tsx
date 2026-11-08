import { atom, useAtomValue, useSetAtom } from "jotai";
import { Sparkle } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { getIsUserScrolledStore } from "../../../application/appState/isUserScrolled";
import { createOnSharpeningFilter } from "../../../application/appState/onSharpeningFilter";
import { updateScrollPercentage2D } from "../../../application/viewer/updateScrollPercentage2D";
import {
  isUserScrolledAtom,
  onSharpeningFilterAtom,
  scrollPercentage2DAtom,
  UserSettingsAtom,
  viewerManagerAtom,
} from "../../atoms";
import { IconBlueButton } from "../utils/IconBlueButton";
import { IconButton } from "../utils/IconButton";

const updateScrollPercentage2DAtom = atom(null, (get, set) => {
  updateScrollPercentage2D({
    isUserScrolledStore: getIsUserScrolledStore(
      () => get(isUserScrolledAtom),
      (v) => set(isUserScrolledAtom, v),
    ),
    scrollPercentage2D: get(scrollPercentage2DAtom),
    viewerManager: get(viewerManagerAtom),
  });
});

/* -------------------------------------------------------------------------- */

export const SharpeningFilterButton = (): JSX.Element | null => {
  const shouldShowButton = useAtomValue(UserSettingsAtom.shouldShowSharpeningFilterButton);
  const onFilter = useAtomValue(onSharpeningFilterAtom);

  if (!shouldShowButton) return null;
  if (onFilter) return <SharpeningFilterIconBlueButton />;
  return <SharpeningFilterIconButton />;
};

/* -------------------------------------------------------------------------- */

const SharpeningFilterIconBlueButton = (): JSX.Element => {
  const setOnFilter = useSetAtom(onSharpeningFilterAtom);
  const updateScrollPercentage2D = useSetAtom(updateScrollPercentage2DAtom);

  const handleClick = (): void => {
    setOnFilter(createOnSharpeningFilter(false));
    updateScrollPercentage2D();
  };

  return (
    <IconBlueButton.Button onClick={handleClick}>
      <Sparkle className={Object.values(IconBlueButton.className).join(" ")} />
    </IconBlueButton.Button>
  );
};

const SharpeningFilterIconButton = (): JSX.Element => {
  const setOnFilter = useSetAtom(onSharpeningFilterAtom);
  const updateScrollPercentage2D = useSetAtom(updateScrollPercentage2DAtom);

  const handleClick = (): void => {
    setOnFilter(createOnSharpeningFilter(true));
    updateScrollPercentage2D();
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <Sparkle className={Object.values(IconButton.className).join(" ")} />
    </IconButton.Button>
  );
};
