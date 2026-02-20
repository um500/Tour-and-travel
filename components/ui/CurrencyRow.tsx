"use client";

import { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { CurrencyType } from "@/lib/currencyList";
import { X } from "lucide-react";
import ExchangeModal from "@/components/ui/ExchangeModal";

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

  const convertedValue = (rate * amount).toFixed(4);

  const [percentChange, setPercentChange] = useState<string>("0.00");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const randomValue = (Math.random() * 0.8).toFixed(2);
    setPercentChange(randomValue);
  }, []);

  return (
    <>
      <div className="bg-white rounded-2xl px-4 sm:px-6 py-4 shadow-sm hover:shadow-md transition">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-3 min-w-[180px]">
            <img
              src={`https://flagcdn.com/w40/${currency.countryCode}.png`}
              className="w-8 h-8 rounded-full"
              alt={currency.code}
            />
            <div>
              <p className="font-medium text-gray-800">
                {currency.name}
              </p>
              <p className="text-xs text-gray-500">
                {currency.code}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-between sm:justify-end gap-6 flex-1">

            {/* Amount */}
            <div className="text-sm sm:text-base font-semibold text-gray-800 min-w-[90px] text-left sm:text-right">
              {convertedValue}
            </div>

            {/* Change */}
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap">
              +{percentChange}%
            </span>

            {/* Chart */}
            <div className="w-20 sm:w-28 h-6">
              <Sparklines data={[5, 10, 6, 12, 8, 15, 10]}>
                <SparklinesLine color="#16a34a" />
              </Sparklines>
            </div>

            {/* CONNECT BUTTON */}
            <button
              onClick={() => setOpenModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap"
            >
              Connect
            </button>

            {/* REMOVE BUTTON (Edit Mode) */}
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
      </div>

      {/* MODAL */}
      {openModal && (
        <ExchangeModal
          currency={currency}
          rate={rate}
          amount={amount}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}