export type HistoricalPeriod = "day" | "month" | "year" | "all";

export interface HistoricalPrice {
  timestamp: string;
  price: number;
}

export type HistoricalPricePeriod = HistoricalPrice[] | null;

export interface Price {
  price: number;
  change24h: number;
}

export type BorgStats = Record<string, number>;

export interface PieChartData {
  name: string;
  y: number;
  color: string;
}
