import { useAtomValue, useSetAtom } from "jotai";
import { Droplet } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { createOnInvertFilter } from "../../../application/appState/onInvertFilter";
import { onInvertFilterAtom, UserSettingsAtom } from "../../atoms";
import { IconBlueButton } from "../utils/IconBlueButton";
import { IconButton } from "../utils/IconButton";

export const InvertFilterButton = (): JSX.Element | null => {
  const shouldShowButton = useAtomValue(UserSettingsAtom.shouldShowInvertButton);
  const onFilter = useAtomValue(onInvertFilterAtom);

  if (!shouldShowButton) return null;
  if (onFilter) return <InvertIconBlueButton />;
  return <InvertIconButton />;
};

/* -------------------------------------------------------------------------- */

const InvertIconBlueButton = (): JSX.Element => {
  const setOnFilter = useSetAtom(onInvertFilterAtom);

  const handleClick = (): void => {
    setOnFilter(createOnInvertFilter(false));
  };

  return (
    <IconBlueButton.Button onClick={handleClick}>
      <Droplet className={Object.values(IconBlueButton.className).join(" ")} />
    </IconBlueButton.Button>
  );
};

const InvertIconButton = (): JSX.Element => {
  const setOnFilter = useSetAtom(onInvertFilterAtom);

  const handleClick = (): void => {
    setOnFilter(createOnInvertFilter(true));
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <Droplet className={Object.values(IconButton.className).join(" ")} />
    </IconButton.Button>
  );
};
