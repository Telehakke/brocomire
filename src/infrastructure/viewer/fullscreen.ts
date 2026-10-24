/** フルスクリーンを使用できるかどうか */
export const canUseFullscreen = (): boolean => {
  return document.documentElement.requestFullscreen != null;
};

/** フルスクリーンを実行 */
export const requestFullscreen = (): void => {
  void document.documentElement.requestFullscreen();
};

/** フルスクリーンを解除 */
export const exitFullscreen = (): void => {
  if (document.exitFullscreen == null) return;
  void document.exitFullscreen();
};
