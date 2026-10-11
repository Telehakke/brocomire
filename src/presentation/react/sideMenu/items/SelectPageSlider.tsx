import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState, type JSX } from "react";
import { IsOpenSideMenu } from "../../../../application/appState/valueObjects/isOpenSideMenu";
import { handleThumbnailClick } from "../../../../application/sideMenu/handleThumbnailClick";
import type { FileManager } from "../../../../domain/models/file/fileManager";
import { FileNavigator } from "../../../../domain/models/file/fileNavigator";
import { Notification } from "../../../../domain/models/notification/notification";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import { type BookFormatType } from "../../../../domain/models/userSettings/valueObjects/bookFormat";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import { ZoomPercentage } from "../../../../domain/models/zoom/zoomPercentage";
import {
  Atom,
  cacheAtom,
  fileManagerAtom,
  fileNavigatorAtom,
  isOpenSideMenuAtom,
  notificationAtom,
  scrollPercentage2DAtom,
  UserSettingsAtom,
  viewerManagerAtom,
  zoomPercentageAtom,
} from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const SelectPageSlider = (): JSX.Element => {
  const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);

  return <Container key={bookFormat} />;
};

const Container = (): JSX.Element => {
  const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);
  const fileManager = useAtomValue(fileManagerAtom);
  const fileNavigator = useAtomValue(fileNavigatorAtom);
  const [blob, setBlob] = useState<Blob | undefined>(undefined);
  const [index, setIndex] = useState(
    helper(bookFormat).correctIndex(fileNavigator.currentIndex, fileManager),
  );

  return (
    <div>
      <PageSlider index={index} setIndex={setIndex} setBlob={setBlob} />
      <Thumbnail blob={blob} index={index} />
    </div>
  );
};

const PageSlider = (props: {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setBlob: React.Dispatch<React.SetStateAction<Blob | undefined>>;
}): JSX.Element => {
  const fileManager = useAtomValue(fileManagerAtom);
  const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);

  const handleValueChangedEnd = async (value: number): Promise<void> => {
    props.setBlob(await fileManager.getBlob(helper(bookFormat).correctIndex(value, fileManager)));
  };

  return (
    <Slider
      label={(v) => helper(bookFormat).sliderLabel(v, fileManager)}
      origin={helper(bookFormat).sliderOrigin()}
      min={0}
      max={fileManager.length() - 1}
      value={props.index}
      onValueChange={props.setIndex}
      onValueChangeEnd={handleValueChangedEnd}
    />
  );
};

type Image = HTMLImageElement | null;

const handleThumbnailClickAtom = atom(null, (get, set, index: number) => {
  const fileNavigatorStore = FileNavigator.getStore(
    () => get(fileNavigatorAtom),
    (v) => set(fileNavigatorAtom, v),
  );
  const isOpenSideMenuStore = IsOpenSideMenu.getStore(
    () => get(isOpenSideMenuAtom),
    (v) => set(isOpenSideMenuAtom, v),
  );
  const notificationStore = Notification.getStore(
    () => get(notificationAtom),
    (v) => set(notificationAtom, v),
  );
  const userSettingsStore = UserSettings.getStore(
    () => get(Atom.userSettings),
    (v) => set(Atom.userSettings, v),
  );
  const zoomPercentageStore = ZoomPercentage.getStore(
    () => get(zoomPercentageAtom),
    (v) => set(zoomPercentageAtom, v),
  );
  handleThumbnailClick(
    get(cacheAtom),
    fileNavigatorStore,
    index,
    isOpenSideMenuStore,
    notificationStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
    get(viewerManagerAtom),
    zoomPercentageStore,
  );
});

const Thumbnail = (props: { blob?: Blob; index: number }): JSX.Element | null => {
  const imageRef = useRef<Image>(null);
  const fileManager = useAtomValue(fileManagerAtom);
  const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);
  const handleThumbnailClick = useSetAtom(handleThumbnailClickAtom);

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

/* -------------------------------------------------------------------------- */

type BookFormatFuncs = {
  /** 書式に応じた正確なインデックスを返す */
  correctIndex: (index: number, fileManager: FileManager) => number;
  /** スライダーのラベル */
  sliderLabel: (value: number, fileManager: FileManager) => string;
  /** スライダーの原点 */
  sliderOrigin: () => "start" | "end";
};

const horizontalFuncs: BookFormatFuncs = {
  correctIndex(index) {
    return index;
  },
  sliderLabel(value, fileManager) {
    return `ページ：${value + 1} / ${fileManager.length()}`;
  },
  sliderOrigin() {
    return "start";
  },
};

const verticalFuncs: BookFormatFuncs = {
  correctIndex(index, fileManager) {
    return fileManager.length() - index - 1;
  },
  sliderLabel(value, fileManager) {
    return `ページ：${fileManager.length() - value} / ${fileManager.length()}`;
  },
  sliderOrigin() {
    return "end";
  },
};

const helper = (value: BookFormatType): BookFormatFuncs => {
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
