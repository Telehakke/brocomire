import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowBookmarkButtonBrand: unique symbol;

export type ShouldShowBookmarkButton = boolean & { [ShouldShowBookmarkButtonBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const SHOULD_SHOW_BOOKMARK_BUTTON_DEFAULT = false;

export const createShouldShowBookmarkButton = (value?: unknown): ShouldShowBookmarkButton => {
  if (!isBoolean(value)) return create(SHOULD_SHOW_BOOKMARK_BUTTON_DEFAULT);
  return create(value);
};

/* -------------------------------------------------------------------------- */

const create = (value: boolean): ShouldShowBookmarkButton => {
  return value as ShouldShowBookmarkButton;
};
