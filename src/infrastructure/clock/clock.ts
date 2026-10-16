/** 次回更新のタイミングをミリ秒で取得 */
export const getMsecToNextUpdate = (): number => {
  const now = new Date();
  return 60000 - now.getSeconds() * 1000 - now.getMilliseconds();
};

/** 現在時刻を返す */
export const now = (): string => {
  const now = new Date();
  const hour = zeroPadding(now.getHours());
  const minute = zeroPadding(now.getMinutes());
  return `${hour}:${minute}`;
};

export const zeroPadding = (value: number): string => {
  return `${value}`.padStart(2, "0");
};
