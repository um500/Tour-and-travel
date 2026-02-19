import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/latest/USD`
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
