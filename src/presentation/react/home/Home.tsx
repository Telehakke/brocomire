import type { JSX } from "react/jsx-runtime";
import { ImageFilesOpenButton } from "../file/ImageFileOpenButtons";
import { PDFFileOpenButton } from "../file/PDFFileOpenButtons";
import { ZipFileOpenButton } from "../file/ZipFileOpenButtons";
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
    <div
      className="fixed top-4 left-4"
      style={{ ...safeAreaPaddingTop(), ...safeAreaPaddingLeft() }}
    >
      <div className="flex gap-2">
        <img className="size-16 rounded-md" src={`${import.meta.env.BASE_URL}favicon.svg`} />
        <div className="space-y-0">
          <h1 className="text-4xl font-bold">ブラコミリ</h1>
          <p>ブラウザで動くコミックリーダー</p>
        </div>
      </div>
      <p>v0.261019c</p>
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
    <div className={Object.values(className).join(" ")}>
      <ImageFilesOpenButton />
      <PDFFileOpenButton />
      <ZipFileOpenButton />
    </div>
  );
};

const Footer = (): JSX.Element => {
  return (
    <a
      className="fixed right-4 bottom-4 underline"
      style={{ ...safeAreaPaddingBottom(), ...safeAreaPaddingRight() }}
      href="https://github.com/Telehakke/brocomire/blob/main/docs/licenses.md"
      target="_blank"
    >
      OSSライセンス
    </a>
  );
};
