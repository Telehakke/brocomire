import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowSharpeningFilterButtonBrand: unique symbol;

export type ShouldShowSharpeningFilterButton = boolean & {
  [ShouldShowSharpeningFilterButtonBrand]: unknown;
};

/* -------------------------------------------------------------------------- */

export const ShouldShowSharpeningFilterButton = {
  DEFAULT: false,

  createSafe(value?: unknown): ShouldShowSharpeningFilterButton {
    if (!isBoolean(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: ShouldShowSharpeningFilterButton, v2: ShouldShowSharpeningFilterButton): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: boolean): ShouldShowSharpeningFilterButton => {
  return value as ShouldShowSharpeningFilterButton;
};
