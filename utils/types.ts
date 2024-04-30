import { z } from "zod";

export interface HistoricalPrice {
  timestamp: string;
  price: number;
}

export type HistoricalPricePeriod = HistoricalPrice[] | null;

export const historicalPeriodSchema = z.enum(["day", "month", "year", "all"]);

export type HistoricalPeriod = z.infer<typeof historicalPeriodSchema>;

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
