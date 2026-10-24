export const SizeEnum = { none: "none", s: "s", m: "m", l: "l" } as const;

export type SizeValue = (typeof SizeEnum)[keyof typeof SizeEnum];

/* -------------------------------------------------------------------------- */

type TapAreaSizeValue = Readonly<{
  width: SizeValue;
  height: SizeValue;
}>;

declare const TapAreaSizeBrand: unique symbol;

export type TapAreaSize = TapAreaSizeValue & { [TapAreaSizeBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const SIZE_DEFAULT = SizeEnum.s;

export const createTapAreaSize = (width?: unknown, height?: unknown): TapAreaSize => {
  return { width: createSizeValue(width), height: createSizeValue(height) } as TapAreaSize;
};

export const copyTapAreaSizeWith = (
  input: TapAreaSize,
  value: Partial<TapAreaSizeValue>,
): TapAreaSize => {
  return {
    width: value.width ?? input.width,
    height: value.height ?? input.height,
  } as TapAreaSize;
};

export const getSizeValues = (): readonly SizeValue[] => {
  return values;
};

/* -------------------------------------------------------------------------- */

const values = Object.values(SizeEnum);

const createSizeValue = (value?: unknown): SizeValue => {
  if (!isSizeValue(value)) return SIZE_DEFAULT;
  return value;
};

const isSizeValue = (value: unknown): value is SizeValue => {
  return values.some((v) => v === value);
};
