export async function getRates(baseCurrency: string) {
  try {
    const res = await fetch(`/api/xe-rates?from=${baseCurrency}`);

    if (!res.ok) {
      throw new Error("Failed to fetch rates");
    }

    const data = await res.json();

    // ✅ Backend already returns { rates, time }
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
