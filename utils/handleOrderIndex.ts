export default function (arr: { order_index: number }[]): number {
  return arr.reduce((max, item) => {
    return item.order_index > max
      ? item.order_index
      : max + 1
  }, -Infinity)
}
