import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowFullscreenButtonBrand: unique symbol;

export type ShouldShowFullscreenButton = boolean & {
  [ShouldShowFullscreenButtonBrand]: unknown;
};

/* -------------------------------------------------------------------------- */

export const ShouldShowFullscreenButton = {
  DEFAULT: false,

  createSafe(value?: unknown): ShouldShowFullscreenButton {
    if (!isBoolean(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: ShouldShowFullscreenButton, v2: ShouldShowFullscreenButton): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: boolean): ShouldShowFullscreenButton => {
  return value as ShouldShowFullscreenButton;
};
