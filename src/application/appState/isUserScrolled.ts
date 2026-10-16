declare const IsUserScrolledBrand: unique symbol;

type IsUserScrolled = boolean & { [IsUserScrolledBrand]: unknown };

/* -------------------------------------------------------------------------- */

export type IsUserScrolledStore = Readonly<{
  get(): IsUserScrolled;
  set(value: IsUserScrolled): void;
}>;

/* -------------------------------------------------------------------------- */

export const create = (value: boolean): IsUserScrolled => {
  return value as IsUserScrolled;
};

export const getStore = (
  getter: () => IsUserScrolled,
  setter: (value: IsUserScrolled) => void,
): IsUserScrolledStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};
