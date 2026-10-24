import { describe, expect, it } from "vite-plus/test";
import { OriginNameEnum } from "../origin";
import { nextOrigin } from "./nextOrigin";

describe("nextOrigin", () => {
  it("縦書き、4ステップの垂直方向原点変化", () => {
    expect(nextOrigin("Top", "vertical", "four").name).toBe(OriginNameEnum.Bottom);
    expect(nextOrigin("Up", "vertical", "four").name).toBe(OriginNameEnum.Bottom);
    expect(nextOrigin("VCenter", "vertical", "four").name).toBe(OriginNameEnum.Bottom);
    expect(nextOrigin("Down", "vertical", "four").name).toBe(OriginNameEnum.Bottom);
    expect(nextOrigin("Bottom", "vertical", "four").name).toBe(OriginNameEnum.Top);
  });

  it("縦書き、6ステップの垂直方向原点変化", () => {
    expect(nextOrigin("Top", "vertical", "six").name).toBe(OriginNameEnum.VCenter);
    expect(nextOrigin("Up", "vertical", "six").name).toBe(OriginNameEnum.VCenter);
    expect(nextOrigin("VCenter", "vertical", "six").name).toBe(OriginNameEnum.Bottom);
    expect(nextOrigin("Down", "vertical", "six").name).toBe(OriginNameEnum.Bottom);
    expect(nextOrigin("Bottom", "vertical", "six").name).toBe(OriginNameEnum.Top);
  });

  it("横書き、4ステップの垂直方向原点変化", () => {
    expect(nextOrigin("Top", "horizontal", "four").name).toBe(OriginNameEnum.Bottom);
    expect(nextOrigin("Up", "horizontal", "four").name).toBe(OriginNameEnum.Bottom);
    expect(nextOrigin("VCenter", "horizontal", "four").name).toBe(OriginNameEnum.Bottom);
    expect(nextOrigin("Down", "horizontal", "four").name).toBe(OriginNameEnum.Bottom);
    expect(nextOrigin("Bottom", "horizontal", "four").name).toBe(OriginNameEnum.Top);
  });

  it("横書き、6ステップの垂直方向原点変化", () => {
    expect(nextOrigin("Top", "horizontal", "six").name).toBe(OriginNameEnum.VCenter);
    expect(nextOrigin("Up", "horizontal", "six").name).toBe(OriginNameEnum.VCenter);
    expect(nextOrigin("VCenter", "horizontal", "six").name).toBe(OriginNameEnum.Bottom);
    expect(nextOrigin("Down", "horizontal", "six").name).toBe(OriginNameEnum.Bottom);
    expect(nextOrigin("Bottom", "horizontal", "six").name).toBe(OriginNameEnum.Top);
  });

  /* -------------------------------------------------------------------------- */

  it("縦書き、4ステップの水平方向原点変化", () => {
    expect(nextOrigin("Leftmost", "vertical", "four").name).toBe(OriginNameEnum.Rightmost);
    expect(nextOrigin("Left", "vertical", "four").name).toBe(OriginNameEnum.Leftmost);
    expect(nextOrigin("HCenter", "vertical", "four").name).toBe(OriginNameEnum.Leftmost);
    expect(nextOrigin("Right", "vertical", "four").name).toBe(OriginNameEnum.Leftmost);
    expect(nextOrigin("Rightmost", "vertical", "four").name).toBe(OriginNameEnum.Leftmost);
  });

  it("縦書き、6ステップの水平方向原点変化", () => {
    expect(nextOrigin("Leftmost", "vertical", "six").name).toBe(OriginNameEnum.Rightmost);
    expect(nextOrigin("Left", "vertical", "six").name).toBe(OriginNameEnum.Leftmost);
    expect(nextOrigin("HCenter", "vertical", "six").name).toBe(OriginNameEnum.Leftmost);
    expect(nextOrigin("Right", "vertical", "six").name).toBe(OriginNameEnum.Leftmost);
    expect(nextOrigin("Rightmost", "vertical", "six").name).toBe(OriginNameEnum.Leftmost);
  });

  it("横書き、4ステップの水平方向原点変化", () => {
    expect(nextOrigin("Leftmost", "horizontal", "four").name).toBe(OriginNameEnum.Rightmost);
    expect(nextOrigin("Left", "horizontal", "four").name).toBe(OriginNameEnum.Rightmost);
    expect(nextOrigin("HCenter", "horizontal", "four").name).toBe(OriginNameEnum.Rightmost);
    expect(nextOrigin("Right", "horizontal", "four").name).toBe(OriginNameEnum.Rightmost);
    expect(nextOrigin("Rightmost", "horizontal", "four").name).toBe(OriginNameEnum.Leftmost);
  });

  it("横書き、6ステップの水平方向原点変化", () => {
    expect(nextOrigin("Leftmost", "horizontal", "six").name).toBe(OriginNameEnum.Rightmost);
    expect(nextOrigin("Left", "horizontal", "six").name).toBe(OriginNameEnum.Rightmost);
    expect(nextOrigin("HCenter", "horizontal", "six").name).toBe(OriginNameEnum.Rightmost);
    expect(nextOrigin("Right", "horizontal", "six").name).toBe(OriginNameEnum.Rightmost);
    expect(nextOrigin("Rightmost", "horizontal", "six").name).toBe(OriginNameEnum.Leftmost);
  });
});
