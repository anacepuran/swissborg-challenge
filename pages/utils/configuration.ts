import { HistoricalPeriod } from "./types";

export const HISTORICAL_PERIOD_OPTIONS: {
  name: HistoricalPeriod;
  displayName: string;
}[] = [
  {
    name: "day",
    displayName: "1D",
  },
  {
    name: "month",
    displayName: "1M",
  },
  {
    name: "year",
    displayName: "1Y",
  },
  {
    name: "all",
    displayName: "ALL",
  },
];
