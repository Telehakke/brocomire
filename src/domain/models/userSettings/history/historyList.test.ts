import { describe, expect, it } from "vite-plus/test";
import { createBookId } from "./bookId";
import { createHistory } from "./history";
import {
  createHistoryList,
  getClosedPageIndex,
  tryPrependHistoryList,
  updateHistoryList,
} from "./historyList";

describe("createHistoryList", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createHistoryList([createHistory("filename", 0)])).toEqual([
      { bookId: "filename", closedPageIndex: 0 },
    ]);
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createHistoryList(null)).toEqual([]);
    expect(createHistoryList()).toEqual([]);
  });
});

describe("updateHistoryList", () => {
  const historyList = createHistoryList([
    createHistory("filename1", 1),
    createHistory("filename2", 2),
  ]);

  it("bookIdに一致するリストの要素を更新した新しいリストを返す", () => {
    expect(updateHistoryList(historyList, createHistory("filename1", 0))).toEqual([
      { bookId: "filename1", closedPageIndex: 0 },
      { bookId: "filename2", closedPageIndex: 2 },
    ]);
  });

  it("リストの中に一致するbookIdが存在しない場合、元のリストを返す", () => {
    expect(updateHistoryList(historyList, createHistory("filename3", 3))).toEqual([
      { bookId: "filename1", closedPageIndex: 1 },
      { bookId: "filename2", closedPageIndex: 2 },
    ]);
  });
});

describe("getClosedPageIndex", () => {
  const historyList = createHistoryList([
    createHistory("filename1", 1),
    createHistory("filename2", 2),
  ]);

  it("bookIdに一致するclosedPageIndexを返す", () => {
    expect(getClosedPageIndex(historyList, createBookId("filename1"))).toBe(1);
  });

  it("リストの中にbookIdが存在しない場合undefinedを返す", () => {
    expect(getClosedPageIndex(historyList, createBookId("filename3"))).toBeUndefined();
  });
});

describe("tryPrependHistoryList", () => {
  const historyList = createHistoryList([
    createHistory("filename1", 1),
    createHistory("filename2", 2),
    createHistory("filename3", 3),
  ]);

  it("リストの先頭に新しい履歴が追加された新しいリストを返す", () => {
    expect(tryPrependHistoryList(historyList, createBookId("filename4"))).toEqual([
      { bookId: "filename4", closedPageIndex: 0 },
      { bookId: "filename1", closedPageIndex: 1 },
      { bookId: "filename2", closedPageIndex: 2 },
      { bookId: "filename3", closedPageIndex: 3 },
    ]);
  });

  it("リストが100件を超える場合、後ろの要素から削除される", () => {
    const historyList = createHistoryList(
      [...Array(100)].map((_, i) => createHistory(`filename${i}`, i)),
    );
    const newHistoryList = tryPrependHistoryList(historyList, createBookId("filename100"));
    const expected = createHistoryList([
      createHistory("filename100", 0),
      ...[...Array(99)].map((_, i) => createHistory(`filename${i}`, i)),
    ]);
    expect(newHistoryList.length).toBe(100);
    expect(newHistoryList).toEqual(expected);
  });

  it("追加する履歴がリストの先頭に存在する場合、元のリストを返す", () => {
    expect(tryPrependHistoryList(historyList, createBookId("filename1"))).toEqual([
      { bookId: "filename1", closedPageIndex: 1 },
      { bookId: "filename2", closedPageIndex: 2 },
      { bookId: "filename3", closedPageIndex: 3 },
    ]);
  });

  it("追加する履歴がリストに存在する場合、先頭に移動した新しいリストを返す", () => {
    expect(tryPrependHistoryList(historyList, createBookId("filename2"))).toEqual([
      { bookId: "filename2", closedPageIndex: 2 },
      { bookId: "filename1", closedPageIndex: 1 },
      { bookId: "filename3", closedPageIndex: 3 },
    ]);
  });
});
