import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";
import { goToPrevious } from "./goToPrevious";

/** ビューアの下端を右クリック */
export const handleBottomEdgeSubClick = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    goToPrevious(appStore, userSettings);
};
