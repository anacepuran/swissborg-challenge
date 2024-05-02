import { HistoricalPeriod } from "./types";

export function getPriceColor(value: number): string {
  return value > 0 ? "#01c38d" : "#eb4f4b";
}
export function displayPercentage(value: number): string {
  return (value * 100).toFixed(2);
}
export function formatNumberWithCommas(value: number) {
  return value.toLocaleString("en-US");
}
export function getDateFormat(period: HistoricalPeriod, chartView?: boolean) {
  switch (period) {
    case "day":
      return "HH:00";
    case "month":
      return "dd MMM";
    case "year":
    case "all":
      return chartView ? "MMM yy" : "dd MMM yy";
  }
}

export function formatPieChartLabel(name: string, color: string) {
  return `<div style="display:flex; align-items: center;">
            <div style="background: ${color}; width: 20px; height: 20px; border-radius: 10px; margin-right: 5px; box-shadow: -0.5px 0.5px 2px #2f2f2f;"></div>
            ${name}
          </div>`;
}
