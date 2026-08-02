import { atom } from "jotai";
import { Atom } from "../../../atoms";
import { ScrollManager } from "../../../models/scrollManager";

/** 左側へ進む */
export const goToLeftAtom = atom(null, (get, set) => {
    switch (get(Atom.appStore).writingType) {
        case "vertical":
            set(goToNextAtom);
            break;
        case "horizontal":
            set(goToPreviousAtom);
            break;
    }
});

/** 右側へ進む */
export const goToRightAtom = atom(null, (get, set) => {
    switch (get(Atom.appStore).writingType) {
        case "vertical":
            set(goToPreviousAtom);
            break;
        case "horizontal":
            set(goToNextAtom);
            break;
    }
});

/** 次へ進む */
export const goToNextAtom = atom(null, (get, set) => {
    set(updateScrollManagerAtom);

    const appStore = get(Atom.appStore);
    const viewerManager = get(Atom.viewerManager);
    let scroll = get(Atom.scrollManager);
    if (scroll.shouldMoveToNextPage({ ...appStore, viewerManager })) {
        set(moveToNextPageAtom);
        return;
    }
    scroll = scroll.next({ ...appStore, viewerManager });
    set(Atom.scrollManager, scroll);
    scroll.applyScroll(viewerManager);
});

/** 前へ進む */
export const goToPreviousAtom = atom(null, (get, set) => {
    set(updateScrollManagerAtom);

    const appStore = get(Atom.appStore);
    const viewerManager = get(Atom.viewerManager);
    let scroll = get(Atom.scrollManager);
    if (scroll.shouldMoveToPreviousPage({ ...appStore, viewerManager })) {
        set(moveToPreviousPageAtom);
        return;
    }
    scroll = scroll.previous({ ...appStore, viewerManager });
    set(Atom.scrollManager, scroll);
    scroll.applyScroll(viewerManager);
});

/** ユーザーがスクロール操作を行なっていれば、ビューアーの位置関係を更新する */
const updateScrollManagerAtom = atom(null, (get, set) => {
    if (!get(Atom.isUserScrolled)) return;
    set(Atom.isUserScrolled, false);
    set(Atom.scrollManager, (s) => s.update(get(Atom.viewerManager)));
});

/** 指定したインデックスのページへ移動 */
export const moveToIndexPageAtom = atom(
    null,
    async (get, set, index: number) => {
        const { writingType } = get(Atom.appStore);
        const file = get(Atom.fileManager).setIndex(index);
        set(Atom.fileManager, file);
        set(Atom.scrollManager, ScrollManager.fromWritingType(writingType));
        set(Atom.messageManager, (m) => m.setMessage(file.progress()));
    },
);

/** 次のページへ移動 */
export const moveToNextPageAtom = atom(null, async (get, set) => {
    let file = get(Atom.fileManager);
    if (!file.hasNextFile()) return;

    const { displayMode, writingType } = get(Atom.appStore);
    file = file.nextIndex({ displayMode });
    set(Atom.fileManager, file);
    set(Atom.scrollManager, ScrollManager.fromWritingType(writingType));
    set(Atom.messageManager, (m) => m.setMessage(file.progress()));
});

/** 前のページへ移動 */
export const moveToPreviousPageAtom = atom(null, async (get, set) => {
    let file = get(Atom.fileManager);
    if (!file.hasPreviousFile()) return;

    const { displayMode, writingType } = get(Atom.appStore);
    file = file.prevIndex({ displayMode });
    set(Atom.fileManager, file);
    set(Atom.scrollManager, ScrollManager.fromWritingType(writingType, true));
    set(Atom.messageManager, (m) => m.setMessage(file.progress()));
});

/** 拡大 */
export const zoomInAtom = atom(null, (get, set) => {
    set(Atom.scrollManager, (s) => s.update(get(Atom.viewerManager)));
    const { zoomStep } = get(Atom.appStore);
    const zoom = get(Atom.zoomManager).zoomIn(zoomStep);
    set(Atom.zoomManager, zoom);
    set(Atom.messageManager, (m) => m.setMessage(`${zoom.scale}%`));
});

/** 縮小 */
export const zoomOutAtom = atom(null, (get, set) => {
    set(Atom.scrollManager, (s) => s.update(get(Atom.viewerManager)));
    const { zoomStep } = get(Atom.appStore);
    const zoom = get(Atom.zoomManager).zoomOut(zoomStep);
    set(Atom.zoomManager, zoom);
    set(Atom.messageManager, (m) => m.setMessage(`${zoom.scale}%`));
});

/** 履歴の更新 */
export const updateHistoryAtom = atom(null, (get, set) => {
    const zipFileName = get(Atom.zipFileName);
    if (zipFileName == null) return;

    const history = get(Atom.historyManager).update({
        name: zipFileName,
        index: get(Atom.fileManager).index,
    });
    set(Atom.historyManager, history);
    set(Atom.appStore, (a) => a.setHistories(history.histories));
});
