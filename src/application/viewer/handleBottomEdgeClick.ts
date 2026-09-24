import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";
import { goToNext } from "./goToNext";

/** ビューアの下端をクリック */
export const handleBottomEdgeClick = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    goToNext(appStore, userSettings);
};
