import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");

  if (!from) {
    return NextResponse.json(
      { error: "Base currency required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://open.er-api.com/v6/latest/${from}`,
      { cache: "no-store" }
    );

    const data = await response.json();

    if (data.result !== "success") {
      return NextResponse.json(
        { error: "Failed to fetch rates" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      rates: data.rates,
      time: data.time_last_update_utc,
    });

  } catch (error) {
    console.log("Server error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}