export const formatTimeAgo = (dateString: string) => {
  const tradeDate = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - tradeDate.getTime()) / 1000,
  );

  const intervals: [number, string][] = [
    [60, '초'],
    [60, '분'],
    [24, '시간'],
    [30, '일'],
    [12, '달'],
    [Number.MAX_SAFE_INTEGER, '년'],
  ];

  let counter = diffInSeconds;

  for (const [interval, label] of intervals) {
    if (counter < interval) {
      return `${counter} ${label} 전`;
    }
    counter = Math.floor(counter / interval);
  }
  return '방금 전';
};
