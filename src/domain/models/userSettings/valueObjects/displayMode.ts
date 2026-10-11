export const DisplayModeEnum = { single: "single", book: "book", double: "double" } as const;

export type DisplayModeType = (typeof DisplayModeEnum)[keyof typeof DisplayModeEnum];

/* -------------------------------------------------------------------------- */

declare const DisplayModeBrand: unique symbol;

export type DisplayMode = DisplayModeType & { [DisplayModeBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const DisplayMode = {
  DEFAULT: DisplayModeEnum.single,

  createSafe(value?: unknown): DisplayMode {
    if (!isDisplayModeType(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: DisplayMode, v2: DisplayMode): boolean {
    return v1 === v2;
  },
  isSingle(input: DisplayMode): boolean {
    return input === DisplayModeEnum.single;
  },
} as const;

const create = (value: DisplayModeType): DisplayMode => {
  return value as DisplayMode;
};

const isDisplayModeType = (value: unknown): value is DisplayModeType => {
  return Object.keys(DisplayModeEnum).some((v) => v === value);
};
