"use client";

import { useEffect, useState } from "react";

interface ApiResponse {
  result: string;
  rates: Record<string, number>;
}

export default function CurrencySection() {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");

        if (!res.ok) {
          throw new Error("Network response failed");
        }

        const data: ApiResponse = await res.json();

        if (data && data.rates) {
          setRates(data.rates);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Currency API Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Live Exchange Rates
        </h2>

        <p className="text-center text-gray-600 mb-10">
          Compare major currencies in real time
        </p>

        {loading && (
          <p className="text-center text-gray-500">Fetching live data...</p>
        )}

        {error && (
          <p className="text-center text-red-500">
            Failed to load currency data.
          </p>
        )}

        {rates && !loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <RateCard title="USD → INR" value={rates["INR"]} />
            <RateCard title="USD → AED" value={rates["AED"]} />
            <RateCard title="USD → EUR" value={rates["EUR"]} />
            <RateCard title="USD → GBP" value={rates["GBP"]} />
          </div>
        )}
      </div>
    </section>
  );
}

interface RateCardProps {
  title: string;
  value?: number;
}

function RateCard({ title, value }: RateCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-2">
        {value ? value.toFixed(2) : "—"}
      </p>
    </div>
  );
}
