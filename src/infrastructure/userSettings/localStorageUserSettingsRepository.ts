import {
  createUserSettings,
  type UserSettings,
} from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";

export class LocalStorageUserSettingsRepository implements UserSettingsRepository {
  private readonly KEY = "appState";

  load(): UserSettings {
    const data = window.localStorage.getItem(this.KEY);
    if (data == null) return createUserSettings();
    return createUserSettings(JSON.parse(data));
  }

  save(userSetting: UserSettings): void {
    window.localStorage.setItem(this.KEY, JSON.stringify(userSetting));
  }
}
