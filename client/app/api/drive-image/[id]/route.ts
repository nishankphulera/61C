import { NextRequest } from "next/server";

const FILE_ID_RE = /^[a-zA-Z0-9_-]{10,}$/;

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await context.params;
  if (!FILE_ID_RE.test(id)) {
    return new Response("Invalid file id", { status: 400 });
  }

  const upstream = await fetch(`https://lh3.googleusercontent.com/d/${id}=w1920`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; 61C-Portfolio/1.0)",
    },
    redirect: "follow",
  });

  if (!upstream.ok) {
    return new Response("Image unavailable", { status: upstream.status });
  }

  const body = await upstream.arrayBuffer();
  const contentType = upstream.headers.get("content-type") || "image/jpeg";

  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
