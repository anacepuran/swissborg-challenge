const API_URL = "https://borg-api-techchallenge.swissborg-stage.com/api/";

export async function fetchData<T>(endpoint: string) {
  try {
    const response = await fetch(API_URL + endpoint);
    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
}
