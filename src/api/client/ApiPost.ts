import axios from "axios";

export default async function ApiPost<T>(
  body: Record<string, any>,
  url: string,
) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }) as Promise<
    Response & {
      json: () => Promise<T>;
    }
  >;
}

export async function ApiPostAxios<T>(body: Record<string, any>, url: string) {
  return await axios.post<T>(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
