declare const OnInvertMonochromeBrand: unique symbol;

export type OnInvertMonochrome = boolean & { [OnInvertMonochromeBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const createOnInvertMonochrome = (value: boolean): OnInvertMonochrome => {
  return value as OnInvertMonochrome;
};
