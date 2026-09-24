import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import { exhaustiveCheck } from "../../domain/models/utils/exhaustiveCheck";
import type { AppStore } from "../appState/appStore";
import { moveToNextPage } from "./moveToNextPage";
import { moveToPreviousPage } from "./moveToPreviousPage";

/** 右側のページへ移動 */
export const moveToRightPage = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    const { bookFormat } = userSettings;
    switch (bookFormat.value) {
        case "vertical":
            moveToPreviousPage(appStore, userSettings);
            break;
        case "horizontal":
            moveToNextPage(appStore, userSettings);
            break;
        default:
            exhaustiveCheck(bookFormat.value);
    }
};
