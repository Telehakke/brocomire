declare const isLandscapeBrand: unique symbol;

export type IsLandscape = boolean & { [isLandscapeBrand]: unknown };

export type IsLandscapeSetter = (value: IsLandscape) => void;

/* -------------------------------------------------------------------------- */

export const createIsLandscape = (value: boolean): IsLandscape => {
  return value as IsLandscape;
};
