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
    <header className="fixed w-full z-50">

      {/* TOP BAR */}
      <div className="bg-yellow-500 text-black text-sm py-2 px-6 flex justify-between">
        <span>📧 info@equatorialtours.com</span>
        <span>📞 +91 98765 43210</span>
      </div>

      {/* MAIN NAV */}
      <nav className="bg-[#0e2240] text-white relative">
        <div className="max-w-7xl mx-auto px-6 flex items-center h-20">

          {/* Logo */}
          <Link href="/" className="text-3xl font-serif font-semibold">
            <span>Equatorial </span>
            <span className="text-yellow-400">Tours</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex gap-8 items-center ml-auto mr-10">

            <Link href="/" className="hover:text-yellow-400">
              HOME
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
                    <div key={country.slug}>

                      {/* FIXED ROUTE */}
                      <Link
                        href={`/destinations/${country.slug}`}
                        className="block hover:text-yellow-400 py-1"
                      >
                        {country.name}
                      </Link>

                    </div>
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
                <>
                  <div className="absolute top-full left-0 w-full h-4" />

                  <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+4px)] bg-[#0e2240] p-8 w-[1000px] shadow-2xl rounded-lg">
                    <div className="grid grid-cols-4 gap-4 text-sm">

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
                </>
              )}
            </div>

            <Link href="/packages" className="hover:text-yellow-400">
              TOURS
            </Link>

            <Link href="/about" className="hover:text-yellow-400">
              ABOUT
            </Link>

            <Link href="/contact" className="hover:text-yellow-400">
              CONTACT
            </Link>
          </div>

          {/* DESKTOP PHONE */}
          <button className="hidden lg:block bg-yellow-500 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-600 transition">
            +91 98765 43210
          </button>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0e2240] px-6 py-6 space-y-4">

            <Link href="/" onClick={() => setMobileOpen(false)}>
              HOME
            </Link>

            {/* MOBILE INTERNATIONAL */}
            <div>
              <button
                onClick={() =>
                  setOpenMobileMenu(
                    openMobileMenu === "international"
                      ? null
                      : "international"
                  )
                }
                className="flex items-center justify-between w-full"
              >
                INTERNATIONAL <ChevronDown size={16} />
              </button>

              {openMobileMenu === "international" && (
                <div className="pl-4 mt-2 space-y-2">
                  {internationalCountries?.map((country) => (
                    <Link
                      key={country.slug}
                      href={`/destinations/${country.slug}`}  
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm text-gray-300"
                    >
                      {country.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* MOBILE INDIA */}
            <div>
              <button
                onClick={() =>
                  setOpenMobileMenu(
                    openMobileMenu === "india" ? null : "india"
                  )
                }
                className="flex items-center justify-between w-full"
              >
                INDIA <ChevronDown size={16} />
              </button>

              {openMobileMenu === "india" && (
                <div className="pl-4 mt-2 space-y-2">
                  {indiaStates?.map((state) => (
                    <Link
                      key={state.slug}
                      href={`/destinations/${state.slug}`}   
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm text-gray-300"
                    >
                      {state.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/packages" onClick={() => setMobileOpen(false)}>
              TOURS
            </Link>

            <Link href="/about" onClick={() => setMobileOpen(false)}>
              ABOUT
            </Link>

            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              CONTACT
            </Link>

            <button className="mt-4 bg-yellow-500 text-black px-6 py-3 font-semibold rounded w-full">
              +91 98765 43210
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
