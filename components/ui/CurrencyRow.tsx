"use client";

import { Sparklines, SparklinesLine } from "react-sparklines";
import { CurrencyType } from "@/lib/currencyList";
import { X } from "lucide-react";

interface Props {
  currency: CurrencyType;
  rate: number;
  amount: number;
  onRemove: () => void;
  baseCurrency: string;
  editMode: boolean;
}

export default function CurrencyRow({
  currency,
  rate,
  amount,
  onRemove,
  editMode,
}: Props) {

  // 🔥 REAL API VALUE USE HO RAHA HAI
  const convertedValue = (rate * amount).toFixed(4);

  // Optional: Fake change for UI
  const percentChange = (Math.random() * 0.8).toFixed(2);

  return (
    <div className="bg-white rounded-xl px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-all">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4 w-1/4">
        <img
          src={`https://flagcdn.com/w40/${currency.countryCode}.png`}
          className="w-8 h-8 rounded-full"
          alt={currency.code}
        />
        <div>
          <p className="font-medium">{currency.name}</p>
          <p className="text-xs text-gray-500">{currency.code}</p>
        </div>
      </div>

      {/* Amount */}
      <div className="w-1/6 font-semibold text-gray-800">
        {convertedValue}
      </div>

      {/* Change */}
      <div className="w-1/6">
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm font-medium">
          +{percentChange}%
        </span>
      </div>

      {/* Chart */}
      <div className="w-1/6">
        <Sparklines data={[5, 10, 6, 12, 8, 15, 10]}>
          <SparklinesLine color="#16a34a" />
        </Sparklines>
      </div>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-3">

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          Send
        </button>

        {editMode && (
          <button
            onClick={onRemove}
            className="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 transition"
          >
            <X size={18} />
          </button>
        )}

      </div>
    </div>
  );
}
