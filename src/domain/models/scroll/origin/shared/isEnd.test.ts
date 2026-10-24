import { describe, expect, it } from "vite-plus/test";
import { OriginNameEnum } from "../origin";
import { isEnd } from "./isEnd";

describe("isEnd", () => {
  it.each(Object.values(OriginNameEnum))(
    "bookFormat=verticalであり、originNameがBottomかLeftmostであればtrueを返す",
    (v) => {
      if (v === "Bottom" || v === "Leftmost") {
        expect(isEnd(v, "vertical")).toBeTruthy();
      } else {
        expect(isEnd(v, "vertical")).toBeFalsy();
      }
    },
  );

  it.each(Object.values(OriginNameEnum))(
    "bookFormat=horizontalであり、originNameがBottomかRightmostであればtrueを返す",
    (v) => {
      if (v === "Bottom" || v === "Rightmost") {
        expect(isEnd(v, "horizontal")).toBeTruthy();
      } else {
        expect(isEnd(v, "horizontal")).toBeFalsy();
      }
    },
  );
});
