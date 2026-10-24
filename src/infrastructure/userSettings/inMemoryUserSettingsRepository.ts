import {
  createUserSettings,
  type UserSettings,
} from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";

export class InMemoryUserSettingsRepository implements UserSettingsRepository {
  value: UserSettings | undefined;

  load(): UserSettings {
    return createUserSettings();
  }

  save(userSettings: UserSettings): void {
    this.value = userSettings;
  }
}
