declare const isLandscapeBrand: unique symbol;

type IsLandscape = boolean & { [isLandscapeBrand]: unknown };

/* -------------------------------------------------------------------------- */

export type IsLandscapeStore = Readonly<{
  get(): IsLandscape;

  set(value: IsLandscape): void;
}>;

/* -------------------------------------------------------------------------- */

export const IsLandscape = {
  create(value: boolean): IsLandscape {
    return value as IsLandscape;
  },

  getStore(getter: () => IsLandscape, setter: (value: IsLandscape) => void): IsLandscapeStore {
    return { get: () => getter(), set: (v) => setter(v) };
  },
} as const;
