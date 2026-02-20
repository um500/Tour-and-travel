"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeftRight, ChevronDown } from "lucide-react";
import { currencyList } from "@/lib/currencyList";
import CurrencySection from "@/components/sections/CurrencySection";

export default function CurrencyPage() {
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [rates, setRates] = useState<any>({});
  const [converted, setConverted] = useState<number | null>(null);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [loading, setLoading] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const selectedFrom = currencyList.find(c => c.code === from);
  const selectedTo = currencyList.find(c => c.code === to);

  const flagUrl = (code: string) =>
    `https://flagcdn.com/w40/${code}.png`;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (fromRef.current && !fromRef.current.contains(e.target as Node)) {
        setOpenFrom(false);
      }
      if (toRef.current && !toRef.current.contains(e.target as Node)) {
        setOpenTo(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch rates
  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${from}`
        );
        const data = await res.json();
        setRates(data.rates);
      } catch (error) {
        console.error("Rate fetch error:", error);
      }
    }

    fetchRates();
  }, [from]);

  const handleConvert = () => {
    if (!rates[to]) return;

    setLoading(true);
    setTimeout(() => {
      setConverted(amount * rates[to]);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1b5a] to-[#1e2f9f]">

      {/* ================= HERO SECTION ================= */}
      <section className="pt-28 md:pt-40 pb-16 md:pb-24 text-center px-4 sm:px-6 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
          Real-Time Currency Converter
        </h1>
        <p className="text-blue-200 text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mx-auto">
          Instantly convert global currencies with live exchange rates.
          Trusted and accurate conversion for travel & business.
        </p>
      </section>

      {/* ================= CONVERTER SECTION ================= */}
      <section className="px-4 sm:px-6 pb-16 md:pb-24 text-white">
        <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">

          {/* FROM / TO ROW */}
          <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8 items-center">

            {/* FROM */}
            <div className="w-full relative" ref={fromRef}>
              <label className="text-blue-200 text-sm">From</label>

              <div
                onClick={() => setOpenFrom(!openFrom)}
                className="mt-2 bg-white/20 rounded-xl p-3 sm:p-4 flex justify-between items-center cursor-pointer"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src={flagUrl(selectedFrom!.countryCode)}
                    className="w-5 h-4 sm:w-6 sm:h-4 rounded-sm"
                  />
                  <span className="text-sm sm:text-base">
                    {selectedFrom?.code}
                  </span>
                </div>
                <ChevronDown size={16} />
              </div>

              {openFrom && (
                <div className="absolute z-50 mt-2 w-full bg-white text-black rounded-xl shadow-xl max-h-60 overflow-y-auto">
                  {currencyList.map(currency => (
                    <div
                      key={currency.code}
                      onClick={() => {
                        setFrom(currency.code);
                        setOpenFrom(false);
                        setConverted(null);
                      }}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-sm"
                    >
                      <img
                        src={flagUrl(currency.countryCode)}
                        className="w-5 h-4 rounded-sm"
                      />
                      <span>{currency.code}</span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        {currency.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SWAP */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setFrom(to);
                  setTo(from);
                  setConverted(null);
                }}
                className="bg-white/20 hover:bg-white/30 p-3 sm:p-4 rounded-full transition"
              >
                <ArrowLeftRight size={18} />
              </button>
            </div>

            {/* TO */}
            <div className="w-full relative" ref={toRef}>
              <label className="text-blue-200 text-sm">To</label>

              <div
                onClick={() => setOpenTo(!openTo)}
                className="mt-2 bg-white/20 rounded-xl p-3 sm:p-4 flex justify-between items-center cursor-pointer"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src={flagUrl(selectedTo!.countryCode)}
                    className="w-5 h-4 sm:w-6 sm:h-4 rounded-sm"
                  />
                  <span className="text-sm sm:text-base">
                    {selectedTo?.code}
                  </span>
                </div>
                <ChevronDown size={16} />
              </div>

              {openTo && (
                <div className="absolute z-50 mt-2 w-full bg-white text-black rounded-xl shadow-xl max-h-60 overflow-y-auto">
                  {currencyList.map(currency => (
                    <div
                      key={currency.code}
                      onClick={() => {
                        setTo(currency.code);
                        setOpenTo(false);
                        setConverted(null);
                      }}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-sm"
                    >
                      <img
                        src={flagUrl(currency.countryCode)}
                        className="w-5 h-4 rounded-sm"
                      />
                      <span>{currency.code}</span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        {currency.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* AMOUNT */}
          <div className="mt-6 md:mt-8">
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
                setConverted(null);
              }}
              className="w-full bg-white/20 p-3 sm:p-4 rounded-xl text-sm sm:text-lg focus:outline-none"
            />
          </div>

          {/* BUTTON */}
          <div className="mt-6 md:mt-8">
            <button
              onClick={handleConvert}
              disabled={loading}
              className="w-full md:w-auto md:px-12 bg-gradient-to-r from-blue-500 to-indigo-600 py-3 sm:py-4 rounded-xl md:rounded-2xl font-semibold shadow-lg hover:scale-105 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Converting..." : "Convert"}
            </button>
          </div>

          {/* RESULT */}
          {converted !== null && (
            <div className="mt-8 border-t border-white/20 pt-6 text-sm sm:text-base">
              <div className="font-bold text-lg sm:text-2xl">
                {amount} {from} = {converted.toFixed(4)} {to}
              </div>
              <p className="text-blue-200 mt-2 text-xs sm:text-sm">
                Mid-market rate • {new Date().toLocaleTimeString()}
              </p>
            </div>
          )}

        </div>
      </section>

      {/* EXTRA SECTION */}
      <CurrencySection />

      {/* INFO SECTION */}
     
<section className="bg-white py-16 md:py-20 px-4 sm:px-6">
  <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">

    {/* CARD 1 */}
    <div className="bg-gray-50 rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2">
      <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl">
        💱
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">
        Live Rates
      </h3>
      <p className="text-gray-600 text-sm md:text-base">
        Updated exchange rates in real time using trusted APIs.
      </p>
    </div>

    {/* CARD 2 */}
    <div className="bg-gray-50 rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2">
      <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-2xl">
        🌍
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">
        Global Coverage
      </h3>
      <p className="text-gray-600 text-sm md:text-base">
        Convert 100+ international currencies worldwide.
      </p>
    </div>

    {/* CARD 3 */}
    <div className="bg-gray-50 rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2">
      <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
        🔒
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">
        Secure & Reliable
      </h3>
      <p className="text-gray-600 text-sm md:text-base">
        Accurate and secure currency conversion experience.
      </p>
    </div>

  </div>
</section>

    </div>
  );
}