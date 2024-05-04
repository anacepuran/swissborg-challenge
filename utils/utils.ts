export function getPriceColor(value: number): string {
  return value > 0 ? "#01c38d" : "#eb4f4b";
}
export function displayPercentage(value: number): string {
  return (value * 100).toFixed(2);
}
export function formatNumberWithCommas(value: number) {
  return value.toLocaleString("en-US");
}
export function formatPieChartLabel(name: string, color: string) {
  return `<div style="display:flex; align-items: center;">
            <div style="background: ${color}; width: 16px; height: 16px; margin:0; padding: 0; border-radius: 8px; line-height: 16px; box-shadow: -1px -1px 3px #2f2f2f;"></div>
            <span style="flex: 1; margin-left: 4px;">${name}</span>
          </div>`;
}
