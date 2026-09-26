import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { AppStateAtom, Atom } from "../../atoms";
import { Card } from "../utils/Card";
import { SideMenuDialog } from "../utils/SideMenuDialog";
import {
    safeAreaPaddingBottom,
    safeAreaPaddingLeft,
    safeAreaPaddingTop,
} from "../utils/safeAreaPadding";
import { BookFormatSegmentGroup } from "./items/BookFormatSegmentGroup";
import { ContentFitSegmentGroup } from "./items/ContentFitSegmentGroup";
import { DisplayModeSegmentGroup } from "./items/DisplayModeSegmentGroup";
import { IsSafeAreaEnabledSwitch } from "./items/IsSafeAreaEnabledSwitch";
import { IsSmoothScrollEnabledSwitch } from "./items/IsSmoothScrollEnabledSwitch";
import { LongPressRecognitionTimeSlider } from "./items/LongPressRecognitionTimeSlider";
import { ScrollSpeedSlider } from "./items/ScrollSpeedSlider";
import { ScrollStepCountSegmentGroup } from "./items/ScrollStepCountSegmentGroup";
import { SelectPageSlider } from "./items/SelectPageSlider";
import { SharpeningFilterStrengthSlider } from "./items/SharpeningFilterStrengthSlider";
import { ShouldAdvanceSwitch } from "./items/ShouldAdvanceSwitch";
import { ShouldPreloadSwitch } from "./items/ShouldPreloadSwitch";
import { ShouldShowFullscreenButtonSwitch } from "./items/ShouldShowFullscreenButtonSwitch";
import { ShouldShowInvertButtonSwitch } from "./items/ShouldShowInvertButtonSwitch";
import { ShouldShowSharpeningFilterButtonSwitch } from "./items/ShouldShowSharpeningFilterButtonSwitch";
import { TapAreaHeightSegmentGroup } from "./items/TapAreaHeightSegmentGroup";
import { TapAreaWidthSegmentGroup } from "./items/TapAreaWidthSegmentGroup";
import { ViewerCloseButton } from "./items/ViewerCloseButton";
import { ZoomStepSlider } from "./items/ZoomStepSlider";

export const SideMenu = (): JSX.Element => {
    const isOpenSideMenu = useAtomValue(AppStateAtom.isOpenSideMenu);
    const setAppState = useSetAtom(Atom.appState);

    const handleOpenChange = (open: boolean): void => {
        setAppState((a) => a.copyWith({ isOpenSideMenu: open }));
    };

    return (
        <SideMenuDialog
            closeOnInteractOutside
            unmountOnExit
            lazyMount
            modal={false}
            open={isOpenSideMenu}
            onOpenChange={handleOpenChange}
            style={{
                ...safeAreaPaddingLeft(),
                ...safeAreaPaddingTop(),
                ...safeAreaPaddingBottom(),
            }}
        >
            <div className="w-80 space-y-4">
                <div className="flex justify-center">
                    <ViewerCloseButton />
                </div>
                <SelectPageSlider />
                <Card>
                    <BookFormatSegmentGroup />
                </Card>
                <Card footer="ディスプレイのノッチやパンチホールなどを避けてコンテンツを表示します">
                    <ContentFitSegmentGroup />
                    <IsSafeAreaEnabledSwitch />
                </Card>
                <Card
                    footer={`1：1枚の画像を表示\n1・2：表紙だけ1枚、以降は2枚\n2：2枚の画像を並べて表示`}
                >
                    <DisplayModeSegmentGroup />
                </Card>
                <Card footer="拡大時に次、または前のページに移動するのに必要な最大タップ数">
                    <ScrollStepCountSegmentGroup />
                </Card>
                <Card
                    footer={`拡大：ダブルタップ\n縮小：右クリック、またはロングタッチ`}
                >
                    <ZoomStepSlider />
                </Card>
                <Card
                    footer={`左右どちらをタップしても次に進みます\n右クリック、または長押しで前へ戻ります`}
                >
                    <TapAreaWidthSegmentGroup />
                    <TapAreaHeightSegmentGroup />
                    <ShouldAdvanceSwitch />
                </Card>
                <Card>
                    <LongPressRecognitionTimeSlider />
                </Card>
                <Card
                    footer={`垂直スクロール：左右端をスクロール\n水平スクロール：下端をスクロール`}
                >
                    <ScrollSpeedSlider />
                    <IsSmoothScrollEnabledSwitch />
                </Card>
                <Card footer="全画面への切り替えはiPhone以外で使用できます">
                    <ShouldShowSharpeningFilterButtonSwitch />
                    <SharpeningFilterStrengthSlider />
                    <ShouldShowInvertButtonSwitch />
                    <ShouldShowFullscreenButtonSwitch />
                </Card>
                <Card footer="読み込みが遅い場合にパフォーマンスが改善します">
                    <ShouldPreloadSwitch />
                </Card>
            </div>
        </SideMenuDialog>
    );
};
