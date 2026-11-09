/** 明度の反転 */
export const invertLightness = (
  ctx: CanvasRenderingContext2D,
  imageSize: Readonly<{ width: number; height: number }>,
): void => {
  const imageData = ctx.getImageData(0, 0, imageSize.width, imageSize.height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const [h, s, v] = rgbToHsv(
      imageData.data[i] / 255,
      imageData.data[i + 1] / 255,
      imageData.data[i + 2] / 255,
    );
    const [newR, newG, newB] = hsvToRgb(h, s, 1 - v);
    imageData.data[i] = newR * 255;
    imageData.data[i + 1] = newG * 255;
    imageData.data[i + 2] = newB * 255;
  }

  ctx.putImageData(imageData, 0, 0);
};

// RGB(0から1の範囲) を HSV(h: 0 ~ 6, s: 0 ~ 1, v: 0 ~ 1) へ変換
const rgbToHsv = (r: number, g: number, b: number): [number, number, number] => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  if (diff !== 0) {
    if (max === r) {
      h = (g - b) / diff;
      if (h < 0) h += 6;
    } else if (max === g) {
      h = (b - r) / diff + 2;
    } else {
      h = (r - g) / diff + 4;
    }
  }

  const s = max === 0 ? 0 : diff / max;
  return [h, s, max];
};

// HSV(h: 0 ~ 6, s: 0 ~ 1, v: 0 ~ 1)  を RGB(0から1の範囲) へ変換
const hsvToRgb = (h: number, s: number, v: number): [number, number, number] => {
  const chroma = s * v;
  const intermediate = chroma * (1 - Math.abs((h % 2) - 1));
  const offset = v - chroma;

  if (h < 1) {
    return [chroma + offset, intermediate + offset, offset];
  } else if (h < 2) {
    return [intermediate + offset, chroma + offset, offset];
  } else if (h < 3) {
    return [offset, chroma + offset, intermediate + offset];
  } else if (h < 4) {
    return [offset, intermediate + offset, chroma + offset];
  } else if (h < 5) {
    return [intermediate + offset, offset, chroma + offset];
  } else {
    return [chroma + offset, offset, intermediate + offset];
  }
};
