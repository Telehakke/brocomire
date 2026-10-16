export const DisplayModeEnum = { single: "single", book: "book", double: "double" } as const;

export type DisplayModeValue = (typeof DisplayModeEnum)[keyof typeof DisplayModeEnum];

/* -------------------------------------------------------------------------- */

declare const DisplayModeBrand: unique symbol;

export type DisplayMode = DisplayModeValue & { [DisplayModeBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const DEFAULT = DisplayModeEnum.single;

export const createSafe = (value?: unknown): DisplayMode => {
  if (!isDisplayModeValue(value)) return create(DEFAULT);
  return create(value);
};

export const equals = (v1: DisplayMode, v2: DisplayMode): boolean => {
  return v1 === v2;
};

export const getValues = (): readonly DisplayModeValue[] => {
  return Object.values(DisplayModeEnum);
};

export const isSingle = (input: DisplayMode): boolean => {
  return input === DisplayModeEnum.single;
};

const create = (value: DisplayModeValue): DisplayMode => {
  return value as DisplayMode;
};

const isDisplayModeValue = (value: unknown): value is DisplayModeValue => {
  return Object.keys(DisplayModeEnum).some((v) => v === value);
};
