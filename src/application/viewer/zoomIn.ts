import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";

/** 拡大 */
export const zoomIn = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    const { zoomStep } = userSettings;
    appStore.set((a) =>
        a
            .setZoomPct((v) => v.zoomPct.zoomIn(zoomStep.value))
            .setNotification((v) =>
                v.notification.setMessage(`${v.zoomPct.value}%`),
            )
            .setScrollPct2D((v) =>
                v.scrollPct2D.update(
                    v.viewerManager.scrollXPct(),
                    v.viewerManager.scrollYPct(),
                ),
            ),
    );
};
