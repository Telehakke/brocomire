import * as UserSettings from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";

export class InMemoryUserSettingsRepository implements UserSettingsRepository {
  value: UserSettings.UserSettings | undefined;

  load(): UserSettings.UserSettings {
    return UserSettings.createSafe();
  }

  save(userSettings: UserSettings.UserSettings): void {
    this.value = userSettings;
  }
}
