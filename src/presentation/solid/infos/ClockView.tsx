import { createSignal, onCleanup, onMount } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { getMsecToNextClockUpdate, getTimeNow } from "../../../infrastructure/clock/clock";

export const ClockView = (): JSX.Element => {
  let isMounted = true;
  const [value, setValue] = createSignal("");

  onMount(() => {
    const routine = (): void => {
      if (!isMounted) return;
      setValue(getTimeNow());
      window.setTimeout(routine, getMsecToNextClockUpdate());
    };
    routine();
  });

  onCleanup(() => {
    isMounted = false;
  });

  return (
    <div class="rounded-sm bg-neutral-300 px-1 select-none">
      <p class="font-bold text-black tabular-nums">{value()}</p>
    </div>
  );
};
