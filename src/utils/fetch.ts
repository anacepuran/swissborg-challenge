import type { BorgStats, HistoricalPricePeriod, Price } from "@/types";
import axios from "axios";

const BASE_URL = "https://borg-api-techchallenge.swissborg-stage.com/api";

export async function fetchData(endpoint: string): Promise<any> {
  try {
    const response = await axios.get(BASE_URL + endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return null;
  }
}

export async function getBorgStats(): Promise<BorgStats> {
  const borgStats = await fetchData("/borg-stats");
  return borgStats;
}

export async function getHistoricalData(
  period: string
): Promise<HistoricalPricePeriod> {
  const historicalPrice = await fetchData("/historical-price/" + period);
  return historicalPrice;
}

export async function getPriceInformation(): Promise<Record<string, Price>> {
  const price = await fetchData("/price");
  return price;
}
