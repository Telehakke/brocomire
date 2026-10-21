import type { FileNavigator } from "../../../../domain/models/file/fileNavigator";

export const sharpenCanvas = (
  ctx: CanvasRenderingContext2D,
  fileNavigatorGetter: () => FileNavigator,
  imageSize: Readonly<{ width: number; height: number }>,
  strength: number,
): void => {
  const { currentIndex } = fileNavigatorGetter();
  const imageData = ctx.getImageData(0, 0, imageSize.width, imageSize.height);
  const worker = new Worker(new URL("./sharpenCanvas.worker.ts", import.meta.url), {
    type: "module",
  });

  // workerからメッセージを受け取ると実行する処理
  worker.onmessage = (
    event: MessageEvent<Readonly<{ currentIndex: number; dist: ImageData }>>,
  ): void => {
    const { currentIndex, dist } = event.data;
    if (fileNavigatorGetter().currentIndex !== currentIndex) return;

    ctx.putImageData(dist, 0, 0);
    worker.terminate();
  };

  // workerへメッセージを送る
  worker.postMessage({ currentIndex, imageData, strength }, [imageData.data.buffer]);
};
