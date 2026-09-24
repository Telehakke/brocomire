export type Visibility = "visible" | "hidden" | "none";

export interface Notification {
    readonly value: string | undefined;
    readonly visibility: Visibility;

    /** 通知メッセージを変更した新しいインスタンスを返す */
    setMessage(value?: string): Notification;

    /** 通知ウィンドウを隠す状態にした新しいインスタンスを返す */
    hidden(): Notification;

    /** 通知ウィンドウを無くす状態にした新しいインスタンスを返す */
    none(): Notification;
}
