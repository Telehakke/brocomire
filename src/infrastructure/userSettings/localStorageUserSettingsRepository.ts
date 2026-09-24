import { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";
import { serializeUserSettings } from "./serializeUserSettings";

export class LocalStorageUserSettingsRepository implements UserSettingsRepository {
    static readonly KEY = "appState";

    load(): UserSettings {
        const data = window.localStorage.getItem(
            LocalStorageUserSettingsRepository.KEY,
        );
        if (data == null) return UserSettings.createSafe();
        return UserSettings.createSafe(JSON.parse(data));
    }

    save(userSetting: UserSettings): void {
        window.localStorage.setItem(
            LocalStorageUserSettingsRepository.KEY,
            serializeUserSettings(userSetting),
        );
    }
}
