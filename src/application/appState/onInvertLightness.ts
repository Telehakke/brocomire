declare const OnInvertLightnessBrand: unique symbol;

export type OnInvertLightness = boolean & { [OnInvertLightnessBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const createOnInvertLightness = (value: boolean): OnInvertLightness => {
  return value as OnInvertLightness;
};
