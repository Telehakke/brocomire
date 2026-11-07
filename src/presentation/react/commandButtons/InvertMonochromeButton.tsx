import { useAtomValue, useSetAtom } from "jotai";
import { Paintbrush } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { createOnInvertMonochrome } from "../../../application/appState/onInvertMonochrome";
import { onInvertMonochromeAtom, UserSettingsAtom } from "../../atoms";
import { IconBlueButton } from "../utils/IconBlueButton";
import { IconButton } from "../utils/IconButton";

export const InvertMonochromeButton = (): JSX.Element | null => {
  const shouldShowButton = useAtomValue(UserSettingsAtom.shouldShowInvertMonochromeButton);
  const onFilter = useAtomValue(onInvertMonochromeAtom);

  if (!shouldShowButton) return null;
  if (onFilter) return <InvertIconBlueButton />;
  return <InvertIconButton />;
};

/* -------------------------------------------------------------------------- */

const InvertIconBlueButton = (): JSX.Element => {
  const setOnInvert = useSetAtom(onInvertMonochromeAtom);

  const handleClick = (): void => {
    setOnInvert(createOnInvertMonochrome(false));
  };

  return (
    <IconBlueButton.Button onClick={handleClick}>
      <Paintbrush className={Object.values(IconBlueButton.className).join(" ")} />
    </IconBlueButton.Button>
  );
};

const InvertIconButton = (): JSX.Element => {
  const setOnInvert = useSetAtom(onInvertMonochromeAtom);

  const handleClick = (): void => {
    setOnInvert(createOnInvertMonochrome(true));
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <Paintbrush className={Object.values(IconButton.className).join(" ")} />
    </IconButton.Button>
  );
};
