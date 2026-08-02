import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import { FullscreenManager } from "./features/fullscreen/fullscreenManager";
import { MessageManager } from "./features/notification/messageManager";
import { appStore } from "./models/appStore";
import { FileManager } from "./models/fileManager";
import { HistoryManager } from "./models/historyManager";
import { ScrollManager } from "./models/scrollManager";
import { ViewerManager } from "./models/viewerManager";
import { ZoomManager } from "./models/zoomManager";
import type { ChevronMark, Visibility } from "./types/types";

export const Atom = {
    appStore: atom(appStore),
    fileManager: atom(new FileManager()),
    fullscreenManager: atom(new FullscreenManager(false)),
    historyManager: atom(new HistoryManager()),
    infoState: atom<Visibility>("visible"),
    isLandscape: atom(true),
    isOpenSideMenu: atom(false),
    isUserScrolled: atom(false),
    messageManager: atom(MessageManager.create()),
    onChevron: atom<ChevronMark>("none"),
    onInvertFilter: atom(false),
    onViewer: atom(false),
    scrollManager: atom(new ScrollManager()),
    viewerManager: atom(new ViewerManager(null, null)),
    zipFileName: atom<string | undefined>(undefined),
    zoomManager: atom(new ZoomManager()),
} as const;

// prettier-ignore
export const AppStateAtom = {
    contentFit: selectAtom(Atom.appStore, (a) => a.contentFit),
    displayMode: selectAtom(Atom.appStore, (a) => a.displayMode),
    histories: selectAtom(Atom.appStore, (a) => a.histories),
    isSafeAreaEnabled: selectAtom(Atom.appStore, (a) => a.isSafeAreaEnabled),
    onSharpeningFilter: selectAtom(Atom.appStore, (a) => a.onSharpeningFilter),
    scrollSpeed: selectAtom(Atom.appStore, (a) => a.scrollSpeed),
    sharpeningFilterStrength: selectAtom(Atom.appStore, (a) => a.sharpeningFilterStrength),
    shouldAdvance: selectAtom(Atom.appStore, (a) => a.shouldAdvance),
    shouldShowFullscreenButton: selectAtom(Atom.appStore, (a) => a.shouldShowFullscreenButton),
    shouldShowInvertButton: selectAtom(Atom.appStore, (a) => a.shouldShowInvertButton),
    tapAreaWidth: selectAtom(Atom.appStore, (a) => a.tapAreaWidth),
    tapAreaHeight: selectAtom(Atom.appStore, (a) => a.tapAreaHeight),
    viewSplitCount: selectAtom(Atom.appStore, (a) => a.viewSplitCount),
    writingType: selectAtom(Atom.appStore, (a) => a.writingType),
    zoomStep: selectAtom(Atom.appStore, (a) => a.zoomStep),
} as const;
