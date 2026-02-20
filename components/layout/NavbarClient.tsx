"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function NavbarClient({
  indiaStates,
  internationalCountries,
}: {
  indiaStates: any[];
  internationalCountries: any[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* ================= TOP BAR ================= */}
      <div className="bg-yellow-500 text-black text-xs sm:text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between">
          <span>📧 info@equatorialtours.com</span>
          <span>📞 +91 98765 43210</span>
        </div>
      </div>

      {/* ================= MAIN NAV ================= */}
      <nav className="bg-[#0e2240] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* LEFT - LOGO */}
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-serif font-semibold whitespace-nowrap"
          >
            <span>Equatorial </span>
            <span className="text-yellow-400">Tours</span>
          </Link>

          {/* RIGHT - MENU + PHONE */}
          <div className="hidden lg:flex items-center gap-12">

            {/* MENU LINKS */}
            <div className="flex items-center gap-8 text-sm">

              <Link href="/" className="hover:text-yellow-400">
                HOME
              </Link>

              <Link href="/about" className="hover:text-yellow-400">
                ABOUT
              </Link>

              <Link href="/currency" className="hover:text-yellow-400">
                CURRENCY
              </Link>

              {/* INTERNATIONAL */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDesktopMenu("international")}
                onMouseLeave={() => setOpenDesktopMenu(null)}
              >
                <button className="flex items-center gap-1 hover:text-yellow-400">
                  INTERNATIONAL <ChevronDown size={16} />
                </button>

                {openDesktopMenu === "international" && (
                  <div className="absolute left-0 top-full bg-[#0e2240] p-6 w-72 shadow-xl rounded-lg">
                    {internationalCountries?.map((country) => (
                      <Link
                        key={country.slug}
                        href={`/destinations/${country.slug}`}
                        className="block hover:text-yellow-400 py-1"
                      >
                        {country.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* INDIA */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDesktopMenu("india")}
                onMouseLeave={() => setOpenDesktopMenu(null)}
              >
                <button className="flex items-center gap-1 hover:text-yellow-400">
                  INDIA <ChevronDown size={16} />
                </button>

                {openDesktopMenu === "india" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full bg-[#0e2240] p-8 max-w-6xl w-[95vw] lg:w-[900px] shadow-2xl rounded-lg">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      {indiaStates?.map((state) => (
                        <Link
                          key={state.slug}
                          href={`/destinations/${state.slug}`}
                          className="hover:text-yellow-400"
                        >
                          {state.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/packages" className="hover:text-yellow-400">
                TOURS
              </Link>

              <Link href="/contact" className="hover:text-yellow-400">
                CONTACT
              </Link>

            </div>

            {/* PHONE BUTTON */}
            <button className="bg-yellow-500 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-600 transition">
              +91 98765 43210
            </button>

          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0e2240] px-6 py-8 space-y-6">

            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block text-base"
            >
              HOME
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block text-base"
            >
              ABOUT
            </Link>

            <Link
              href="/currency"
              onClick={() => setMobileOpen(false)}
              className="block text-base"
            >
              CURRENCY
            </Link>

            {/* INTERNATIONAL */}
            <div>
              <button
                onClick={() =>
                  setOpenMobileMenu(
                    openMobileMenu === "international" ? null : "international"
                  )
                }
                className="w-full flex justify-between items-center text-base"
              >
                <span>INTERNATIONAL</span>
                <span>
                  {openMobileMenu === "international" ? "−" : "+"}
                </span>
              </button>

              {openMobileMenu === "international" && (
                <div className="mt-3 space-y-2 text-sm pl-4">
                  {internationalCountries?.map((country) => (
                    <Link
                      key={country.slug}
                      href={`/destinations/${country.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block opacity-80"
                    >
                      {country.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* INDIA */}
            <div>
              <button
                onClick={() =>
                  setOpenMobileMenu(
                    openMobileMenu === "india" ? null : "india"
                  )
                }
                className="w-full flex justify-between items-center text-base"
              >
                <span>INDIA</span>
                <span>
                  {openMobileMenu === "india" ? "−" : "+"}
                </span>
              </button>

              {openMobileMenu === "india" && (
                <div className="mt-3 space-y-2 text-sm pl-4 max-h-60 overflow-y-auto">
                  {indiaStates?.map((state) => (
                    <Link
                      key={state.slug}
                      href={`/destinations/${state.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block opacity-80"
                    >
                      {state.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/packages"
              onClick={() => setMobileOpen(false)}
              className="block text-base"
            >
              TOURS
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-base"
            >
              CONTACT
            </Link>

            <a
              href="tel:+919876543210"
              className="block bg-yellow-500 text-black py-3 rounded-md font-semibold text-center mt-4"
            >
              +91 98765 43210
            </a>

          </div>
        )}
      </nav>
    </header>
  );
}