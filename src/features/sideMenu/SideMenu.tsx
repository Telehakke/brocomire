import { useAtom } from "jotai";
import type { JSX } from "react";
import { Atom } from "../../atoms";
import { Card } from "../../components/Card";
import { SideMenuDialog } from "../../components/SideMenuDialog";
import {
    safeAreaPaddingBottom,
    safeAreaPaddingLeft,
    safeAreaPaddingTop,
} from "../../utils/safeAreaPadding";
import { CloseButton } from "./sub/CloseButton";
import { ContentFitSegmentGroup } from "./sub/ContentFitSegmentGroup";
import { DisplayModeSegmentGroup } from "./sub/DisplayModeSegmentGroup";
import { IsSafeAreaEnabledSwitch } from "./sub/IsSafeAreaEnabledSwitch";
import { OnSharpeningFilterSwitch } from "./sub/OnSharpeningFilterSwitch";
import { PreloadPageCountSlider } from "./sub/PreloadPageCountSlider";
import { ScrollSpeedSlider } from "./sub/ScrollSpeedSlider";
import { SelectPageSlider } from "./sub/SelectPageSlider";
import { SharpeningFilterStrengthSlider } from "./sub/SharpeningFilterStrengthSlider";
import { ShouldAdvanceSwitch } from "./sub/ShouldAdvanceSwitch";
import { ShouldPreloadSwitch } from "./sub/ShouldPreloadSwitch";
import { ShouldShowFullscreenButtonSwitch } from "./sub/shouldShowFullscreenButtonSwitch";
import { ShouldShowInvertButtonSwitch } from "./sub/ShouldShowInvertButtonSwitch";
import { TapAreaHeightSegmentGroup } from "./sub/TapAreaHeightSegmentGroup";
import { TapAreaWidthSegmentGroup } from "./sub/TapAreaWidthSegmentGroup";
import { ViewSplitCountSegmentGroup } from "./sub/ViewSplitCountSegmentGroup";
import { WritingTypeSegmentGroup } from "./sub/WritingTypeSegmentGroup";
import { ZoomStepSlider } from "./sub/ZoomStepSlider";

export const SideMenu = (): JSX.Element => {
    const [isOpenSideMenu, setIsOpenSideMenu] = useAtom(Atom.isOpenSideMenu);

    return (
        <SideMenuDialog
            closeOnInteractOutside
            unmountOnExit
            lazyMount
            modal={false}
            open={isOpenSideMenu}
            onOpenChange={setIsOpenSideMenu}
        >
            <div
                style={{
                    ...safeAreaPaddingLeft(),
                    ...safeAreaPaddingTop(),
                    ...safeAreaPaddingBottom(),
                }}
            >
                <div className="w-80 space-y-4">
                    <div className="flex justify-center">
                        <CloseButton />
                    </div>
                    <SelectPageSlider />
                    <Card>
                        <WritingTypeSegmentGroup />
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
                        <ViewSplitCountSegmentGroup />
                    </Card>
                    <Card
                        footer={`拡大：ダブルタップ\n縮小：右クリック、またはロングタッチ`}
                    >
                        <ZoomStepSlider />
                    </Card>
                    <Card>
                        <TapAreaWidthSegmentGroup />
                        <TapAreaHeightSegmentGroup />
                    </Card>
                    <Card
                        footer={`左右どちらをタップしても次に進みます\n右クリック、またはロングタッチで前に戻ります`}
                    >
                        <ShouldAdvanceSwitch />
                    </Card>
                    <Card
                        footer={`垂直スクロール：左右端をスクロール\n水平スクロール：下端をスクロール`}
                    >
                        <ScrollSpeedSlider />
                    </Card>
                    <Card>
                        <OnSharpeningFilterSwitch />
                        <SharpeningFilterStrengthSlider />
                    </Card>
                    <Card footer="全画面への切り替えはiPhone以外で使用できます">
                        <ShouldShowInvertButtonSwitch />
                        <ShouldShowFullscreenButtonSwitch />
                    </Card>
                    <Card footer="読み込みが遅い場合にパフォーマンスが改善します">
                        <ShouldPreloadSwitch />
                        <PreloadPageCountSlider />
                    </Card>
                </div>
            </div>
        </SideMenuDialog>
    );
};
