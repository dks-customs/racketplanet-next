import { API_URL } from "../constants/constants";

export default async function fetchApi<T>(
  query: string,
  variables: object = {},
  cache: "force-cache" | "no-store" = "force-cache"
): Promise<T> {
  const res = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query,
      variables: {
        variables,
      },
      cache,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data as Promise<T>;
}
