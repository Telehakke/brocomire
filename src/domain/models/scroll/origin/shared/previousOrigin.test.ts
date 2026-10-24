import { describe, expect, it } from "vite-plus/test";
import { OriginNameEnum } from "../origin";
import { previousOrigin } from "./previousOrigin";

describe("previousOrigin", () => {
  it("縦書き、4ステップの垂直方向原点変化", () => {
    expect(previousOrigin("Top", "vertical", "four").name).toBe(OriginNameEnum.Bottom);
    expect(previousOrigin("Up", "vertical", "four").name).toBe(OriginNameEnum.Top);
    expect(previousOrigin("VCenter", "vertical", "four").name).toBe(OriginNameEnum.Top);
    expect(previousOrigin("Down", "vertical", "four").name).toBe(OriginNameEnum.Top);
    expect(previousOrigin("Bottom", "vertical", "four").name).toBe(OriginNameEnum.Top);
  });

  it("縦書き、6ステップの垂直方向原点変化", () => {
    expect(previousOrigin("Top", "vertical", "six").name).toBe(OriginNameEnum.Bottom);
    expect(previousOrigin("Up", "vertical", "six").name).toBe(OriginNameEnum.Top);
    expect(previousOrigin("VCenter", "vertical", "six").name).toBe(OriginNameEnum.Top);
    expect(previousOrigin("Down", "vertical", "six").name).toBe(OriginNameEnum.VCenter);
    expect(previousOrigin("Bottom", "vertical", "six").name).toBe(OriginNameEnum.VCenter);
  });

  it("横書き、4ステップの垂直方向原点変化", () => {
    expect(previousOrigin("Top", "horizontal", "four").name).toBe(OriginNameEnum.Bottom);
    expect(previousOrigin("Up", "horizontal", "four").name).toBe(OriginNameEnum.Top);
    expect(previousOrigin("VCenter", "horizontal", "four").name).toBe(OriginNameEnum.Top);
    expect(previousOrigin("Down", "horizontal", "four").name).toBe(OriginNameEnum.Top);
    expect(previousOrigin("Bottom", "horizontal", "four").name).toBe(OriginNameEnum.Top);
  });

  it("横書き、6ステップの垂直方向原点変化", () => {
    expect(previousOrigin("Top", "horizontal", "six").name).toBe(OriginNameEnum.Bottom);
    expect(previousOrigin("Up", "horizontal", "six").name).toBe(OriginNameEnum.Top);
    expect(previousOrigin("VCenter", "horizontal", "six").name).toBe(OriginNameEnum.Top);
    expect(previousOrigin("Down", "horizontal", "six").name).toBe(OriginNameEnum.VCenter);
    expect(previousOrigin("Bottom", "horizontal", "six").name).toBe(OriginNameEnum.VCenter);
  });

  /* -------------------------------------------------------------------------- */

  it("縦書き、4ステップの水平方向原点変化", () => {
    expect(previousOrigin("Leftmost", "vertical", "four").name).toBe(OriginNameEnum.Rightmost);
    expect(previousOrigin("Left", "vertical", "four").name).toBe(OriginNameEnum.Rightmost);
    expect(previousOrigin("HCenter", "vertical", "four").name).toBe(OriginNameEnum.Rightmost);
    expect(previousOrigin("Right", "vertical", "four").name).toBe(OriginNameEnum.Rightmost);
    expect(previousOrigin("Rightmost", "vertical", "four").name).toBe(OriginNameEnum.Leftmost);
  });

  it("縦書き、6ステップの水平方向原点変化", () => {
    expect(previousOrigin("Leftmost", "vertical", "six").name).toBe(OriginNameEnum.Rightmost);
    expect(previousOrigin("Left", "vertical", "six").name).toBe(OriginNameEnum.Rightmost);
    expect(previousOrigin("HCenter", "vertical", "six").name).toBe(OriginNameEnum.Rightmost);
    expect(previousOrigin("Right", "vertical", "six").name).toBe(OriginNameEnum.Rightmost);
    expect(previousOrigin("Rightmost", "vertical", "six").name).toBe(OriginNameEnum.Leftmost);
  });

  it("横書き、4ステップの水平方向原点変化", () => {
    expect(previousOrigin("Leftmost", "horizontal", "four").name).toBe(OriginNameEnum.Rightmost);
    expect(previousOrigin("Left", "horizontal", "four").name).toBe(OriginNameEnum.Leftmost);
    expect(previousOrigin("HCenter", "horizontal", "four").name).toBe(OriginNameEnum.Leftmost);
    expect(previousOrigin("Right", "horizontal", "four").name).toBe(OriginNameEnum.Leftmost);
    expect(previousOrigin("Rightmost", "horizontal", "four").name).toBe(OriginNameEnum.Leftmost);
  });

  it("横書き、6ステップの水平方向原点変化", () => {
    expect(previousOrigin("Leftmost", "horizontal", "six").name).toBe(OriginNameEnum.Rightmost);
    expect(previousOrigin("Left", "horizontal", "six").name).toBe(OriginNameEnum.Leftmost);
    expect(previousOrigin("HCenter", "horizontal", "six").name).toBe(OriginNameEnum.Leftmost);
    expect(previousOrigin("Right", "horizontal", "six").name).toBe(OriginNameEnum.Leftmost);
    expect(previousOrigin("Rightmost", "horizontal", "six").name).toBe(OriginNameEnum.Leftmost);
  });
});
