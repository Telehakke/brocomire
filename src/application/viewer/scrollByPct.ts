import type { AppStore } from "../appState/appStore";

/** 現在の位置からさらにピクセル値で指定した位置にスクロール */
export const scrollByPct = (x: number, y: number, appStore: AppStore): void => {
    appStore.set((a) => {
        const scrollPct2D = a.scrollPct2D.add(x, y);
        a.viewerManager.scrollToPct(scrollPct2D.x, scrollPct2D.y);
        return a.copyWith({
            isUserScrolled: true,
            scrollPct2D,
        });
    });
};
