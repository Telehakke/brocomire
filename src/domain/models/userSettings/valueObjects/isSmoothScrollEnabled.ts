import { isBoolean } from "../../utils/isBoolean";

declare const IsSmoothScrollEnabledBrand: unique symbol;

export type IsSmoothScrollEnabled = boolean & { [IsSmoothScrollEnabledBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const DEFAULT = false;

export const createSafe = (value?: unknown): IsSmoothScrollEnabled => {
  if (!isBoolean(value)) return create(DEFAULT);
  return create(value);
};

export const equals = (v1: IsSmoothScrollEnabled, v2: IsSmoothScrollEnabled): boolean => {
  return v1 === v2;
};

const create = (value: boolean): IsSmoothScrollEnabled => {
  return value as IsSmoothScrollEnabled;
};
