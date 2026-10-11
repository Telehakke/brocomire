const InfoVisibilityEnum = {
  visible: "visible",
  fadeOut: "fade-out",
  none: "none",
} as const;

type InfoVisibilityType = (typeof InfoVisibilityEnum)[keyof typeof InfoVisibilityEnum];

/* -------------------------------------------------------------------------- */

declare const InfoVisibilityBrand: unique symbol;

export type InfoVisibility = InfoVisibilityType & { [InfoVisibilityBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const InfoVisibility = {
  create(value: InfoVisibilityType): InfoVisibility {
    return value as InfoVisibility;
  },

  toggle(input: InfoVisibility): InfoVisibility {
    return input === InfoVisibilityEnum.visible ? this.create("fade-out") : this.create("visible");
  },

  isFadeOut(input: InfoVisibility): boolean {
    return input === InfoVisibilityEnum.fadeOut;
  },

  isNone(input: InfoVisibility): boolean {
    return input === InfoVisibilityEnum.none;
  },
} as const;
