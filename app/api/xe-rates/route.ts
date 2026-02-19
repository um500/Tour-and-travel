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
      `https://xecdapi.xe.com/v1/convert_from.json/?from=${from}&to=EUR,INR,JPY,RUB`,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.XE_ACCOUNT_ID}:${process.env.XE_API_KEY}`
            ).toString("base64"),
        },
      }
    );

    const data = await response.json();

    console.log("XE RAW RESPONSE:", data); // DEBUG

    const rates: Record<string, number> = {};

    if (data?.to && Array.isArray(data.to)) {
      data.to.forEach((item: any) => {
        rates[item.quotecurrency] = item.mid;
      });
    }

    return NextResponse.json({
      rates,
      time: new Date().toISOString(),
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch rates" },
      { status: 500 }
    );
  }
}
