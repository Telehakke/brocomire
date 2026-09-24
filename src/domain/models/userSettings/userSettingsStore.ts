import type { UserSettings } from "./userSettings";

export interface UserSettingsStore {
    get(): UserSettings;
    set(callback: (userSettings: UserSettings) => UserSettings): void;
}
