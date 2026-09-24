import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";
import { goToNext } from "./goToNext";
import { goToRight } from "./goToRight";

/** ビューアの右端をクリック */
export const handleRightEdgeClick = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    if (userSettings.shouldAdvance.value) {
        goToNext(appStore, userSettings);
        return;
    }
    goToRight(appStore, userSettings);
};
