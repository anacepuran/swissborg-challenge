import axios from "axios";
const API_URL = "https://borg-api-techchallenge.swissborg-stage.com/api";

interface ApiResponse<T> {
  data: T;
}

export default async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await axios.get<ApiResponse<T>>(`${API_URL}/${endpoint}`);
    return response.data as T;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }

  try {
    const response = await axios.get<ApiResponse<T>>(`${API_URL}/${endpoint}`, {
      headers: {
        // Prevent caching by adding cache-control headers
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    return response.data.data; // Assuming API response structure wraps data in a "data" property
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}
