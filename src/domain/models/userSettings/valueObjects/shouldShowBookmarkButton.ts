import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowBookmarkButtonBrand: unique symbol;

export type ShouldShowBookmarkButton = boolean & { [ShouldShowBookmarkButtonBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const DEFAULT = false;

export const createSafe = (value?: unknown): ShouldShowBookmarkButton => {
  if (!isBoolean(value)) return create(DEFAULT);
  return create(value);
};

export const equals = (v1: ShouldShowBookmarkButton, v2: ShouldShowBookmarkButton): boolean => {
  return v1 === v2;
};

const create = (value: boolean): ShouldShowBookmarkButton => {
  return value as ShouldShowBookmarkButton;
};
