// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
const API_URL = "https://borg-api-techchallenge.swissborg-stage.com/api";

// type Data = {
//   name: string;
// };

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: "John Doe" });
// }

export default async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await axios.get<any>(`${API_URL}/${endpoint}`);
    return response.data as T;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}
