import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";
import { goToPrevious } from "./goToPrevious";
import { goToRight } from "./goToRight";

/** ビューアの左端を右クリック */
export const handleLeftEdgeSubClick = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    if (userSettings.shouldAdvance.value) {
        goToPrevious(appStore, userSettings);
        return;
    }
    goToRight(appStore, userSettings);
};
