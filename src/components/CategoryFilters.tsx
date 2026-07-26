"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";


export default function CategoryFilters({ 
  initialProducts, 
  category 
}: { 
  initialProducts: any[], 
  category?: any 
}) {
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedDeliveries, setSelectedDeliveries] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("Recommended");

  const priceFilters = ["Under ₹500", "₹500 – ₹999", "₹1,000 – ₹1,999", "Above ₹2,000"];
  const occasions = ["Birthday", "Anniversary", "Wedding", "Thank You", "Congratulations"];

  const toggleFilter = (state: string[], setState: any, value: string) => {
    setState(state.includes(value) ? state.filter(v => v !== value) : [...state, value]);
  };

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by price
    if (selectedPrices.length > 0) {
      result = result.filter(p => {
        const price = p.price;
        if (selectedPrices.includes("Under ₹500") && price < 500) return true;
        if (selectedPrices.includes("₹500 – ₹999") && price >= 500 && price <= 999) return true;
        if (selectedPrices.includes("₹1,000 – ₹1,999") && price >= 1000 && price <= 1999) return true;
        if (selectedPrices.includes("Above ₹2,000") && price >= 2000) return true;
        return false;
      });
    }

    // Sort
    if (sortOption === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Best Rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [initialProducts, selectedPrices, selectedOccasions, selectedDeliveries, sortOption]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Subcategory chips */}
      {category && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <button className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold text-white transition-colors" style={{ background: "var(--color-primary)" }}>
            All {category.name}
          </button>
          {category.subcategories.map((sub: string) => (
            <button key={sub} className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 bg-white hover:border-[#e91e63] hover:text-[#e91e63] transition-colors whitespace-nowrap">
              {sub}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* ── SIDEBAR ──────────────────────────────────────── */}
        <aside className="lg:w-60 xl:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-[160px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <i className="fa-solid fa-sliders text-[#e91e63]"></i> Filters
              </h3>
              <button 
                onClick={() => {
                  setSelectedPrices([]);
                  setSelectedOccasions([]);
                  setSelectedDeliveries([]);
                  setSortOption("Recommended");
                }}
                className="text-xs text-[#e91e63] font-semibold hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Price */}
            <div className="px-5 py-4 border-b border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Price Range</h4>
              <div className="space-y-2.5">
                {priceFilters.map((f) => (
                  <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedPrices.includes(f)}
                      onChange={() => toggleFilter(selectedPrices, setSelectedPrices, f)}
                      className="w-4 h-4 rounded border-gray-300 accent-[#e91e63]" 
                    />
                    <span className="text-sm text-gray-600 group-hover:text-[#e91e63] transition-colors">{f}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div className="px-5 py-4 border-b border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Occasion</h4>
              <div className="space-y-2.5">
                {occasions.map((o) => (
                  <label key={o} className="flex items-center gap-2.5 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedOccasions.includes(o)}
                      onChange={() => toggleFilter(selectedOccasions, setSelectedOccasions, o)}
                      className="w-4 h-4 rounded border-gray-300 accent-[#e91e63]" 
                    />
                    <span className="text-sm text-gray-600 group-hover:text-[#e91e63] transition-colors">{o}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Delivery */}
            <div className="px-5 py-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Delivery Speed</h4>
              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#e91e63]" />
                  <span className="text-sm text-gray-600 group-hover:text-[#e91e63] transition-colors flex items-center gap-1.5">
                    <i className="fa-solid fa-bolt text-amber-500"></i> Express (60 min)
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#e91e63]" />
                  <span className="text-sm text-gray-600 group-hover:text-[#e91e63] transition-colors flex items-center gap-1.5">
                    <i className="fa-solid fa-truck text-[#e91e63]"></i> Same Day
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#e91e63]" />
                  <span className="text-sm text-gray-600 group-hover:text-[#e91e63] transition-colors flex items-center gap-1.5">
                    <i className="fa-solid fa-moon text-indigo-500"></i> Midnight
                  </span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* ── PRODUCT GRID ─────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-5 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-600">
              Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> results
            </p>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-500 hidden sm:block">Sort by:</label>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white outline-none focus:border-[#e91e63] text-gray-700 cursor-pointer"
              >
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>New Arrivals</option>
                <option>Best Rating</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {filteredProducts.length > 12 && (
                <div className="flex justify-center mt-10 gap-2">
                  {Array.from({ length: Math.ceil(filteredProducts.length / 12) }).map((_, i) => (
                    <button
                      key={i}
                      className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                        i === 0
                          ? "text-white shadow-sm"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-[#e91e63] hover:text-[#e91e63]"
                      }`}
                      style={i === 0 ? { background: "var(--color-primary)" } : {}}
                    >
                      {i + 1}
                    </button>
                  ))}
                  {filteredProducts.length > 12 && (
                    <button className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm hover:border-[#e91e63] hover:text-[#e91e63] transition-colors flex items-center justify-center">
                      <i className="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl p-16 text-center border border-gray-100">
              <i className="fa-regular fa-box-open text-5xl text-gray-300 mb-4 block"></i>
              <h3 className="text-lg font-bold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or browse another category.</p>
              <Link href="/" className="inline-flex items-center gap-2 text-white px-6 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "var(--color-primary)" }}>
                Back to Homepage
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
