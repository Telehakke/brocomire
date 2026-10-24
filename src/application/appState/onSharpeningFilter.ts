declare const OnSharpeningFilterBrand: unique symbol;

export type OnSharpeningFilter = boolean & { [OnSharpeningFilterBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const createOnSharpeningFilter = (value: boolean): OnSharpeningFilter => {
  return value as OnSharpeningFilter;
};
