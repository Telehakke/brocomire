declare const IsUserScrollingBrand: unique symbol;

export type IsUserScrolling = boolean & { [IsUserScrollingBrand]: unknown };

/* -------------------------------------------------------------------------- */

export type IsUserScrollingStore = Readonly<{
  get(): IsUserScrolling;
  set(value: IsUserScrolling): void;
}>;

/* -------------------------------------------------------------------------- */

export const create = (value: boolean): IsUserScrolling => {
  return value as IsUserScrolling;
};

export const getStore = (
  getter: () => IsUserScrolling,
  setter: (value: IsUserScrolling) => void,
): IsUserScrollingStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};
