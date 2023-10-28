import axios from "axios";

export default function ApiGet<T>(data: Record<string, any>, url: string) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }) as Promise<
    Response & {
      json: () => Promise<T>;
    }
  >;
}

export async function ApiGetAxios<T>(data: Record<string, any>, url: string) {
  return await axios.get<T>(url, {
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  });
}
