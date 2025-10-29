import type { APIEvent } from "@solidjs/start/server";

const TARGET_URL = "https://script.google.com/macros/s/AKfycbz3fQJvLrivCNoeLd7paEcxZbz7q6Ofp0N9HvO96gI5th96NksrusV38LU_l3SgA2pmiQ/exec";

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

