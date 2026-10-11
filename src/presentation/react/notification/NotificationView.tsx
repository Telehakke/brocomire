import { useAtom } from "jotai";
import { useEffect, useRef, type JSX } from "react";
import { Notification } from "../../../domain/models/notification/notification";
import { notificationAtom } from "../../atoms";
import { safeAreaPaddingBottom } from "../utils/safeAreaPadding";

export const NotificationView = (): JSX.Element | null => {
  const timerId = useRef<number | undefined>(undefined);
  const [notification, setNotification] = useAtom(notificationAtom);

  useEffect(() => {
    if (!Notification.isVisible(notification)) return;

    window.clearTimeout(timerId.current);
    timerId.current = window.setTimeout(() => {
      setNotification((v) => Notification.fadeOut(v));
    }, 1000);
  }, [notification, setNotification]);

  if (Notification.isNone(notification)) return null;
  return (
    <div
      className="pointer-events-none fixed bottom-4 left-1/2 -translate-x-1/2"
      style={safeAreaPaddingBottom()}
    >
      <Text />
    </div>
  );
};

const Text = (): JSX.Element => {
  const [notification, setNotification] = useAtom(notificationAtom);

  const className = {
    _: "w-max rounded-md px-2 py-1 tabular-nums select-none",
    opacity: "data-[state=fade-out]:opacity-0",
    text: "text-neutral-100",
    bg: "bg-neutral-900",
    animation: "data-[state=visible]:animate-fade-in data-[state=fade-out]:animate-fade-out",
  };

  const handleAnimationEnd = (): void => {
    if (!Notification.isFadeOut(notification)) return;
    setNotification((v) => Notification.none(v));
  };

  return (
    <p
      className={Object.values(className).join(" ")}
      data-state={notification.visibility}
      onAnimationEnd={handleAnimationEnd}
    >
      {notification.message}
    </p>
  );
};
