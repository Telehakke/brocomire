declare const OnSharpeningFilterBrand: unique symbol;

export type OnSharpeningFilter = boolean & { [OnSharpeningFilterBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const create = (value: boolean): OnSharpeningFilter => {
  return value as OnSharpeningFilter;
};
