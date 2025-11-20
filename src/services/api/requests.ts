import { apiClient } from "@/lib/api-client";
import { CustomError } from "@/lib/errors";
import { APIResponse, VideoInfo } from "@/types";
import { TikTokVideo } from "@/features/tiktok/types";
import { ServerEndpoints } from "./constants";

export async function getInstagramVideoInfo({
  postUrl,
}: {
  postUrl: string;
}): Promise<VideoInfo> {
  const searchParams = new URLSearchParams({ postUrl });
  const res = await apiClient.get(
    `${ServerEndpoints.GetByPostURL}?${searchParams.toString()}`
  );

  const json = (await res.json()) as APIResponse<VideoInfo>;

  if (json.status === "error") {
    throw new CustomError(json.message);
  }

  const data = json.data;

  return data;
}

export async function getTikTokVideoInfo({
  postUrl,
}: {
  postUrl: string;
}): Promise<TikTokVideo> {
  const res = await apiClient.post(
    `${ServerEndpoints.GetByTikTokURL}`,
    {
      body: JSON.stringify({ url: postUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await res.json();

  if (json.code !== 0) {
    throw new CustomError(json.msg);
  }

  return json;
}
