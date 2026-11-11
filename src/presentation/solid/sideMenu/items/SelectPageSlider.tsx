import { createEffect, createSignal, onCleanup, Show, type Setter } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { handleThumbnailClick } from "../../../../application/sideMenu/handleThumbnailClick";
import type { FileManager } from "../../../../domain/models/file/fileManager";
import { type BookFormatValue } from "../../../../domain/models/userSettings/valueObjects/bookFormat";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import {
  fileManagerSignal,
  fileNavigatorSignal,
  isOpenSideMenuSignal,
  notificationSignal,
  scrollPercentage2DSignal,
  userSettingsStore,
  zoomPercentageSignal,
} from "../../../signals";
import { Slider } from "../../utils/Slider";

export const SelectPageSlider = (): JSX.Element => {
  const [userSettings] = userSettingsStore;

  return (
    <Show when={userSettings.bookFormat} keyed>
      <Container />
    </Show>
  );
};

/* -------------------------------------------------------------------------- */

const Container = (): JSX.Element => {
  const [fileManager] = fileManagerSignal;
  const [fileNavigator] = fileNavigatorSignal;
  const [userSettings] = userSettingsStore;
  const [blob, setBlob] = createSignal<Blob | undefined>(undefined);
  const [index, setIndex] = createSignal(
    helper(userSettings.bookFormat).correctIndex(fileNavigator().currentIndex, fileManager()),
  );

  return (
    <div>
      <PageSlider index={index()} setIndex={setIndex} setBlob={setBlob} />
      <Thumbnail blob={blob()} index={index()} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */

const PageSlider = (props: {
  index: number;
  setIndex: Setter<number>;
  setBlob: Setter<Blob | undefined>;
}): JSX.Element => {
  const [fileManager] = fileManagerSignal;
  const [userSettings] = userSettingsStore;

  const handleValueChangedEnd = async (value: number): Promise<void> => {
    props.setBlob(
      await fileManager().getBlob(
        helper(userSettings.bookFormat).correctIndex(value, fileManager()),
      ),
    );
  };

  return (
    <Slider
      label={(v) => helper(userSettings.bookFormat).sliderLabel(v, fileManager())}
      origin={helper(userSettings.bookFormat).sliderOrigin()}
      min={0}
      max={fileManager().getLength() - 1}
      value={props.index}
      onValueChange={props.setIndex}
      onValueChangeEnd={handleValueChangedEnd}
    />
  );
};

/* -------------------------------------------------------------------------- */

const runHandleThumbnailClick = (index: number): void => {
  const [fileNavigator, setFileNavigator] = fileNavigatorSignal;
  const [, setIsOpenSideMenu] = isOpenSideMenuSignal;
  const [, setNotification] = notificationSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;
  const [, setZoomPercentage] = zoomPercentageSignal;

  handleThumbnailClick(
    () => fileNavigator(),
    (v) => setFileNavigator(v),
    index,
    (v) => setIsOpenSideMenu(v),
    (v) => setNotification(v),
    scrollPercentage2D(),
    () => userSettings,
    (v) => setZoomPercentage(v),
  );
};

type Image = HTMLImageElement | undefined;

const Thumbnail = (props: { blob?: Blob; index: number }): JSX.Element => {
  // oxlint-disable-next-line no-unassigned-vars
  let imageRef: HTMLImageElement | undefined;
  const [fileManager] = fileManagerSignal;
  const [userSettings] = userSettingsStore;

  createEffect(() => {
    const imageURL = createURL(props.blob);
    loadImage(imageRef, imageURL);

    onCleanup(() => unloadImage(imageRef, imageURL));
  });

  return (
    <Show when={props.blob != null}>
      <img
        class="m-auto max-h-50 max-w-50"
        ref={imageRef}
        onClick={() => {
          runHandleThumbnailClick(
            helper(userSettings.bookFormat).correctIndex(props.index, fileManager()),
          );
        }}
      />
    </Show>
  );
};

const createURL = (blob?: Blob): string | undefined => {
  if (blob == null) return undefined;
  return URL.createObjectURL(blob);
};

const loadImage = (image: Image, imageURL?: string): void => {
  if (image == null || imageURL == null) return;
  image.src = imageURL;
};

const unloadImage = (image: Image, imageURL?: string): void => {
  if (image == null || imageURL == null) return;
  image.src = "";
  URL.revokeObjectURL(imageURL);
};

/* -------------------------------------------------------------------------- */

type BookFormatFuncs = Readonly<{
  /** 書式に応じた正確なインデックスを返す */
  correctIndex: (index: number, fileManager: FileManager) => number;
  /** スライダーのラベル */
  sliderLabel: (value: number, fileManager: FileManager) => string;
  /** スライダーの原点 */
  sliderOrigin: () => "start" | "end";
}>;

const horizontalFuncs: BookFormatFuncs = {
  correctIndex(index) {
    return index;
  },
  sliderLabel(value, fileManager) {
    return `ページ：${value + 1} / ${fileManager.getLength()}`;
  },
  sliderOrigin() {
    return "start";
  },
};

const verticalFuncs: BookFormatFuncs = {
  correctIndex(index, fileManager) {
    return fileManager.getLength() - index - 1;
  },
  sliderLabel(value, fileManager) {
    return `ページ：${fileManager.getLength() - value} / ${fileManager.getLength()}`;
  },
  sliderOrigin() {
    return "end";
  },
};

const helper = (value: BookFormatValue): BookFormatFuncs => {
  switch (value) {
    case "horizontal":
      return horizontalFuncs;
    case "vertical":
      return verticalFuncs;
    default:
      exhaustiveCheck(value);
      throw new Error();
  }
};
