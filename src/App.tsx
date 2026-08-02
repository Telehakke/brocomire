import { useAtom, useAtomValue } from "jotai";
import { type JSX } from "react";
import { Atom } from "./atoms";
import { ChevronLeft, ChevronRight } from "./components/ChevronIcons";
import { Clock } from "./features/clock/Clock";
import {
    ImageFilesOpenButton,
    ZipFileOpenButton,
} from "./features/fileOpen/FileOpenButtons";
import { FullscreenButton } from "./features/fullscreen/FullscreenButton";
import { InvertFilterButton } from "./features/invertFilter/InvertFilterButton";
import { Notification } from "./features/notification/Notification";
import { PageNumber } from "./features/pageNumber/PageNumber";
import { MenuButton } from "./features/sideMenu/MenuButton";
import { SideMenu } from "./features/sideMenu/SideMenu";
import { ImageViewer } from "./features/viewer/components/ImageViewer";
import { SharpeningFilter } from "./features/viewer/components/SharpeningFilter";
import { TapAreas } from "./features/viewer/components/TapAreas";
import {
    safeAreaPaddingLeft,
    safeAreaPaddingRight,
    safeAreaPaddingTop,
} from "./utils/safeAreaPadding";

export const App = (): JSX.Element => {
    const onViewer = useAtomValue(Atom.onViewer);

    if (!onViewer) return <Home />;
    return (
        <>
            <SharpeningFilter.Component />
            <ImageViewer />
            <TapAreas />
            <SideMenu />
            <Infos />
            <Notification />
            <ChevronLeft />
            <ChevronRight />
        </>
    );
};

const Home = (): JSX.Element => {
    const className = {
        _: "m-auto w-max",
        position: "fixed inset-x-0 top-1/2 -translate-y-1/2",
        grid: "grid grid-cols-2 place-items-center gap-4",
    };

    return (
        <>
            <div className={Object.values(className).join(" ")}>
                <ImageFilesOpenButton />
                <ZipFileOpenButton />
            </div>
            <p className="fixed bottom-8 left-8">v0.260803a</p>
        </>
    );
};

const Infos = (): JSX.Element | null => {
    const [infoState, setInfoState] = useAtom(Atom.infoState);

    if (infoState === "none") return null;
    return (
        <div
            className="data-[state=visible]:animate-fade-in data-[state=hidden]:animate-fade-out data-[state=hidden]:opacity-0"
            data-state={infoState}
            onAnimationEnd={() => {
                if (infoState !== "hidden") return;
                setInfoState("none");
            }}
        >
            <div
                className="fixed top-4 left-4 flex gap-4"
                style={{ ...safeAreaPaddingTop(), ...safeAreaPaddingLeft() }}
            >
                <MenuButton />
                <InvertFilterButton />
                <FullscreenButton />
            </div>
            <div
                className="fixed top-4 right-4 flex gap-4"
                style={{ ...safeAreaPaddingTop(), ...safeAreaPaddingRight() }}
            >
                <PageNumber />
                <Clock />
            </div>
        </div>
    );
};
