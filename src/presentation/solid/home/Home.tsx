import type { JSX } from "solid-js/jsx-runtime";
import { ImageFilesOpenButton } from "../file/ImageFileOpenButtons";
import { PDFFileOpenButton } from "../file/PDFFileOpenButtons";
import { ZipFileOpenButton } from "../file/ZipFileOpenButtons";
import { joinObjectValues } from "../utils/joinObjectValues";
import {
  safeAreaPaddingBottom,
  safeAreaPaddingLeft,
  safeAreaPaddingRight,
  safeAreaPaddingTop,
} from "../utils/safeAreaPadding";

export const Home = (): JSX.Element => {
  return (
    <>
      <Header />
      <Buttons />
      <Footer />
    </>
  );
};

/* -------------------------------------------------------------------------- */

const Header = (): JSX.Element => {
  return (
    <div class="fixed top-8 left-8" style={{ ...safeAreaPaddingTop, ...safeAreaPaddingLeft }}>
      <div class="flex gap-2">
        <img class="size-16 rounded-md" src={`${import.meta.env.BASE_URL}favicon.svg`} />
        <div class="space-y-0">
          <h1 class="text-4xl font-bold">ブラコミリ</h1>
          <p>ブラウザで動くコミックリーダー</p>
        </div>
      </div>
      <p>26-11-12更新</p>
    </div>
  );
};

const Buttons = (): JSX.Element => {
  const className = {
    _: "m-auto w-max",
    position: "fixed inset-x-0 top-1/2 -translate-y-1/2",
    grid: "grid gap-4 sm:grid-cols-3 grid-dols-1",
  };

  return (
    <div class={joinObjectValues(className)}>
      <ImageFilesOpenButton />
      <PDFFileOpenButton />
      <ZipFileOpenButton />
    </div>
  );
};

const Footer = (): JSX.Element => {
  return (
    <a
      class="fixed right-8 bottom-8 underline"
      style={{ ...safeAreaPaddingBottom, ...safeAreaPaddingRight }}
      href="https://github.com/Telehakke/brocomire/blob/main/docs/licenses.md"
      target="_blank"
    >
      OSSライセンス
    </a>
  );
};
