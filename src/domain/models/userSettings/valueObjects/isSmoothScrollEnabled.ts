import { isBoolean } from "../../utils/isBoolean";

declare const IsSmoothScrollEnabledBrand: unique symbol;

export type IsSmoothScrollEnabled = boolean & { [IsSmoothScrollEnabledBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const IsSmoothScrollEnabled = {
  DEFAULT: false,

  createSafe(value?: unknown): IsSmoothScrollEnabled {
    if (!isBoolean(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: IsSmoothScrollEnabled, v2: IsSmoothScrollEnabled): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: boolean): IsSmoothScrollEnabled => {
  return value as IsSmoothScrollEnabled;
};
