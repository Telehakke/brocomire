import type {
    Notification,
    Visibility,
} from "../../domain/models/notification/notification";

export class ReactNotification implements Notification {
    readonly value: string | undefined;
    readonly visibility: Visibility;

    constructor(value?: string, visibility?: Visibility) {
        this.value = value;
        this.visibility = visibility ?? "none";
    }

    setMessage(value?: string): Notification {
        return new ReactNotification(value, "visible");
    }

    hidden(): Notification {
        return new ReactNotification(this.value, "hidden");
    }

    none(): Notification {
        return new ReactNotification(this.value, "none");
    }
}
