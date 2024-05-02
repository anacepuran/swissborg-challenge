import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "https://borg-api-techchallenge.swissborg-stage.com/api";

export function useFetchData<T>(
  endpoint: string,
  enableCaching?: boolean
): {
  data: T | null;
} {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const cachedItem = localStorage.getItem(endpoint);
        if (cachedItem) {
          setData(JSON.parse(cachedItem));
        } else {
          const response = await axios.get<T>(`${API_URL}/${endpoint}`);
          setData(response.data);
          localStorage.setItem(endpoint, JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Error fetching data");
      }
    };
    fetchDataAsync();
  }, [enableCaching, endpoint]);

  return { data: data };
}
