// メインスレッドからworkerを呼び出されると実行する処理
onmessage = (
  event: MessageEvent<
    Readonly<{
      currentIndex: number;
      imageData: ImageData;
      strength: number;
    }>
  >,
): void => {
  const { currentIndex, imageData, strength } = event.data;
  const dist = new ImageData(imageData.width, imageData.height);
  dist.data.set(imageData.data);
  const kernel = getKernel(strength);
  const rowWidth = imageData.width * 4;

  const setDistData = (
    top: number,
    left: number,
    target: number,
    right: number,
    bottom: number,
  ): void => {
    dist.data[target] =
      imageData.data[top] * kernel.other +
      imageData.data[left] * kernel.other +
      imageData.data[target] * kernel.center +
      imageData.data[right] * kernel.other +
      imageData.data[bottom] * kernel.other;
  };

  // 最も外側の画素より内側を先鋭化する
  for (let y = 1; y < imageData.height - 1; y++) {
    const rowStart = y * rowWidth;
    const rowEnd = rowStart + rowWidth;
    for (let target = rowStart + 4; target < rowEnd - 4; target += 4) {
      const top = target - rowWidth;
      const left = target - 4;
      const right = target + 4;
      const bottom = target + rowWidth;
      setDistData(top, left, target, right, bottom);
      setDistData(top + 1, left + 1, target + 1, right + 1, bottom + 1);
      setDistData(top + 2, left + 2, target + 2, right + 2, bottom + 2);
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
