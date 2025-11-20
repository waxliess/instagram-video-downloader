import { useMutation } from "@tanstack/react-query";

import { AsyncReturnType } from "@/types";

import { getInstagramVideoInfo, getTikTokVideoInfo } from "./requests";

export function useInstagramVideoInfo() {
  return useMutation<
    AsyncReturnType<typeof getInstagramVideoInfo>,
    Error,
    Parameters<typeof getInstagramVideoInfo>[0]
  >({
    mutationFn: getInstagramVideoInfo,
  });
}

export function useTikTokVideoInfo() {
  return useMutation<
    AsyncReturnType<typeof getTikTokVideoInfo>,
    Error,
    Parameters<typeof getTikTokVideoInfo>[0]
  >({
    mutationFn: getTikTokVideoInfo,
  });
}
