declare const IsOpenSideMenuBrand: unique symbol;

type IsOpenSideMenu = boolean & { [IsOpenSideMenuBrand]: unknown };

export type IsOpenSideMenuGetter = () => IsOpenSideMenu;
export type IsOpenSideMenuSetter = (value: IsOpenSideMenu) => void;

/* -------------------------------------------------------------------------- */

export const createIsOpenSideMenu = (value: boolean): IsOpenSideMenu => {
  return value as IsOpenSideMenu;
};
