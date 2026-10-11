import { isNotNull } from "../../utils/isNotNull";

export const SizeEnum: Readonly<{
  none: SizeType;
  s: SizeType;
  m: SizeType;
  l: SizeType;
}> = { none: "none", s: "s", m: "m", l: "l" };

export type SizeType = keyof typeof SizeEnum;

/* -------------------------------------------------------------------------- */

type TapAreaSizeType = Readonly<{
  width: SizeType;
  height: SizeType;
}>;

declare const TapAreaSizeBrand: unique symbol;

export type TapAreaSize = TapAreaSizeType & { [TapAreaSizeBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const TapAreaSize = {
  DEFAULT: SizeEnum.s,

  createSafe(value?: unknown): TapAreaSize {
    if (!isNotNull(value)) return create({ width: this.DEFAULT, height: this.DEFAULT });
    return create(getTapAreaSizeValueOrDefault(value));
  },

  equals(v1: TapAreaSize, v2: TapAreaSize): boolean {
    return v1.width === v2.width && v1.height === v2.height;
  },

  copyWith(input: TapAreaSize, value: Partial<TapAreaSizeType>): TapAreaSize {
    return create({
      width: value.width ?? input.width,
      height: value.height ?? input.height,
    });
  },
} as const;

const create = (value: TapAreaSizeType): TapAreaSize => {
  return value as TapAreaSize;
};

const getTapAreaSizeValueOrDefault = (value: Record<string, unknown>): TapAreaSizeType => {
  const width = value.width;
  const height = value.height;
  return {
    width: isSizeType(width) ? width : TapAreaSize.DEFAULT,
    height: isSizeType(height) ? height : TapAreaSize.DEFAULT,
  };
};

const isSizeType = (value: unknown): value is SizeType => {
  return Object.keys(SizeEnum).some((v) => v === value);
};
