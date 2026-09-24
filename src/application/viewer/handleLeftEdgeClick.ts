import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";
import { goToLeft } from "./goToLeft";
import { goToNext } from "./goToNext";

/** ビューアの左端をクリック */
export const handleLeftEdgeClick = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    if (userSettings.shouldAdvance.value) {
        goToNext(appStore, userSettings);
        return;
    }
    goToLeft(appStore, userSettings);
};
