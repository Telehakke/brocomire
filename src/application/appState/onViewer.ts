declare const OnViewerBrand: unique symbol;

type OnViewer = boolean & { [OnViewerBrand]: unknown };

/* -------------------------------------------------------------------------- */

export type OnViewerStore = Readonly<{
  get(): OnViewer;
  set(value: OnViewer): void;
}>;

/* -------------------------------------------------------------------------- */

export const create = (value: boolean): OnViewer => {
  return value as OnViewer;
};

export const getStore = (
  getter: () => OnViewer,
  setter: (value: OnViewer) => void,
): OnViewerStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};
