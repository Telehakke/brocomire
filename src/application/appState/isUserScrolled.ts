declare const IsUserScrolledBrand: unique symbol;

type IsUserScrolled = boolean & { [IsUserScrolledBrand]: unknown };

export type IsUserScrolledGetter = () => IsUserScrolled;
export type IsUserScrolledSetter = (value: IsUserScrolled) => void;

/* -------------------------------------------------------------------------- */

export const createIsUserScrolled = (value: boolean): IsUserScrolled => {
  return value as IsUserScrolled;
};
