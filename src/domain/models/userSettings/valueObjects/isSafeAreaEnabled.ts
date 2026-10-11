import { isBoolean } from "../../utils/isBoolean";

declare const IsSafeAreaEnabledBrand: unique symbol;

export type IsSafeAreaEnabled = boolean & { [IsSafeAreaEnabledBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const IsSafeAreaEnabled = {
  DEFAULT: true,

  createSafe(value?: unknown): IsSafeAreaEnabled {
    if (!isBoolean(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: IsSafeAreaEnabled, v2: IsSafeAreaEnabled): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: boolean): IsSafeAreaEnabled => {
  return value as IsSafeAreaEnabled;
};
