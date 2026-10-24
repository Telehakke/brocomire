import { isBoolean } from "../../utils/isBoolean";

declare const IsSmoothScrollEnabledBrand: unique symbol;

export type IsSmoothScrollEnabled = boolean & { [IsSmoothScrollEnabledBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const IS_SMOOTH_SCROLL_ENABLED_DEFAULT = false;

export const createIsSmoothScrollEnabled = (value?: unknown): IsSmoothScrollEnabled => {
  if (!isBoolean(value)) return create(IS_SMOOTH_SCROLL_ENABLED_DEFAULT);
  return create(value);
};

/* -------------------------------------------------------------------------- */

const create = (value: boolean): IsSmoothScrollEnabled => {
  return value as IsSmoothScrollEnabled;
};
