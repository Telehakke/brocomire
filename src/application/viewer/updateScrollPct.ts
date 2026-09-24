import type { AppStore } from "../appState/appStore";

/** ユーザーがスクロール操作を行なっていれば、スクロールデータを更新 */
export const updateScrollPct2D = (appStore: AppStore): void => {
    if (!appStore.get().isUserScrolled) return;
    appStore.set((a) =>
        a.copyWith({
            isUserScrolled: false,
            scrollPct2D: a.scrollPct2D.update(
                a.viewerManager.scrollXPct(),
                a.viewerManager.scrollYPct(),
            ),
        }),
    );
};
