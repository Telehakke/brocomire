export const InfoVisibilityEnum = {
  visible: "visible",
  fadeOut: "fade-out",
  none: "none",
} as const;

type InfoVisibilityValue = (typeof InfoVisibilityEnum)[keyof typeof InfoVisibilityEnum];

/* -------------------------------------------------------------------------- */

declare const InfoVisibilityBrand: unique symbol;

export type InfoVisibility = InfoVisibilityValue & { [InfoVisibilityBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const createInfoVisibility = (value: InfoVisibilityValue): InfoVisibility => {
  return value as InfoVisibility;
};
