declare const isLandscapeBrand: unique symbol;

export type IsLandscape = boolean & { [isLandscapeBrand]: unknown };

/* -------------------------------------------------------------------------- */

export type IsLandscapeStore = Readonly<{
  get(): IsLandscape;
  set(value: IsLandscape): void;
}>;

/* -------------------------------------------------------------------------- */

export const createIsLandscape = (value: boolean): IsLandscape => {
  return value as IsLandscape;
};

export const getIsLandscapeStore = (
  getter: () => IsLandscape,
  setter: (value: IsLandscape) => void,
): IsLandscapeStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};
