/** フルスクリーンを使用できるかどうか */
export const canUse = (): boolean => {
  return document.documentElement.requestFullscreen != null;
};

/** フルスクリーンを実行 */
export const execute = (): void => {
  void document.documentElement.requestFullscreen();
};

/** フルスクリーンを解除 */
export const exit = (): void => {
  if (document.exitFullscreen == null) return;
  void document.exitFullscreen();
};
