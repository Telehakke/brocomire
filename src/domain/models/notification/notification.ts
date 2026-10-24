type Visibility = "visible" | "fade-out" | "hidden";

type NotificationType = Readonly<{
  message: string | undefined;
  visibility: Visibility;
}>;

declare const NotificationBrand: unique symbol;

export type Notification = NotificationType & { [NotificationBrand]: unknown };

/* -------------------------------------------------------------------------- */

export type NotificationStore = Readonly<{
  get(): Notification;
  set(value: Notification): void;
}>;

/* -------------------------------------------------------------------------- */

export const initNotification = (): Notification => {
  return create({ message: undefined, visibility: "hidden" });
};

export const getNotificationStore = (
  getter: () => Notification,
  setter: (value: Notification) => void,
): NotificationStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};

/** メッセージを表示 */
export const showNotificationMessage = (message?: string): Notification => {
  return create({ message, visibility: "visible" });
};

/** メッセージをフェードアウト */
export const fadeOutNotification = (input: Notification): Notification => {
  return create({ ...input, visibility: "fade-out" });
};

/** メッセージを隠す */
export const hideNotification = (input: Notification): Notification => {
  return create({ ...input, visibility: "hidden" });
};

/* -------------------------------------------------------------------------- */

const create = (value: NotificationType): Notification => {
  return value as Notification;
};
