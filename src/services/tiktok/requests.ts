import { apiClient } from "@/lib/api-client";
import { TikTokEndpoints } from "./constants";

export async function getTikTokVideo(url: string) {
  const response = await apiClient.get(TikTokEndpoints.GetTikTokVideo, {
    params: {
      url,
      hd: 1,
    },
  });

  const data = await response.json();

  return data;
}
