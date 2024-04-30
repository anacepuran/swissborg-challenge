export function displayPercentage(value: number): string {
  return (value * 100).toFixed(2);
}
export function formatNumberWithCommas(value: number) {
  return value.toLocaleString("en-US");
}
