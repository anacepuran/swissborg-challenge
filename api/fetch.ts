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
          const response = await fetch(`${API_URL}/${endpoint}`);
          const responseData: T = await response.json();
          setData(responseData);
          localStorage.setItem(endpoint, JSON.stringify(responseData));
        }
      } catch (error) {
        console.error("Error fetching data");
      }
    };
    fetchDataAsync();
  }, [enableCaching, endpoint]);

  return { data: data };
}

export async function fetchData<T>(endpoint: string) {
  // const resPriceInfo = await fetch(BASE_API_URL + "price");
  // const priceInformation: Record<string, Price> = await resPriceInfo.json();
  try {
    const response = await fetch(API_URL + endpoint);
    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
}
