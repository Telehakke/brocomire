type MessageEventOptions = Readonly<{
  currentIndex: number;
  imageData: ImageData;
  strength: number;
}>;

// メインスレッドからworkerを呼び出されると実行する処理
onmessage = (event: MessageEvent<MessageEventOptions>): void => {
  const { currentIndex, imageData, strength } = event.data;
  const dist = new ImageData(imageData.width, imageData.height);
  dist.data.set(imageData.data);
  const kernel = getKernel(strength);
  const rowWidth = imageData.width * 4;

  // 最も外側の画素より内側を先鋭化する
  for (let y = 1; y < imageData.height - 1; y++) {
    const rowStart = y * rowWidth;
    const rowEnd = rowStart + rowWidth;
    for (let target = rowStart + 4; target < rowEnd - 4; target += 4) {
      // Red
      dist.data[target] =
        imageData.data[target - rowWidth] * kernel.other +
        imageData.data[target - 4] * kernel.other +
        imageData.data[target] * kernel.center +
        imageData.data[target + 4] * kernel.other +
        imageData.data[target + rowWidth] * kernel.other;

      // Green
      dist.data[target + 1] =
        imageData.data[target - rowWidth + 1] * kernel.other +
        imageData.data[target - 3] * kernel.other +
        imageData.data[target + 1] * kernel.center +
        imageData.data[target + 5] * kernel.other +
        imageData.data[target + rowWidth + 1] * kernel.other;

      // Blue
      dist.data[target + 2] =
        imageData.data[target - rowWidth + 2] * kernel.other +
        imageData.data[target - 2] * kernel.other +
        imageData.data[target + 2] * kernel.center +
        imageData.data[target + 6] * kernel.other +
        imageData.data[target + rowWidth + 2] * kernel.other;
    }
  }

  // メインスレッドへメッセージを送る
  // @ts-expect-error 型定義エラーの抑制
  postMessage({ currentIndex, dist }, [dist.data.buffer]);
};

const getKernel = (strength: number): Readonly<{ other: number; center: number }> => {
  const base = 0.1;
  return {
    other: -base * strength,
    center: base * strength * 4 + 1,
  };
};
