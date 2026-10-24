import { describe, expect, it, test } from "vite-plus/test";
import { ImageFileManger } from "./imageFileManager";

test("clear", () => {
  const imageFileManager = ImageFileManger.create([new File([], "")]);
  imageFileManager.clear();
  expect(imageFileManager.getLength()).toBe(0);
});

test("getLength", () => {
  const imageFileManager = ImageFileManger.create([new File([], "")]);
  expect(imageFileManager.getLength()).toBe(1);
});

describe("hasFiles", () => {
  it("ファイルが存在すればtrueを返す", () => {
    const imageFileManager = ImageFileManger.create([new File([], "")]);
    expect(imageFileManager.hasFiles()).toBeTruthy();
  });

  it("ファイルが存在しなければfalseを返す", () => {
    const imageFileManager = ImageFileManger.create([]);
    expect(imageFileManager.hasFiles()).toBeFalsy();
  });
});

describe("getBlob", () => {
  it("indexの位置にファイルが存在すればBlobを返す", async () => {
    const imageFileManager = ImageFileManger.create([new File([], "")]);
    expect((await imageFileManager.getBlob(0)) != null).toBeTruthy();
  });

  it("indexの位置にファイルが存在しなければfalseを返す", async () => {
    const imageFileManager = ImageFileManger.create([new File([], "")]);
    expect(await imageFileManager.getBlob(-1)).toBeUndefined();
    expect(await imageFileManager.getBlob(1)).toBeUndefined();
  });
});
