import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const microlinkUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}`;
    const response = await fetch(microlinkUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch metadata, status: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.data?.image?.url;

    if (!imageUrl) {
      throw new Error("No image found in metadata");
    }

    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      throw new Error("Failed to fetch image data");
    }

    const arrayBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get("content-type") || "image/jpeg";

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // Cache the image heavily (1 week) to reduce Microlink API hits and speed up load times
        "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Instagram thumbnail proxy error:", error);
    // If we fail, return a 404 or redirect to a fallback image. 
    // Sending a 500 would break Next.js Image component completely. 
    // Next.js `next/image` expects valid image binary, so we redirect to the fallback image.
    const fallbackImage = "https://picsum.photos/800/450?random=88";
    return NextResponse.redirect(fallbackImage, 302);
  }
}
