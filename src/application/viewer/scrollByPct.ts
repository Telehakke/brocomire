import type { AppState } from "../appState/appState";
import type { AppStore } from "../appState/appStore";

/** 現在の位置からさらにピクセル値で指定した位置にスクロール */
export const scrollByPct = (x: number, y: number, appStore: AppStore): void => {
    const appState = getNextAppState(appStore.get(), x, y);
    const { viewerManager, scrollPct2D } = appState;
    viewerManager.scrollToPct(scrollPct2D.x, scrollPct2D.y);
    appStore.set(() => appState);
};

/* -------------------------------------------------------------------------- */

const getNextAppState = (prev: AppState, x: number, y: number): AppState => {
    return prev
        .setScrollPct2D((v) => v.scrollPct2D.add(x, y))
        .setIsUserScrolled(() => true);
};
