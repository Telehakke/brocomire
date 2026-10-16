export type Visibility = "visible" | "fade-out" | "none";

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

export const init = (): Notification => {
  return create({ message: undefined, visibility: "none" });
};

export const getStore = (
  getter: () => Notification,
  setter: (value: Notification) => void,
): NotificationStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};

/** メッセージを表示 */
export const showMessage = (message?: string): Notification => {
  return create({ message, visibility: "visible" });
};

/** メッセージをフェードアウト */
export const fadeOut = (input: Notification): Notification => {
  return create({ ...input, visibility: "fade-out" });
};

/** メッセージを無くす */
export const none = (input: Notification): Notification => {
  return create({ ...input, visibility: "none" });
};

/** メッセージが表示されているかどうか */
export const isVisible = (input: Notification): boolean => {
  return input.visibility === "visible";
};

/** メッセージがフェードアウトしているかどうか */
export const isFadeOut = (input: Notification): boolean => {
  return input.visibility === "fade-out";
};

/** メッセージが無くされたかどうか */
export const isNone = (input: Notification): boolean => {
  return input.visibility === "none";
};

const create = (value: NotificationType): Notification => {
  return value as Notification;
};
