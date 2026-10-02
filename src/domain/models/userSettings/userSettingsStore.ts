import type { UserSettings } from "./userSettings";

export interface UserSettingsStore {
    get(): UserSettings;
    set(callback: (prev: UserSettings) => UserSettings): void;
}
