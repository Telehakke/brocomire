import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";

/** 拡大 */
export const zoomOut = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    const { zoomStep } = userSettings;
    appStore.set((a) => {
        const zoomPct = a.zoomPct.zoomOut(zoomStep.value);
        return a.copyWith({
            notification: a.notification.setMessage(`${zoomPct.value}%`),
            scrollPct2D: a.scrollPct2D.update(
                a.viewerManager.scrollXPct(),
                a.viewerManager.scrollYPct(),
            ),
            zoomPct,
        });
    });
};
