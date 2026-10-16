import { isNotNull } from "../../utils/isNotNull";

const SizeEnum = { none: "none", s: "s", m: "m", l: "l" } as const;

export type SizeValue = (typeof SizeEnum)[keyof typeof SizeEnum];

/* -------------------------------------------------------------------------- */

type TapAreaSizeValue = Readonly<{
  width: SizeValue;
  height: SizeValue;
}>;

declare const TapAreaSizeBrand: unique symbol;

export type TapAreaSize = TapAreaSizeValue & { [TapAreaSizeBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const DEFAULT = SizeEnum.s;

export const createSafe = (value?: unknown): TapAreaSize => {
  if (!isNotNull(value)) return create({ width: DEFAULT, height: DEFAULT });
  return create(getTapAreaSizeValueOrDefault(value));
};

export const equals = (v1: TapAreaSize, v2: TapAreaSize): boolean => {
  return v1.width === v2.width && v1.height === v2.height;
};

export const copyWith = (input: TapAreaSize, value: Partial<TapAreaSizeValue>): TapAreaSize => {
  return create({
    width: value.width ?? input.width,
    height: value.height ?? input.height,
  });
};

export const getValues = (): readonly SizeValue[] => {
  return Object.values(SizeEnum);
};

export const isNone = (value: SizeValue): boolean => {
  return value === "none";
};

const create = (value: TapAreaSizeValue): TapAreaSize => {
  return value as TapAreaSize;
};

const getTapAreaSizeValueOrDefault = (value: Record<string, unknown>): TapAreaSizeValue => {
  const width = value.width;
  const height = value.height;
  return {
    width: isSizeValue(width) ? width : DEFAULT,
    height: isSizeValue(height) ? height : DEFAULT,
  };
};

const isSizeValue = (value: unknown): value is SizeValue => {
  return Object.keys(SizeEnum).some((v) => v === value);
};
