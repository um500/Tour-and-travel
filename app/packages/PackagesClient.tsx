"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.image";

export default function PackagesClient({ data }: any) {
  if (!data) return null;

  const { tours = [], countries = [], states = [] } = data;

  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  const resetFilters = () => {
    setSearch("");
    setSelectedCountry("All");
    setSelectedState("All");
    setMaxPrice("");
  };

  const filteredStates = useMemo(() => {
    if (selectedCountry === "All") return states;
    return states.filter(
      (state: any) => state.country?.name === selectedCountry
    );
  }, [selectedCountry, states]);

  const filteredTours = useMemo(() => {
    return tours.filter((tour: any) => {
      return (
        (search === "" ||
          tour.title.toLowerCase().includes(search.toLowerCase())) &&
        (selectedCountry === "All" ||
          tour.country?.name === selectedCountry) &&
        (selectedState === "All" ||
          tour.state?.name === selectedState) &&
        (maxPrice === "" || tour.price <= Number(maxPrice))
      );
    });
  }, [search, selectedCountry, selectedState, maxPrice, tours]);

  return (
    <div>

      {/* FILTER CARD */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-16 border border-gray-100">

        <div className="grid md:grid-cols-5 gap-5">

          <input
            type="text"
            placeholder="Search tours..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
          />

          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedState("All");
            }}
            className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
          >
            <option value="All">All Countries</option>
            {countries.map((c: any) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
          >
            <option value="All">All States</option>
            {filteredStates.map((s: any) => (
              <option key={s._id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
          />

          <button
            onClick={resetFilters}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition"
          >
            Reset
          </button>

        </div>
      </div>

      {/* RESULT COUNT */}
      <p className="mb-8 text-gray-600 font-medium">
        Showing {filteredTours.length} tour(s)
      </p>

      {/* EMPTY */}
      {filteredTours.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold mb-4">
            No Tours Found
          </h3>
          <button
            onClick={resetFilters}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {filteredTours.map((tour: any) => (
          <Link
            key={tour._id}
            href={`/packages/${tour.slug.current}`}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition overflow-hidden"
          >
            <div className="relative h-60">
              <Image
                src={urlFor(tour.mainImage).url()}
                alt={tour.title}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />

              {tour.duration && (
                <div className="absolute top-4 right-4 bg-white px-4 py-1 text-sm font-semibold rounded-full shadow">
                  {tour.duration}
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition">
                {tour.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {tour.shortDescription}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-yellow-600 font-bold text-lg">
                  ₹{tour.price?.toLocaleString()}
                </span>

                <span className="text-blue-600 font-medium">
                  View Details →
                </span>
              </div>
            </div>

          </Link>
        ))}

      </div>

    </div>
  );
}
