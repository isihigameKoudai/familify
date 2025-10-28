import type { APIEvent } from "@solidjs/start/server";

const TARGET_URL = "https://script.google.com/macros/s/AKfycbzfPSFH19GIj60VC6sINhof9nCesNv1-Bkeuf-j6TOwI8t7Ww-lMhP9HLRGb473GHazUg/exec";

const CORS_HEADERS = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
});

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

export async function GET({ request }: APIEvent) {
  try {
    const response = await fetch(TARGET_URL, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    if(!response.ok) {
      return new Response(JSON.stringify({ message: "Failed to fetch payments data." }))
    }

    return await response.json();
  } catch (error) {
    console.error("[payments proxy] upstream fetch failed", error);
    const headers = new Headers(CORS_HEADERS);
    headers.set("Content-Type", "application/json");

    return new Response(
      JSON.stringify({ message: "Failed to fetch payments data." }),
      {
        status: 502,
        headers
      }
    );
  }
}

