declare const IsImageWiderThanViewerBrand: unique symbol;

export type IsImageWiderThanViewer =
  | (boolean & { [IsImageWiderThanViewerBrand]: unknown })
  | undefined;

/* -------------------------------------------------------------------------- */

export const create = (value?: boolean): IsImageWiderThanViewer => {
  return value as IsImageWiderThanViewer;
};
