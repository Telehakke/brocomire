import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState, type Dispatch, type JSX, type SetStateAction } from "react";
import { createIsOpenSideMenuStore } from "../../../../application/appState/isOpenSideMenu";
import { handleThumbnailClick } from "../../../../application/sideMenu/handleThumbnailClick";
import type { FileManager } from "../../../../domain/models/file/fileManager";
import { createFileNavigatorStore } from "../../../../domain/models/file/fileNavigator";
import { createNotificationStore } from "../../../../domain/models/notification/notification";
import { type BookFormatValue } from "../../../../domain/models/userSettings/valueObjects/bookFormat";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import { createZoomPercentageStore } from "../../../../domain/models/zoom/zoomPercentage";
import {
  bookFormatAtom,
  fileManagerAtom,
  fileNavigatorAtom,
  isOpenSideMenuAtom,
  notificationAtom,
  scrollPercentage2DAtom,
  userSettingsAtom,
  zoomPercentageAtom,
} from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const SelectPageSlider = (): JSX.Element => {
  const bookFormat = useAtomValue(bookFormatAtom);

  return <Container key={bookFormat} />;
};

/* -------------------------------------------------------------------------- */

const Container = (): JSX.Element => {
  const bookFormat = useAtomValue(bookFormatAtom);
  const fileManager = useAtomValue(fileManagerAtom);
  const fileNavigator = useAtomValue(fileNavigatorAtom);
  const [blob, setBlob] = useState<Blob | undefined>(undefined);
  const [index, setIndex] = useState(
    helper(bookFormat).correctIndex(fileNavigator.currentIndex, fileManager),
  );

  return (
    <div>
      <PageSlider {...{ index, setIndex, setBlob }} />
      <Thumbnail {...{ blob, index }} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */

type SetState<T> = Dispatch<SetStateAction<T>>;

const PageSlider = (props: {
  index: number;
  setIndex: SetState<number>;
  setBlob: SetState<Blob | undefined>;
}): JSX.Element => {
  const fileManager = useAtomValue(fileManagerAtom);
  const bookFormat = useAtomValue(bookFormatAtom);

  const handleValueChangedEnd = async (value: number): Promise<void> => {
    props.setBlob(await fileManager.getBlob(helper(bookFormat).correctIndex(value, fileManager)));
  };

  return (
    <Slider
      label={(v) => helper(bookFormat).sliderLabel(v, fileManager)}
      origin={helper(bookFormat).sliderOrigin()}
      min={0}
      max={fileManager.getLength() - 1}
      value={props.index}
      onValueChange={props.setIndex}
      onValueChangeEnd={handleValueChangedEnd}
    />
  );
};

/* -------------------------------------------------------------------------- */

const handleThumbnailClickAtom = atom(null, (get, set, index: number) => {
  const fileNavigatorStore = createFileNavigatorStore(
    () => get(fileNavigatorAtom),
    (v) => set(fileNavigatorAtom, v),
  );
  const isOpenSideMenuStore = createIsOpenSideMenuStore(
    () => get(isOpenSideMenuAtom),
    (v) => set(isOpenSideMenuAtom, v),
  );
  const notificationStore = createNotificationStore(
    () => get(notificationAtom),
    (v) => set(notificationAtom, v),
  );
  const zoomPercentageStore = createZoomPercentageStore(
    () => get(zoomPercentageAtom),
    (v) => set(zoomPercentageAtom, v),
  );
  handleThumbnailClick(
    fileNavigatorStore,
    index,
    isOpenSideMenuStore,
    notificationStore,
    get(scrollPercentage2DAtom),
    () => get(userSettingsAtom),
    zoomPercentageStore,
  );
});

type Image = HTMLImageElement | null;

const Thumbnail = (props: { blob?: Blob; index: number }): JSX.Element | null => {
  const imageRef = useRef<Image>(null);
  const fileManager = useAtomValue(fileManagerAtom);
  const bookFormat = useAtomValue(bookFormatAtom);
  const handleThumbnailClick = useSetAtom(handleThumbnailClickAtom);

  useEffect(() => {
    const image = imageRef.current;
    const imageURL = createURL(props.blob);
    loadImage(image, imageURL);
    return (): void => unloadImage(image, imageURL);
  }, [props.blob]);

  if (props.blob == null) return null;
  return (
    <img
      className="m-auto max-h-50 max-w-50"
      ref={imageRef}
      onClick={() => {
        handleThumbnailClick(helper(bookFormat).correctIndex(props.index, fileManager));
      }}
    />
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
