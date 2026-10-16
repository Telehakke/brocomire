import * as UserSettings from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";

export class LocalStorageUserSettingsRepository implements UserSettingsRepository {
  private readonly KEY = "appState";

  load(): UserSettings.UserSettings {
    const data = window.localStorage.getItem(this.KEY);
    if (data == null) return UserSettings.createSafe();
    return UserSettings.createSafe(JSON.parse(data));
  }

  save(userSetting: UserSettings.UserSettings): void {
    window.localStorage.setItem(this.KEY, JSON.stringify(userSetting));
  }
}
