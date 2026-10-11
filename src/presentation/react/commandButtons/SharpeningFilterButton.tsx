import { useAtomValue, useSetAtom } from "jotai";
import { Sparkle } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { onSharpeningFilterAtom, UserSettingsAtom } from "../../atoms";
import { IconBlueButton } from "../utils/IconBlueButton";
import { IconButton } from "../utils/IconButton";

export const SharpeningFilterButton = (): JSX.Element | null => {
  const shouldShowButton = useAtomValue(UserSettingsAtom.shouldShowSharpeningFilterButton);
  const onFilter = useAtomValue(onSharpeningFilterAtom);

  if (!shouldShowButton) return null;
  if (onFilter) {
    return <SharpeningFilterIconBlueButton />;
  }
  return <SharpeningFilterIconButton />;
};

const SharpeningFilterIconBlueButton = (): JSX.Element => {
  const setOnFilter = useSetAtom(onSharpeningFilterAtom);

  const handleClick = (): void => {
    setOnFilter(false);
  };

  return (
    <IconBlueButton.Button onClick={handleClick}>
      <Sparkle className={Object.values(IconBlueButton.className).join(" ")} />
    </IconBlueButton.Button>
  );
};

const SharpeningFilterIconButton = (): JSX.Element => {
  const setOnFilter = useSetAtom(onSharpeningFilterAtom);

  const handleClick = (): void => {
    setOnFilter(true);
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <Sparkle className={Object.values(IconButton.className).join(" ")} />
    </IconButton.Button>
  );
};
