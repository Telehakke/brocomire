import type { MonochromeTolerance } from "../../../../domain/models/userSettings/valueObjects/monochromeTolerance";

type InvertMonochromeCanvasOptions = Readonly<{
  ctx: CanvasRenderingContext2D;
  imageSize: Readonly<{ width: number; height: number }>;
  tolerance: MonochromeTolerance;
}>;

export const InvertMonochromeCanvas = (o: InvertMonochromeCanvasOptions): void => {
  const src = o.ctx.getImageData(0, 0, o.imageSize.width, o.imageSize.height);
  const dist = new ImageData(o.imageSize.width, o.imageSize.height);
  dist.data.set(src.data);
  const rawWidth = o.imageSize.width * 4;

  for (let y = 0; y < o.imageSize.height; y++) {
    const rawStart = y * rawWidth;
    const rawEnd = rawStart + rawWidth;
    for (let target = rawStart; target < rawEnd; target += 4) {
      const min = Math.min(src.data[target], src.data[target + 1], src.data[target + 2]);
      const max = Math.max(src.data[target], src.data[target + 1], src.data[target + 2]);
      if (max - min > o.tolerance) continue;

      dist.data[target] = 255 - src.data[target]; // Red
      dist.data[target + 1] = 255 - src.data[target + 1]; // Green
      dist.data[target + 2] = 255 - src.data[target + 2]; // Blue
    }
  }

  o.ctx.putImageData(dist, 0, 0);
};
