import { isBoolean } from "../../utils/isBoolean";

declare const IsSafeAreaEnabledBrand: unique symbol;

export type IsSafeAreaEnabled = boolean & { [IsSafeAreaEnabledBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const DEFAULT = true;

export const createSafe = (value?: unknown): IsSafeAreaEnabled => {
  if (!isBoolean(value)) return create(DEFAULT);
  return create(value);
};

export const equals = (v1: IsSafeAreaEnabled, v2: IsSafeAreaEnabled): boolean => {
  return v1 === v2;
};

const create = (value: boolean): IsSafeAreaEnabled => {
  return value as IsSafeAreaEnabled;
};
