import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import categoriesData from "@/../data/categories.json";
import productsData from "@/../data/products.json";

export const metadata: Metadata = {
  title: "GiftSite — India's #1 Online Gift Store | Same-Day Delivery",
  description:
    "Send gifts online with same-day delivery across 19,000+ PIN codes in India. Order flowers, cakes, personalised gifts & more.",
};

const occasions = [
  { name: "Birthday", icon: "fa-solid fa-cake-candles",   href: "/category/cakes", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
  { name: "Anniversary", icon: "fa-solid fa-heart",        href: "/category/flowers", image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=500&q=80" },
  { name: "Wedding",   icon: "fa-solid fa-ring",           href: "/category/personalised", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=80" },
  { name: "Congrats",  icon: "fa-solid fa-star",           href: "/category/combos", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&q=80" },
  { name: "Valentine's", icon: "fa-solid fa-hand-holding-heart", href: "/category/flowers", image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=500&q=80" },
  { name: "Rakhi",     icon: "fa-solid fa-gem",            href: "/category/personalised", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80" },
];

import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  const allProducts = productsData;

  return (
    <div className="space-y-12 pb-20">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <HeroSlider />

      {/* ── CATEGORY GRID ────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900" style={{ fontFamily: "var(--font-poppins)" }}>
            Shop by Category
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Everything you need to make someone smile</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {categoriesData.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl text-[#e91e63] mb-3 transition-transform group-hover:scale-110"
                style={{ background: "var(--color-primary-light)" }}
              >
                <i className={cat.icon}></i>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-[#e91e63] transition-colors leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── OCCASIONS ────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900" style={{ fontFamily: "var(--font-poppins)" }}>
              Shop by Occasion
            </h2>
            <p className="text-gray-500 mt-1 text-sm">Pick the perfect gift for every moment</p>
          </div>
          <Link href="#" className="text-[#e91e63] text-sm font-semibold hover:underline hidden sm:block">
            View All <i className="fa-solid fa-chevron-right text-xs ml-0.5"></i>
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {occasions.map((occ) => (
            <Link
              key={occ.name}
              href={occ.href}
              className="group relative rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center text-white hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-2xl cursor-pointer"
              style={{ aspectRatio: "1/1" }}
            >
              {/* Background Image */}
              <img src={occ.image} alt={occ.name} className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-110 transition-transform duration-700" />
              {/* Dark Overlay for readability */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10 rounded-2xl"></div>
              
              <div className="relative z-20 flex flex-col items-center gap-2 p-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-[#e91e63] transition-colors duration-300">
                  <i className={`${occ.icon} text-lg sm:text-xl text-white drop-shadow`}></i>
                </div>
                <span className="text-[12px] sm:text-sm font-bold leading-tight text-white drop-shadow-md">{occ.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── TRENDING / BEST SELLERS ──────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2" style={{ fontFamily: "var(--font-poppins)" }}>
              <i className="fa-solid fa-fire text-orange-500"></i> Trending Now
            </h2>
            <p className="text-gray-500 mt-1 text-sm">Our most-loved gifts across India</p>
          </div>
          <Link href="/category/flowers" className="text-[#e91e63] text-sm font-semibold hover:underline hidden sm:block">
            View All <i className="fa-solid fa-chevron-right text-xs ml-0.5"></i>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── USP BAND ─────────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: "fa-solid fa-truck-fast", title: "Same-Day Delivery", sub: "Order before 8 PM", color: "bg-pink-50 text-[#e91e63]" },
              { icon: "fa-solid fa-moon", title: "Midnight Surprise", sub: "Delivered at 11:59 PM", color: "bg-indigo-50 text-indigo-600" },
              { icon: "fa-solid fa-location-dot", title: "19,000+ PIN Codes", sub: "Pan-India coverage", color: "bg-green-50 text-green-600" },
              { icon: "fa-solid fa-face-smile-beam", title: "8M+ Happy Customers", sub: "Trusted for 30+ years", color: "bg-amber-50 text-amber-600" },
            ].map((u) => (
              <div key={u.title} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${u.color}`}>
                  <i className={u.icon}></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug">{u.title}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{u.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER STRIP ─────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/category/cakes"
            className="group relative rounded-3xl overflow-hidden h-56 sm:h-64 flex items-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&q=80" 
              alt="Custom Photo Cakes" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            <div className="relative px-8 sm:px-12 z-10 max-w-md transform group-hover:translate-x-2 transition-transform duration-500">
              <p className="text-[#e91e63] font-extrabold text-xs mb-2 tracking-widest uppercase flex items-center gap-2">
                <i className="fa-solid fa-cake-candles"></i> Order online
              </p>
              <h3 className="text-white text-3xl font-extrabold mb-4 leading-tight" style={{ fontFamily: "var(--font-poppins)" }}>Custom Photo <br/> Cakes</h3>
              <span className="inline-flex items-center gap-2 bg-[#e91e63] text-white font-bold px-6 py-3 rounded-xl text-sm shadow-lg shadow-pink-500/30 group-hover:bg-pink-600 transition-colors">
                Order Now <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </span>
            </div>
          </Link>

          <Link
            href="/category/plants"
            className="group relative rounded-3xl overflow-hidden h-56 sm:h-64 flex items-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80" 
              alt="Indoor Plants" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#004d40]/90 via-[#004d40]/60 to-transparent"></div>
            <div className="relative px-8 sm:px-12 z-10 max-w-md transform group-hover:translate-x-2 transition-transform duration-500">
              <p className="text-emerald-400 font-extrabold text-xs mb-2 tracking-widest uppercase flex items-center gap-2">
                <i className="fa-solid fa-leaf"></i> Bring nature home
              </p>
              <h3 className="text-white text-3xl font-extrabold mb-4 leading-tight" style={{ fontFamily: "var(--font-poppins)" }}>Indoor Plants <br/> &amp; More</h3>
              <span className="inline-flex items-center gap-2 bg-white text-[#00695c] font-bold px-6 py-3 rounded-xl text-sm shadow-lg group-hover:bg-gray-50 transition-colors">
                Shop Plants <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </span>
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}
