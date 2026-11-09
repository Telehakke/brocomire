import type { SharpeningFilterStrength } from "../../../../domain/models/userSettings/valueObjects/sharpeningFilterStrength";

// 先鋭化
export const sharpenCanvas = (
  ctx: CanvasRenderingContext2D,
  imageSize: Readonly<{ width: number; height: number }>,
  strength: SharpeningFilterStrength,
): void => {
  const imageData = ctx.getImageData(0, 0, imageSize.width, imageSize.height);
  const dist = new ImageData(imageSize.width, imageSize.height);
  dist.data.set(imageData.data);
  const weight = getWeight(strength);
  const rawWidth = imageData.width * 4;

  // 最も外側の画素より内側を先鋭化する
  for (let y = 1; y < imageData.height - 1; y++) {
    const rawStart = y * rawWidth;
    const rawEnd = rawStart + rawWidth;
    for (let target = rawStart + 4; target < rawEnd - 4; target += 4) {
      // Red
      dist.data[target] =
        imageData.data[target - rawWidth] * weight.neighbor +
        imageData.data[target - 4] * weight.neighbor +
        imageData.data[target] * weight.center +
        imageData.data[target + 4] * weight.neighbor +
        imageData.data[target + rawWidth] * weight.neighbor;

      // Green
      dist.data[target + 1] =
        imageData.data[target - rawWidth + 1] * weight.neighbor +
        imageData.data[target - 3] * weight.neighbor +
        imageData.data[target + 1] * weight.center +
        imageData.data[target + 5] * weight.neighbor +
        imageData.data[target + rawWidth + 1] * weight.neighbor;

      // Blue
      dist.data[target + 2] =
        imageData.data[target - rawWidth + 2] * weight.neighbor +
        imageData.data[target - 2] * weight.neighbor +
        imageData.data[target + 2] * weight.center +
        imageData.data[target + 6] * weight.neighbor +
        imageData.data[target + rawWidth + 2] * weight.neighbor;
    }
  }

  ctx.putImageData(dist, 0, 0);
};

const getWeight = (
  strength: SharpeningFilterStrength,
): Readonly<{ center: number; neighbor: number }> => {
  const base = 0.1;
  return {
    center: base * strength * 4 + 1,
    neighbor: -base * strength,
  };
};
