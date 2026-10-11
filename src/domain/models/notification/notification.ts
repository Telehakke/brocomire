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

export const Notification = {
  init(): Notification {
    return create({ message: undefined, visibility: "none" });
  },

  getStore(getter: () => Notification, setter: (value: Notification) => void): NotificationStore {
    return { get: () => getter(), set: (v) => setter(v) };
  },

  /** メッセージを表示 */
  showMessage(message?: string): Notification {
    return create({ message, visibility: "visible" });
  },

  /** メッセージをフェードアウト */
  fadeOut(input: Notification): Notification {
    return create({ ...input, visibility: "fade-out" });
  },

  /** メッセージを無くす */
  none(input: Notification): Notification {
    return create({ ...input, visibility: "none" });
  },

  /** メッセージが表示されているかどうか */
  isVisible(input: Notification): boolean {
    return input.visibility === "visible";
  },

  /** メッセージがフェードアウトしているかどうか */
  isFadeOut(input: Notification): boolean {
    return input.visibility === "fade-out";
  },

  /** メッセージが無くされたかどうか */
  isNone(input: Notification): boolean {
    return input.visibility === "none";
  },
} as const;

const create = (value: NotificationType): Notification => {
  return value as Notification;
};
