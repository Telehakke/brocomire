import { isBoolean } from "../../utils/isBoolean";

declare const IsSafeAreaEnabledBrand: unique symbol;

export type IsSafeAreaEnabled = boolean & { [IsSafeAreaEnabledBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const IS_SAFE_AREA_ENABLED_DEFAULT = true;

export const createIsSafeAreaEnabled = (value?: unknown): IsSafeAreaEnabled => {
  if (!isBoolean(value)) return create(IS_SAFE_AREA_ENABLED_DEFAULT);
  return create(value);
};

/* -------------------------------------------------------------------------- */

const create = (value: boolean): IsSafeAreaEnabled => {
  return value as IsSafeAreaEnabled;
};
