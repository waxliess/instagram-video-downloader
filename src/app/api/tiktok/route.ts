import { NextResponse } from "next/server";

import { z } from "zod";

import { getTikTokVideo } from "@/services/tiktok";
import { ErrorResponse } from "@/types";
import { TikTokVideo } from "@/features/tiktok/types";

const schema = z.object({
  url: z.string().url(),
});

export async function POST(request: Request) {
  const body = await request.json();

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid url",
      },
      {
        status: 400,
      }
    );
  }

  const { url } = parsed.data;

  const data = await getTikTokVideo(url);

  if (!data) {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(data);
}
