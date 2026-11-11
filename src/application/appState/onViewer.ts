declare const OnViewerBrand: unique symbol;

type OnViewer = boolean & { [OnViewerBrand]: unknown };

export type OnViewerSetter = (value: OnViewer) => void;

/* -------------------------------------------------------------------------- */

export const createOnViewer = (value: boolean): OnViewer => {
  return value as OnViewer;
};
