import { HistoricalPricePeriod, Price } from "@/utils/types";
import { useEffect, useState } from "react";

const API_URL = "https://borg-api-techchallenge.swissborg-stage.com/api";

export function useFetchHistoricalPriceData(endpoint: string): {
  data: number[][] | null;
} {
  const [data, setData] = useState<number[][] | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        console.log(endpoint);
        const cachedItem = localStorage.getItem(endpoint);
        console.log(cachedItem);
        if (cachedItem) {
          console.log("*** FROM CACHE ***");
          setData(JSON.parse(cachedItem).series);
        } else {
          const response = await fetch(`${API_URL}/${endpoint}`);
          const responseData: HistoricalPricePeriod = await response.json();
          const formattedChartData: number[][] =
            responseData
              ?.filter((_, index) => index % 10 === 0)
              .map((item) => [
                new Date(item.timestamp).getTime(),
                item.price,
              ]) ?? [];
          console.log("formattedChartData");
          console.log(formattedChartData);
          setData(formattedChartData);
        }
      } catch (error) {
        console.error("Error fetching data");
      }
    };
    fetchDataAsync();
  }, [endpoint]);

  return { data: data };
}

export function useFetchPriceData(): {
  data: Record<string, Price> | null;
} {
  const [data, setData] = useState<Record<string, Price> | null>(null);
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(`${API_URL}/price`);
        const responseData: Record<string, Price> = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data");
      }
    };
    fetchDataAsync();
  }, []);

  return { data: data };
}
