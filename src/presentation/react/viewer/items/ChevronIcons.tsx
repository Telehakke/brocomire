import { useAtomValue } from "jotai";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import type { JSX } from "react";
import { ChevronMarkEnum } from "../../../../application/appState/chevronMark";
import { chevronMarkAtom } from "../../../atoms";
import { safeAreaPaddingLeft, safeAreaPaddingRight } from "../../utils/safeAreaPadding";

export const ChevronLeft = (): JSX.Element | null => {
  const chevronMark = useAtomValue(chevronMarkAtom);

  if (chevronMark !== ChevronMarkEnum.left) return null;
  return (
    <div className="fixed top-1/2 left-0 -translate-y-1/2" style={safeAreaPaddingLeft()}>
      <CircleChevronLeft className="size-15 stroke-green-500" />
    </div>
  );
};

export const ChevronRight = (): JSX.Element | null => {
  const chevronMark = useAtomValue(chevronMarkAtom);

  if (chevronMark !== ChevronMarkEnum.right) return null;
  return (
    <div className="fixed top-1/2 right-0 -translate-y-1/2" style={safeAreaPaddingRight()}>
      <CircleChevronRight className="size-15 stroke-green-500" />
    </div>
  );
};
