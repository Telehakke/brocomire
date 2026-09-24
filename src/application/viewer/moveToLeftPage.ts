import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import { exhaustiveCheck } from "../../domain/models/utils/exhaustiveCheck";
import type { AppStore } from "../appState/appStore";
import { moveToNextPage } from "./moveToNextPage";
import { moveToPreviousPage } from "./moveToPreviousPage";

/** 左側のページへ移動 */
export const moveToLeftPage = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    const { bookFormat } = userSettings;
    switch (bookFormat.value) {
        case "vertical":
            moveToNextPage(appStore, userSettings);
            break;
        case "horizontal":
            moveToPreviousPage(appStore, userSettings);
            break;
        default:
            exhaustiveCheck(bookFormat.value);
    }
};
