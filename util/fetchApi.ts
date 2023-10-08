import { toast } from "react-toastify";
import { API_URL } from "../constants/constants";

export default async function fetchApi<T>(
  query: string,
  cache: "force-cache" | "no-store" = "force-cache"
): Promise<T> {
  const res = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query,
    }),
    cache,
  });

  const json = await res.json();

  if (json.errors) {
    console.error("Failed to fetch");
    console.error(json.errors);
    if (typeof window !== undefined) toast.error("Failed to fetch");
  }

  return json.data as Promise<T>;
}
