import { HistoricalPeriod, HistoricalPricePeriod } from "./types";

export async function fetchHistoricalData(
  period: HistoricalPeriod
): Promise<number[][]> {
  const response = await fetch(
    `https://borg-api-techchallenge.swissborg-stage.com/api/historical-price/${period}`
  );
  const data: HistoricalPricePeriod = await response.json();
  // Reduce datapoints
  const formattedChartData: number[][] =
    data
      ?.filter((item, index) => index % 10 === 0)
      .map((item) => [new Date(item.timestamp).getTime(), item.price]) ?? [];

  return formattedChartData;
}
