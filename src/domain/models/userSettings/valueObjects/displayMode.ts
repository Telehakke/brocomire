export const DisplayModeEnum = { single: "single", book: "book", double: "double" } as const;

export type DisplayModeValue = (typeof DisplayModeEnum)[keyof typeof DisplayModeEnum];

/* -------------------------------------------------------------------------- */

declare const DisplayModeBrand: unique symbol;

export type DisplayMode = DisplayModeValue & { [DisplayModeBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const DISPLAY_MODE_DEFAULT = DisplayModeEnum.single;

export const createDisplayMode = (value?: unknown): DisplayMode => {
  if (!isDisplayModeValue(value)) return create(DISPLAY_MODE_DEFAULT);
  return create(value);
};

export const getDisplayModeValues = (): readonly DisplayModeValue[] => {
  return values;
};

/* -------------------------------------------------------------------------- */

const values = Object.values(DisplayModeEnum);

const create = (value: DisplayModeValue): DisplayMode => {
  return value as DisplayMode;
};

const isDisplayModeValue = (value: unknown): value is DisplayModeValue => {
  return values.some((v) => v === value);
};
