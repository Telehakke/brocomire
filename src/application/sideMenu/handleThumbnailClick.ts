import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import { ZoomPct } from "../../domain/models/zoom/zoomPct";
import type { AppStore } from "../appState/appStore";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

/** サムネイルをクリックすると実行される処理 */
export const handleThumbnailClick = (
    index: number,
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    moveToIndexPage(index, appStore, userSettings);
    appStore.set((a) =>
        a.copyWith({
            isOpenSideMenu: false,
            zoomPct: ZoomPct.createSafe(),
        }),
    );
};
