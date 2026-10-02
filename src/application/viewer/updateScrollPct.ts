import type { AppStore } from "../appState/appStore";

/** ユーザーがスクロール操作を行なっていれば、スクロールデータを更新 */
export const updateScrollPct2D = (appStore: AppStore): void => {
    if (!appStore.get().isUserScrolled) return;
    appStore.set((a) =>
        a
            .setIsUserScrolled(() => false)
            .setScrollPct2D((v) =>
                v.scrollPct2D.update(
                    v.viewerManager.scrollXPct(),
                    v.viewerManager.scrollYPct(),
                ),
            ),
    );
};
