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
  const others = [...Array(256)].map((_, i) => i * kernel.other);
  const centers = [...Array(256)].map((_, i) => i * kernel.center);
  const rowWidth = imageData.width * 4;

  // 最も外側の画素より内側を先鋭化する
  for (let y = 1; y < imageData.height - 1; y++) {
    const rowStart = y * rowWidth;
    const rowEnd = rowStart + rowWidth;
    for (let target = rowStart + 4; target < rowEnd - 4; target += 4) {
      const top = target - rowWidth;
      const left = target - 4;
      const right = target + 4;
      const bottom = target + rowWidth;

      dist.data[target] =
        others[imageData.data[top]] +
        others[imageData.data[left]] +
        centers[imageData.data[target]] +
        others[imageData.data[right]] +
        others[imageData.data[bottom]];

      dist.data[target + 1] =
        others[imageData.data[top + 1]] +
        others[imageData.data[left + 1]] +
        centers[imageData.data[target + 1]] +
        others[imageData.data[right + 1]] +
        others[imageData.data[bottom + 1]];

      dist.data[target + 2] =
        others[imageData.data[top + 2]] +
        others[imageData.data[left + 2]] +
        centers[imageData.data[target + 2]] +
        others[imageData.data[right + 2]] +
        others[imageData.data[bottom + 2]];
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
