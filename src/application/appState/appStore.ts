import type { AppState } from "./appState";

export interface AppStore {
    get(): AppState;
    set(callback: (appState: AppState) => AppState): void;
}
