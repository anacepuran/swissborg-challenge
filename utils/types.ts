export interface HistoricalPrice {
  timestamp: string;
  price: number;
}

export interface ChartData {
  series: number[];
  categories: string[];
}
export interface PieChartData {
  name: string;
  y: number;
  color: string;
}

export type HistoricalPricePeriod = HistoricalPrice[] | null;

export type HistoricalPeriod = "day" | "month" | "year" | "all";

export interface Price {
  price: number;
  change24h: number;
}

export type PricesCurrency = Record<string, Price>;

export type BorgStats = Record<string, number>;

export interface BurnTransaction {
  dateTime: string;
  chsbAmountTokens: number;
  url: string;
}
