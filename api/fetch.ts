import { HistoricalPricePeriod } from "@/utils/types";
import { useEffect, useState } from "react";

const API_URL =
  "https://borg-api-techchallenge.swissborg-stage.com/api/historical-price/";

export function useFetchHistoricalPriceData(endpoint: string): {
  data: number[][] | null;
  loading: boolean;
} {
  const [data, setData] = useState<number[][] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/${endpoint}`);
        const responseData: HistoricalPricePeriod = await response.json();
        const formattedChartData: number[][] =
          responseData
            ?.filter((_, index) => index % 10 === 0)
            .map((item) => [new Date(item.timestamp).getTime(), item.price]) ??
          [];
        setData(formattedChartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data");
      }
    };
    fetchDataAsync();
  }, [endpoint]);

  return { data, loading };
}
