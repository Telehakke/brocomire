import type { AppState } from "./appState";

export interface AppStore {
    get(): AppState;
    set(callback: (prev: AppState) => AppState): void;
}
