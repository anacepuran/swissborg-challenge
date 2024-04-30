import { BorgStats, HistoricalPricePeriod, Price } from "../../utils/types";
import fetchData from "./fetch";

// Data caching
const cachedData: Record<string, HistoricalPricePeriod> = {};

export async function getHistoricalData(
  period: string
): Promise<HistoricalPricePeriod> {
  if (!cachedData[period]) {
    cachedData[period] = await fetchData<any>("historical-price/" + period);
  }
  return cachedData[period];
}

export async function getBorgStats(): Promise<BorgStats> {
  const borgStats = await fetchData<BorgStats>("borg-stats");
  return borgStats;
}

export async function getPriceInformation(): Promise<Record<string, Price>> {
  const price = await fetchData<Record<string, Price>>("price");
  return price;
}
