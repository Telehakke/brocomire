import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";
import { goToLeft } from "./goToLeft";
import { goToPrevious } from "./goToPrevious";

/** ビューアの右端を右クリック */
export const handleRightEdgeSubClick = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    if (userSettings.shouldAdvance.value) {
        goToPrevious(appStore, userSettings);
        return;
    }
    goToLeft(appStore, userSettings);
};
