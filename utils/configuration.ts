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

export const STATS_TO_DISPLAY = [
  {
    title: "Remaining circulating supply",
    attrName: "circulatingSupply",
    chartLabel: "Circulating Supply",
    icon: "swissborg.svg",
  },
  {
    title: "BORG Staked",
    attrName: "stakedBorg",
    chartLabel: "Staked",
    showPercentage: true,
    icon: "borg.svg",
  },
  {
    title: "BORG in Yield",
    attrName: "borgInYield",
    chartLabel: "In Yield",
    showPercentage: true,
    icon: "borg.svg",
  },
  {
    title: "Circulating supply burned",
    attrName: "borgBurned",
    chartLabel: "Burned",
    icon: "burned.svg",
  },
  {
    title: "BORG in buyback pool",
    attrName: "borgInBubackPool",
    chartLabel: "In buyback pool",
    icon: "buyback.svg",
  },
];
