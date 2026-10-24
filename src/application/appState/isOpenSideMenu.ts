declare const IsOpenSideMenuBrand: unique symbol;

type IsOpenSideMenu = boolean & { [IsOpenSideMenuBrand]: unknown };

/* -------------------------------------------------------------------------- */

export type IsOpenSideMenuStore = Readonly<{
  get(): IsOpenSideMenu;
  set(value: IsOpenSideMenu): void;
}>;

/* -------------------------------------------------------------------------- */

export const createIsOpenSideMenu = (value: boolean): IsOpenSideMenu => {
  return value as IsOpenSideMenu;
};

export const getIsOpenSideMenuStore = (
  getter: () => IsOpenSideMenu,
  setter: (value: IsOpenSideMenu) => void,
): IsOpenSideMenuStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};
