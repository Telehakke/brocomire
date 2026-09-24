import type { UserSettings } from "./userSettings";

export interface UserSettingsRepository {
    load(): UserSettings;
    save(userSettings: UserSettings): void;
}
