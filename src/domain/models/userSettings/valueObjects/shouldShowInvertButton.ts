import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowInvertButtonBrand: unique symbol;

export type ShouldShowInvertButton = boolean & { [ShouldShowInvertButtonBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const ShouldShowInvertButton = {
  DEFAULT: false,

  createSafe(value?: unknown): ShouldShowInvertButton {
    if (!isBoolean(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: ShouldShowInvertButton, v2: ShouldShowInvertButton): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: boolean): ShouldShowInvertButton => {
  return value as ShouldShowInvertButton;
};
