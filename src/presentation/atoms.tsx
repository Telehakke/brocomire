import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import { AppState } from "../application/appState/appState";
import { ChevronMark } from "../application/appState/valueObjects/chevronMark";
import { ImageSize } from "../application/appState/valueObjects/imageSize";
import { InfoVisibility } from "../application/appState/valueObjects/infoVisibility";
import { ScrollPct2D } from "../domain/models/scroll/scrollPct2D";
import { UserSettings } from "../domain/models/userSettings/userSettings";
import { ZoomPct } from "../domain/models/zoom/zoomPct";
import { BlobCache } from "../infrastructure/file/blobCache";
import { NullFileManager } from "../infrastructure/file/nullFileManager";
import { ReactNotification } from "../infrastructure/notification/reactNotification";
import { ImageViewerManager } from "../infrastructure/viewer/imageViewerManager";

export const Atom = {
    appState: atom(
        new AppState({
            cache: new BlobCache(),
            chevronMark: new ChevronMark("none"),
            fileManager: new NullFileManager(),
            hashedFileName: "",
            imageSize: new ImageSize({ width: 0, height: 0 }),
            infoVisibility: new InfoVisibility("visible"),
            isLandscape: false,
            isOpenSideMenu: false,
            isUserScrolled: false,
            notification: new ReactNotification(),
            onInvertFilter: false,
            onSharpeningFilter: false,
            onViewer: false,
            scrollPct2D: new ScrollPct2D(),
            viewerManager: new ImageViewerManager(),
            zoomPct: ZoomPct.createSafe(),
        }),
    ),
    userSettings: atom(UserSettings.createSafe()),
} as const;

export const AppStateAtom = {
    cache: selectAtom(Atom.appState, (a) => a.cache),
    chevronMark: selectAtom(Atom.appState, (a) => a.chevronMark),
    fileManager: selectAtom(Atom.appState, (a) => a.fileManager),
    hashedFileName: selectAtom(Atom.appState, (a) => a.hashedFileName),
    imageSize: selectAtom(Atom.appState, (a) => a.imageSize),
    infoVisibility: selectAtom(Atom.appState, (a) => a.infoVisibility),
    isLandscape: selectAtom(Atom.appState, (a) => a.isLandscape),
    isOpenSideMenu: selectAtom(Atom.appState, (a) => a.isOpenSideMenu),
    isUserScrolled: selectAtom(Atom.appState, (a) => a.isUserScrolled),
    notification: selectAtom(Atom.appState, (a) => a.notification),
    onInvertFilter: selectAtom(Atom.appState, (a) => a.onInvertFIlter),
    onSharpeningFilter: selectAtom(Atom.appState, (a) => a.onSharpeningFilter),
    onViewer: selectAtom(Atom.appState, (a) => a.onViewer),
    scrollPct2D: selectAtom(Atom.appState, (a) => a.scrollPct2D),
    viewerManager: selectAtom(Atom.appState, (a) => a.viewerManager),
    zoomPct: selectAtom(Atom.appState, (a) => a.zoomPct),
} as const;

// prettier-ignore
export const UserSettingsAtom = {
    bookFormat: selectAtom(Atom.userSettings, (u) => u.bookFormat),
    contentFit: selectAtom(Atom.userSettings, (u) => u.contentFit),
    displayMode: selectAtom(Atom.userSettings, (u) => u.displayMode),
    histories: selectAtom(Atom.userSettings, (u) => u.histories),
    isSafeAreaEnabled: selectAtom(Atom.userSettings, (u) => u.isSafeAreaEnabled),
    isSmoothScrollEnabled: selectAtom(Atom.userSettings, (u) => u.isSmoothScrollEnabled),
    longPressRecognitionTime: selectAtom(Atom.userSettings, (u) => u.longPressRecognitionTime),
    safeAreaLength: selectAtom(Atom.userSettings, (u) => u.safeAreaLength),
    scrollSpeed: selectAtom(Atom.userSettings, (u) => u.scrollSpeed),
    scrollStepCount: selectAtom(Atom.userSettings, (u) => u.scrollStepCount),
    sharpeningFilterStrength: selectAtom(Atom.userSettings, (u) => u.sharpeningFilterStrength),
    shouldAdvance: selectAtom(Atom.userSettings, (u) => u.shouldAdvance),
    shouldPreload: selectAtom(Atom.userSettings, (u) => u.shouldPreload),
    shouldShowFullscreenButton: selectAtom(Atom.userSettings, (u) => u.shouldShowFullscreenButton),
    shouldShowInvertButton: selectAtom(Atom.userSettings, (u) => u.shouldShowInvertButton),
    shouldShowSharpeningFilterButton: selectAtom(Atom.userSettings, (u) => u.shouldShowSharpeningFilterButton),
    tapAreaSize: selectAtom(Atom.userSettings, (u) => u.tapAreaSize),
    zoomStep: selectAtom(Atom.userSettings, (u) => u.zoomStep),
} as const;
