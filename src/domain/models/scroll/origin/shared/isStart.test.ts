import { describe, expect, it } from "vite-plus/test";
import { OriginNameEnum } from "../origin";
import { isStart } from "./isStart";

describe("isStart", () => {
  it.each(Object.values(OriginNameEnum))(
    "bookFormat=verticalであり、originNameがTopかRightmostであればtrueを返す",
    (v) => {
      if (v === "Top" || v === "Rightmost") {
        expect(isStart(v, "vertical")).toBeTruthy();
      } else {
        expect(isStart(v, "vertical")).toBeFalsy();
      }
    },
  );

  it.each(Object.values(OriginNameEnum))(
    "bookFormat=horizontalであり、originNameがTopかLeftmostであればtrueを返す",
    (v) => {
      if (v === "Top" || v === "Leftmost") {
        expect(isStart(v, "horizontal")).toBeTruthy();
      } else {
        expect(isStart(v, "horizontal")).toBeFalsy();
      }
    },
  );
});
