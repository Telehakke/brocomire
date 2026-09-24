import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import { exhaustiveCheck } from "../../domain/models/utils/exhaustiveCheck";
import type { AppStore } from "../appState/appStore";
import { goToNext } from "./goToNext";
import { goToPrevious } from "./goToPrevious";

/** 左側へ進む */
export const goToLeft = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    const { bookFormat } = userSettings;
    switch (bookFormat.value) {
        case "vertical":
            goToNext(appStore, userSettings);
            break;
        case "horizontal":
            goToPrevious(appStore, userSettings);
            break;
        default:
            exhaustiveCheck(bookFormat.value);
    }
};
