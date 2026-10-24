import { describe, expect, it, test } from "vite-plus/test";
import { BlobCache } from "./blobCache";

describe("get", () => {
  const blobCache = new BlobCache([{ fileIndex: 0, blob: new Blob() }]);

  it("fileIndexが一致すればBlobを返す", () => {
    expect(blobCache.getBlob(0) != null).toBeTruthy();
  });

  it("fileIndexが存在しなければundefinedを返す", () => {
    expect(blobCache.getBlob(1)).toBeUndefined();
  });
});

describe("add", () => {
  it("キャッシュに追加される", () => {
    const blobCache = new BlobCache();
    blobCache.addBlob(0, new Blob());
    expect(blobCache.getBlob(0) != null).toBeTruthy();
  });

  it("既にキャッシュにfileIndexが存在する場合、追加されない", () => {
    const blobCache = new BlobCache([{ fileIndex: 0, blob: new Blob() }]);
    blobCache.addBlob(0, new Blob());
    expect(blobCache.getLength()).toBe(1);
  });
});

test("trim", () => {
  const blobCache = new BlobCache([
    { fileIndex: 0, blob: new Blob() },
    { fileIndex: 1, blob: new Blob() },
    { fileIndex: 2, blob: new Blob() },
    { fileIndex: 3, blob: new Blob() },
  ]);
  blobCache.trim(1, 2);
  expect(blobCache.getLength()).toBe(2);
  expect(blobCache.getBlob(0)).toBeUndefined();
  expect(blobCache.getBlob(3)).toBeUndefined();
});

test("clear", () => {
  const blobCache = new BlobCache([{ fileIndex: 0, blob: new Blob() }]);
  blobCache.clear();
  expect(blobCache.getLength()).toBe(0);
});
