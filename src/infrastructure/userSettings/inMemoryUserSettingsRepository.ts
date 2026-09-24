import { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";

export class InMemoryUserSettingsRepository implements UserSettingsRepository {
    value: UserSettings | undefined;

    load(): UserSettings {
        return UserSettings.createSafe();
    }

    save(userSettings: UserSettings): void {
        this.value = userSettings;
    }
}
