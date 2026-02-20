"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { currencyList, CurrencyType } from "@/lib/currencyList";
import { getRates } from "@/lib/currencyApi";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface Props {
  currency: CurrencyType;
  rate: number;
  amount: number;
  onClose: () => void;
}

export default function ExchangeModal({
  currency,
  rate,
  amount,
  onClose,
}: Props) {

  // ✅ FROM = base currency (selected row currency)
  const [from, setFrom] = useState<string>(currency.code);

  // ✅ TO default USD (or any)
  const [to, setTo] = useState<string>("USD");

  const [liveRate, setLiveRate] = useState<number>(rate || 0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    amount: "",
    address: "",
  });

  // 🔐 CAPTCHA
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [error, setError] = useState("");

  // Generate captcha
  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setNum1(a);
    setNum2(b);
  };

  // On mount → generate captcha
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Fetch live rate when from/to changes
  useEffect(() => {
    async function fetchRate() {
      if (!from || !to) return;

      const data = await getRates(from);

      if (data?.rates?.[to]) {
        setLiveRate(data.rates[to]);
      }
    }

    fetchRate();
  }, [from, to]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (Number(captchaAnswer) !== num1 + num2) {
      setError("Incorrect answer. Please try again.");
      generateCaptcha();
      setCaptchaAnswer("");
      return;
    }

    alert("Thanks! I'll get back to you soon ✅");

    setError("");
    onClose();
  };

  const options = currencyList.map((currency) => ({
    value: currency.code,
    label: currency.name,
  }));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-xl shadow-xl relative max-h-[90vh] overflow-y-auto">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold mb-6">
          Currency Exchange Request
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          {/* Mobile */}
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            required
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          {/* FROM / TO */}
          <div className="grid grid-cols-2 gap-4">

            <Select
              options={options}
              value={options.find(o => o.value === from)}
              onChange={(selected: any) => setFrom(selected?.value)}
              isSearchable
            />

            <Select
              options={options}
              value={options.find(o => o.value === to)}
              onChange={(selected: any) => setTo(selected?.value)}
              isSearchable
            />

          </div>

          {/* Live Rate */}
          <div className="bg-gray-100 p-3 rounded-lg text-sm">
            {liveRate
              ? `Live Rate: 1 ${from} = ${liveRate.toFixed(4)} ${to}`
              : "Fetching live rate..."}
          </div>

          {/* Amount */}
          <input
            type="number"
            name="amount"
            placeholder="Amount to Convert"
            required
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          {/* Address */}
          <textarea
            name="address"
            placeholder="Address"
            required
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          {/* CAPTCHA */}
          <div className="space-y-2">
            <div className="font-medium">
              Verify you are human: {num1} + {num2} = ?
            </div>

            <input
              type="number"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              placeholder="Enter answer"
              required
              className="w-full border rounded-lg p-3"
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Submit Request
          </button>

        </form>

      </div>
    </div>
  );
}