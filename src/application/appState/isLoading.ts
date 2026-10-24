declare const IsLoadingBrand: unique symbol;

export type IsLoading = boolean & { [IsLoadingBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const createIsLoading = (value: boolean): IsLoading => {
  return value as IsLoading;
};
