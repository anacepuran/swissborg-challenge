import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "https://borg-api-techchallenge.swissborg-stage.com/api";

export function useFetchData<T>(endpoint: string): {
  data: T | null;
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        console.log(`${API_URL}/${endpoint}`);
        const response = await axios.get<T>(`${API_URL}/${endpoint}`);
        setData(response.data);
      } catch (error) {
        setError(new Error("Error fetching data"));
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, [endpoint]);

  return { data: data, loading: loading, error: error };
}
