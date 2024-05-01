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
