import { CircleChevronLeft, CircleChevronRight } from "lucide-solid";
import { Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { ChevronMarkEnum } from "../../../../application/appState/chevronMark";
import { chevronMarkSignal } from "../../../signals";
import { safeAreaPaddingLeft, safeAreaPaddingRight } from "../../utils/safeAreaPadding";

export const ChevronLeft = (): JSX.Element => {
  const [chevronMark] = chevronMarkSignal;

  return (
    <Show when={chevronMark() === ChevronMarkEnum.left}>
      <div class="fixed top-1/2 left-0 -translate-y-1/2" style={safeAreaPaddingLeft}>
        <CircleChevronLeft class="size-15 stroke-green-500" />
      </div>
    </Show>
  );
};

export const ChevronRight = (): JSX.Element => {
  const [chevronMark] = chevronMarkSignal;

  return (
    <Show when={chevronMark() === ChevronMarkEnum.right}>
      <div class="fixed top-1/2 right-0 -translate-y-1/2" style={safeAreaPaddingRight}>
        <CircleChevronRight class="size-15 stroke-green-500" />
      </div>
    </Show>
  );
};
