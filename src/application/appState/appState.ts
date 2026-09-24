import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import type { Notification } from "../../domain/models/notification/notification";
import { ScrollPct2D } from "../../domain/models/scroll/scrollPct2D";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { ZoomPct } from "../../domain/models/zoom/zoomPct";
import type { ChevronMark } from "./valueObjects/chevronMark";
import type { ImageSize } from "./valueObjects/imageSize";
import type { InfoVisibility } from "./valueObjects/infoVisibility";

export type AppStateValue = Readonly<{
    cache: Cache;
    chevronMark: ChevronMark;
    fileManager: FileManager;
    hashedFileName: string;
    imageSize: ImageSize;
    infoVisibility: InfoVisibility;
    isLandscape: boolean;
    isOpenSideMenu: boolean;
    isUserScrolled: boolean;
    notification: Notification;
    onInvertFilter: boolean;
    onSharpeningFilter: boolean;
    onViewer: boolean;
    scrollPct2D: ScrollPct2D;
    viewerManager: ViewerManager;
    zoomPct: ZoomPct;
}>;

export class AppState {
    private readonly value: AppStateValue;

    constructor(value: AppStateValue) {
        this.value = value;
    }

    get cache(): Cache {
        return this.value.cache;
    }

    get chevronMark(): ChevronMark {
        return this.value.chevronMark;
    }

    get fileManager(): FileManager {
        return this.value.fileManager;
    }

    get hashedFileName(): string | undefined {
        return this.value.hashedFileName;
    }

    get imageSize(): ImageSize {
        return this.value.imageSize;
    }

    get infoVisibility(): InfoVisibility {
        return this.value.infoVisibility;
    }

    get isLandscape(): boolean {
        return this.value.isLandscape;
    }

    get isOpenSideMenu(): boolean {
        return this.value.isOpenSideMenu;
    }

    get isUserScrolled(): boolean {
        return this.value.isUserScrolled;
    }

    get notification(): Notification {
        return this.value.notification;
    }

    get onInvertFIlter(): boolean {
        return this.value.onInvertFilter;
    }

    get onSharpeningFilter(): boolean {
        return this.value.onSharpeningFilter;
    }

    get onViewer(): boolean {
        return this.value.onViewer;
    }

    get scrollPct2D(): ScrollPct2D {
        return this.value.scrollPct2D;
    }

    get viewerManager(): ViewerManager {
        return this.value.viewerManager;
    }

    get zoomPct(): ZoomPct {
        return this.value.zoomPct;
    }

    copyWith({
        cache,
        chevronMark,
        fileManager,
        hashedFileName,
        imageSize,
        infoVisibility,
        isLandscape,
        isOpenSideMenu,
        isUserScrolled,
        notification,
        onInvertFilter,
        onSharpeningFilter,
        onViewer,
        scrollPct2D,
        viewerManager,
        zoomPct,
    }: Partial<AppStateValue>): AppState {
        return new AppState({
            cache: cache ?? this.cache,
            chevronMark: chevronMark ?? this.value.chevronMark,
            fileManager: fileManager ?? this.value.fileManager,
            hashedFileName: hashedFileName ?? this.value.hashedFileName,
            imageSize: imageSize ?? this.value.imageSize,
            infoVisibility: infoVisibility ?? this.value.infoVisibility,
            isLandscape: isLandscape ?? this.value.isLandscape,
            isOpenSideMenu: isOpenSideMenu ?? this.value.isOpenSideMenu,
            isUserScrolled: isUserScrolled ?? this.value.isUserScrolled,
            notification: notification ?? this.value.notification,
            onInvertFilter: onInvertFilter ?? this.value.onInvertFilter,
            onSharpeningFilter:
                onSharpeningFilter ?? this.value.onSharpeningFilter,
            onViewer: onViewer ?? this.value.onViewer,
            scrollPct2D: scrollPct2D ?? this.value.scrollPct2D,
            viewerManager: viewerManager ?? this.value.viewerManager,
            zoomPct: zoomPct ?? this.value.zoomPct,
        });
    }
}
