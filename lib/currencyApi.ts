export async function getRates(baseCurrency: string) {
  try {
    const res = await fetch(
      `/api/xe-rates?from=${baseCurrency}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch rates");
    }

    const data = await res.json();

    return {
      rates: data.rates || {},
      time: data.time || null,
    };

  } catch (error) {
    console.error("Fetch error:", error);

    return {
      rates: {},
      time: null,
    };
  }
}