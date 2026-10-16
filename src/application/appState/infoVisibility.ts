const InfoVisibilityEnum = {
  visible: "visible",
  fadeOut: "fade-out",
  none: "none",
} as const;

type InfoVisibilityValue = (typeof InfoVisibilityEnum)[keyof typeof InfoVisibilityEnum];

/* -------------------------------------------------------------------------- */

declare const InfoVisibilityBrand: unique symbol;

export type InfoVisibility = InfoVisibilityValue & { [InfoVisibilityBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const create = (value: InfoVisibilityValue): InfoVisibility => {
  return value as InfoVisibility;
};

export const toggle = (input: InfoVisibility): InfoVisibility => {
  return input === InfoVisibilityEnum.visible ? create("fade-out") : create("visible");
};

export const isFadeOut = (input: InfoVisibility): boolean => {
  return input === InfoVisibilityEnum.fadeOut;
};

export const isNone = (input: InfoVisibility): boolean => {
  return input === InfoVisibilityEnum.none;
};
