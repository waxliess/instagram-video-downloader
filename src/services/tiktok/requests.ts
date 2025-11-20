import { apiClient } from "@/lib/api-client";
import { TikTokEndpoints } from "./constants";

export async function getTikTokVideo(url: string) {
  const searchParams = new URLSearchParams({
    url,
    hd: "1",
  });
  const response = await apiClient.get(
    `${TikTokEndpoints.GetTikTokVideo}?${searchParams.toString()}`
  );

  const data = await response.json();

  return data;
}
