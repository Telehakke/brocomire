declare const OnInvertFilterBrand: unique symbol;

export type OnInvertFilter = boolean & { [OnInvertFilterBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const create = (value: boolean): OnInvertFilter => {
  return value as OnInvertFilter;
};
