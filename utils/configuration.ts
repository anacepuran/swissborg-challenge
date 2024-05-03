import { HistoricalPeriod } from "./types";

export const BASE_API_URL =
  "https://borg-api-techchallenge.swissborg-stage.com/api/";

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
    color: "rgba(204, 243, 232, 1)",
  },
  {
    title: "BORG Staked",
    attrName: "stakedBorg",
    chartLabel: "Staked",
    showPercentage: true,
    icon: "borg.svg",
    color: "rgba(19, 229, 191, 1)",
  },
  {
    title: "BORG in Yield",
    attrName: "borgInYield",
    chartLabel: "In Yield",
    showPercentage: true,
    icon: "borg.svg",
    color: "rgba(173, 149, 255, 1)",
  },
  {
    title: "Circulating supply burned",
    attrName: "borgBurned",
    chartLabel: "Burned",
    icon: "burned.svg",
    color: "rgba(54, 64, 83, 1)",
  },
  {
    title: "BORG in buyback pool",
    attrName: "borgInBubackPool",
    chartLabel: "In buyback pool",
    icon: "buyback.svg",
    color: "rgba(122, 188, 255, 1)",
  },
];
