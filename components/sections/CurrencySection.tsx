"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getRates } from "@/lib/currencyApi";
import { currencyList } from "@/lib/currencyList";
import CurrencyRow from "@/components/ui/CurrencyRow";
import CurrencyDropdown from "@/components/ui/CurrencyDropdown"; // ✅ ADD THIS
import { Plus } from "lucide-react";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function CurrencySection() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [rates, setRates] = useState<any>({});
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const [selectedCurrencies, setSelectedCurrencies] = useState([
    "EUR",
    "INR",
    "JPY",
    "RUB",
  ]);

  useEffect(() => {
    async function fetchData() {
      const data = await getRates(baseCurrency);
      setRates(data?.rates || {});
      setLastUpdated(data?.time || null);
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
    <section className="py-20 bg-[#f5f7fa]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-3">
          Live exchange rates
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Compare 100+ currencies in real time & find the right moment to transfer funds
        </p>

        {/* Column Header */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3 px-4">
          <div className="flex gap-20">
            <span>Inverse</span>
            <span>Amount</span>
            <span>Change (24h)</span>
            <span>Chart (24h)</span>
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="border px-4 py-1 rounded-lg text-blue-600"
          >
            {editMode ? "Done" : "Edit"}
          </button>
        </div>

        {/* ✅ Base Currency Row (NOW DROPDOWN) */}
        <div className="bg-[#001a3d] text-white rounded-xl px-6 py-4 flex justify-between items-center mb-4">

          {/* LEFT SIDE DROPDOWN */}
          <div className="w-72">
            <CurrencyDropdown
              value={baseCurrency}
              onChange={setBaseCurrency}
            />
          </div>

          {/* RIGHT SIDE AMOUNT */}
          <div className="text-xl font-bold">
            {amount}
          </div>
        </div>

        {/* Currency Rows */}
        <div className="space-y-3">
          {selectedCurrencies.map((code) => {
            const currency = currencyList.find(
              (c) => c.code === code
            );

            if (!currency || !rates?.[code]) return null;

            return (
              <CurrencyRow
                key={code}
                currency={currency}
                rate={rates[code]}
                amount={amount}
                baseCurrency={baseCurrency}
                editMode={editMode}
                onRemove={() =>
                  handleRemoveCurrency(code)
                }
              />
            );
          })}
        </div>

        {/* Add Currency Dropdown */}
        <div className="mt-6 w-72">
          <Select
            options={options}
            placeholder="+ Add currency"
            onChange={(selected: any) =>
              handleAddCurrency(selected?.value)
            }
            isSearchable
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

        {/* Last Updated */}
        {lastUpdated && (
          <div className="flex justify-end items-center mt-6 text-sm text-gray-500 gap-3">
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
