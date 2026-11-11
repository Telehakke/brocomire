import { createEffect, Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import {
  fadeOutNotification,
  hideNotification,
} from "../../../domain/models/notification/notification";
import { notificationSignal } from "../../signals";
import { joinObjectValues } from "../utils/joinObjectValues";
import { safeAreaPaddingBottom } from "../utils/safeAreaPadding";

export const NotificationView = (): JSX.Element => {
  let timerId: number | undefined = undefined;
  const [notification, setNotification] = notificationSignal;

  createEffect(() => {
    if (notification().visibility !== "visible") return;

    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      setNotification((v) => fadeOutNotification(v));
    }, 1000);
  });

  return (
    <Show when={notification().visibility !== "hidden"}>
      <div
        class="pointer-events-none fixed bottom-4 left-1/2 -translate-x-1/2"
        style={safeAreaPaddingBottom}
      >
        <Text />
      </div>
    </Show>
  );
};

/* -------------------------------------------------------------------------- */

const Text = (): JSX.Element => {
  const [notification, setNotification] = notificationSignal;

  const handleAnimationEnd = (): void => {
    if (notification().visibility !== "fade-out") return;

    setNotification((v) => hideNotification(v));
  };

  const className = {
    _: "w-max rounded-md px-2 py-1 tabular-nums select-none",
    opacity: "data-[state=fade-out]:opacity-0",
    text: "text-neutral-100",
    bg: "bg-neutral-900",
    animation: "data-[state=visible]:animate-fade-in data-[state=fade-out]:animate-fade-out",
  };

  return (
    <p
      class={joinObjectValues(className)}
      data-state={notification().visibility}
      onAnimationEnd={handleAnimationEnd}
    >
      {notification().message}
    </p>
  );
};
