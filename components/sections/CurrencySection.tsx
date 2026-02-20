"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getRates } from "@/lib/currencyApi";
import { currencyList } from "@/lib/currencyList";
import CurrencyRow from "@/components/ui/CurrencyRow";
import CurrencyDropdown from "@/components/ui/CurrencyDropdown";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function CurrencySection() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([
    "EUR",
    "INR",
    "JPY",
    "RUB",
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRates(baseCurrency);
        if (data?.rates) {
          setRates(data.rates);
          setLastUpdated(data.time);
        }
      } catch (error) {
        console.log("Rate fetch error:", error);
      }
    }

    fetchData();
  }, [baseCurrency]);

  const handleRemoveCurrency = (code: string) => {
    setSelectedCurrencies((prev) =>
      prev.filter((c) => c !== code)
    );
  };

  const handleAddCurrency = (code: string) => {
    if (
      !selectedCurrencies.includes(code) &&
      code !== baseCurrency
    ) {
      setSelectedCurrencies((prev) => [...prev, code]);
    }
  };

  const options = currencyList
    .filter(
      (c) =>
        !selectedCurrencies.includes(c.code) &&
        c.code !== baseCurrency
    )
    .map((currency) => ({
      value: currency.code,
      label: currency.name,
      code: currency.code,
      countryCode: currency.countryCode,
    }));

  return (
    <section className="py-16 bg-[#f5f7fa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ================= HEADING ================= */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Live exchange rates
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Compare 100+ currencies in real time & find the right moment to transfer funds
          </p>
        </div>

        {/* ================= COLUMN HEADER + EDIT ================= */}
        <div className="flex items-center justify-between mb-4">

          {/* COLUMN TITLES */}
          <div className="grid grid-cols-4 sm:grid-cols-5 items-center text-xs sm:text-sm text-gray-500 flex-1 px-2 sm:px-4">

            <div className="col-span-1 sm:col-span-2">
              Inverse
            </div>

            <div className="text-center sm:text-right">
              Amount
            </div>

            <div className="text-center">
              Change (24h)
            </div>

            <div className="text-center hidden sm:block">
              Chart (24h)
            </div>

          </div>

          {/* EDIT BUTTON */}
          <button
            onClick={() => setEditMode(!editMode)}
            className="ml-2 border border-blue-600 text-blue-600 px-3 sm:px-4 py-1 rounded-lg text-xs sm:text-sm hover:bg-blue-50 transition"
          >
            {editMode ? "Done" : "Edit"}
          </button>

        </div>

        {/* ================= BASE CURRENCY ROW ================= */}
        <div className="bg-[#001a3d] text-white rounded-xl px-4 sm:px-6 py-4 flex justify-between items-center mb-4">
          <div className="w-52 sm:w-72">
            <CurrencyDropdown
              value={baseCurrency}
              onChange={setBaseCurrency}
            />
          </div>

          <div className="text-lg sm:text-xl font-bold">
            {amount}
          </div>
        </div>

        {/* ================= CURRENCY ROWS ================= */}
        <div className="space-y-3">
          {selectedCurrencies.map((code) => {
            const currency = currencyList.find(
              (c) => c.code === code
            );

            if (!currency) return null;

            return (
              <CurrencyRow
                key={code}
                currency={currency}
                rate={rates?.[code] ?? 0}
                amount={amount}
                baseCurrency={baseCurrency}
                editMode={editMode}
                onRemove={() => handleRemoveCurrency(code)}
              />
            );
          })}
        </div>

        {/* ================= ADD CURRENCY ================= */}
        <div className="mt-6 w-full sm:w-72">
          <Select
            options={options}
            placeholder="+ Add currency"
            onChange={(selected: any) =>
              handleAddCurrency(selected?.value)
            }
            isSearchable
            isClearable
            formatOptionLabel={(option: any) => (
              <div className="flex items-center gap-3">
                <img
                  src={`https://flagcdn.com/w40/${option.countryCode}.png`}
                  className="w-6 h-6 rounded-full"
                  alt={option.code}
                />
                <div>
                  <p className="text-sm font-medium">
                    {option.label}
                  </p>
                  <p className="text-xs text-gray-500">
                    {option.code}
                  </p>
                </div>
              </div>
            )}
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "12px",
                padding: "4px",
              }),
            }}
          />
        </div>

        {/* ================= LAST UPDATED ================= */}
        {lastUpdated && (
          <div className="flex flex-col sm:flex-row justify-end items-center mt-6 text-sm text-gray-500 gap-3">
            <div className="w-10 h-10 border-2 border-blue-600 rounded-full flex items-center justify-center text-blue-600 font-semibold">
              60
            </div>
            Last updated {lastUpdated}
          </div>
        )}

      </div>
    </section>
  );
}