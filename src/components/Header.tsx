"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AuthModals from "./AuthModals";
import SlideInCart from "./SlideInCart";
import categoriesData from "@/../data/categories.json";
import productsData from "@/../data/products.json";
import { useCart } from "@/context/CartContext";

const getIconForSub = (name: string) => {
  const map: Record<string, string> = {
    "Roses": "fa-brands fa-pagelines",
    "Lilies": "fa-solid fa-seedling",
    "Carnations": "fa-solid fa-spa",
    "Orchids": "fa-solid fa-fan",
    "Gerberas": "fa-solid fa-sun",
    "Mixed Bouquets": "fa-solid fa-bouquet",
    "Chocolate Cakes": "fa-solid fa-cookie-bite",
    "Black Forest": "fa-solid fa-cake-candles",
    "Red Velvet": "fa-solid fa-heart",
    "Photo Cakes": "fa-regular fa-image",
    "Designer Cakes": "fa-solid fa-wand-magic-sparkles",
    "Mugs": "fa-solid fa-mug-hot",
    "Cushions": "fa-solid fa-couch",
    "Photo Frames": "fa-solid fa-image-portrait",
    "LED Lamps": "fa-regular fa-lightbulb",
    "Indoor Plants": "fa-solid fa-house-chimney",
    "Bonsai": "fa-solid fa-tree",
    "Air Purifying": "fa-solid fa-wind",
    "Lucky Bamboo": "fa-solid fa-leaf",
    "Flowers & Cakes": "fa-solid fa-gift",
    "Flowers & Chocolates": "fa-solid fa-box-open",
    "Plants & Cakes": "fa-solid fa-seedling",
    "Flower + Cake": "fa-solid fa-gift",
    "Cake + Teddy": "fa-solid fa-cake-candles",
    "Chocolate + Flowers": "fa-solid fa-box-open"
  };
  return map[name] || "fa-solid fa-circle-dot";
};

export default function Header() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const { cartItems } = useCart();
  
  useEffect(() => {
    const savedCity = localStorage.getItem("giftsite_city");
    if (savedCity) setSelectedCity(savedCity);
    
    const savedUser = localStorage.getItem("giftsite_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {}
    }
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem("giftsite_city", city);
    setLocationOpen(false);
  };

  const cities = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai", "Kolkata", "Gurgaon", "Noida"];
  
  const searchResults = searchValue.length > 1 
    ? productsData.filter(p => p.title.toLowerCase().includes(searchValue.toLowerCase())).slice(0, 5) 
    : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openAuth = (type: "login" | "signup") => {
    setAuthType(type);
    setAuthModalOpen(true);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-lg" : "shadow-sm"
        } bg-white`}
      >
        {/* ── TOP USP BAR ───────────────────────────────────── */}
        <div
          className="text-white text-xs py-2 hidden md:flex items-center justify-center gap-8 bg-gradient-to-r from-[#e91e63] to-pink-500 shadow-inner"
        >
          <span className="flex items-center gap-2 font-medium">
            <i className="fa-solid fa-truck-fast text-pink-200"></i>
            Same-day Delivery
          </span>
          <span className="opacity-40 text-pink-200">|</span>
          <span className="flex items-center gap-2 font-medium">
            <i className="fa-solid fa-location-dot text-pink-200"></i>
            19,000+ PIN Codes
          </span>
          <span className="opacity-40 text-pink-200">|</span>
          <span className="flex items-center gap-2 font-medium">
            <i className="fa-solid fa-bolt text-yellow-300"></i>
            60-min Express
          </span>
          <span className="opacity-40 text-pink-200">|</span>
          <span className="flex items-center gap-2 font-medium">
            <i className="fa-solid fa-star text-yellow-300"></i>
            4.8★ Rating
          </span>
        </div>

        {/* ── MAIN HEADER ───────────────────────────────────── */}
        <div className="border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
            {/* Hamburger */}
            <button
              className="lg:hidden text-gray-600 hover:text-[#e91e63] transition-colors p-1.5 rounded-lg hover:bg-pink-50"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"} text-xl`}></i>
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-lg shadow-md"
                style={{ background: "var(--color-primary)" }}
              >
                <i className="fa-solid fa-gift"></i>
              </div>
              <span className="text-xl font-bold hidden sm:block text-gray-900 tracking-tight">
                Gift<span style={{ color: "var(--color-primary)" }}>Site</span>
              </span>
            </Link>

            {/* Search */}
            <div className="flex-grow mx-2 lg:mx-6 max-w-2xl relative group">
              <i
                className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-base group-focus-within:text-[#e91e63] transition-colors"
              ></i>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search for gifts, flowers, cakes..."
                className="w-full bg-gray-100 border-2 border-transparent rounded-full py-3 pl-12 pr-4 text-sm font-medium outline-none focus:bg-white focus:border-[#e91e63] focus:ring-4 focus:ring-pink-50 transition-all placeholder-gray-500"
              />
              {searchValue && (
                <button
                  onClick={() => setSearchValue("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
              
              {/* Live Search Results Dropdown */}
              {searchValue.length > 1 && (
                <div className="absolute top-[110%] left-0 right-0 bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 z-[250] overflow-hidden animate-slide-in-up">
                  {searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((product) => (
                        <li key={product.id}>
                          <Link 
                            href={`/product/${product.slug}`}
                            onClick={() => setSearchValue("")}
                            className="flex items-center gap-4 px-5 py-3 hover:bg-pink-50 transition-colors"
                          >
                            <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded-md" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900 truncate">{product.title}</h4>
                              <p className="text-xs text-[#e91e63] font-bold">₹{product.price}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-5 py-6 text-center text-gray-500 text-sm">
                      No products found for &quot;{searchValue}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-4">
              {/* Location (desktop) */}
              <div className="relative hidden lg:block">
                <button 
                  onClick={() => setLocationOpen(!locationOpen)}
                  className="flex items-center gap-2.5 text-sm text-gray-700 hover:text-[#e91e63] transition-all px-3 py-2 rounded-full hover:bg-pink-50 font-bold group border border-transparent hover:border-pink-100"
                >
                  <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-[#e91e63] group-hover:scale-110 transition-transform shadow-sm">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <span className="hidden xl:block">{selectedCity}</span>
                </button>

                {locationOpen && (
                  <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-[200] animate-slide-in-up">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-base text-gray-900">Select City</h4>
                      <button onClick={() => setLocationOpen(false)} className="text-gray-400 hover:text-[#e91e63] bg-gray-50 hover:bg-pink-50 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="relative mb-4">
                      <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                      <input type="text" placeholder="Search city..." className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-50 transition-all" />
                    </div>
                    <div className="max-h-56 overflow-y-auto scrollbar-hide pr-2">
                      <div className="grid grid-cols-2 gap-2">
                        {cities.map(city => (
                          <button 
                            key={city}
                            onClick={() => handleCitySelect(city)}
                            className={`text-left text-sm font-semibold px-4 py-2.5 rounded-xl transition-all ${selectedCity === city ? 'bg-[#e91e63] text-white shadow-md' : 'text-gray-600 hover:bg-pink-50 hover:text-[#e91e63] border border-transparent'}`}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Account */}
              {user ? (
                <div className="relative group/account">
                  <button className="flex items-center gap-2.5 text-sm text-gray-700 hover:text-[#e91e63] transition-all px-3 py-2 rounded-full hover:bg-pink-50 font-bold border border-transparent hover:border-pink-100">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#e91e63] to-pink-400 flex items-center justify-center text-white shadow-sm font-bold text-lg uppercase shadow-pink-200">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden xl:block">{user.name.split(' ')[0]}</span>
                  </button>
                  <div className="absolute top-full right-0 w-56 z-[200] opacity-0 pointer-events-none group-hover/account:opacity-100 group-hover/account:pointer-events-auto transition-all">
                    {/* Bridge to prevent hover loss */}
                    <div className="h-3 w-full"></div>
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 animate-slide-in-up">
                      <div className="mb-2 pb-2 border-b border-gray-100 px-2">
                        <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 font-medium truncate">{user.email}</p>
                      </div>
                      <Link href="/profile/orders" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#e91e63] hover:bg-pink-50 rounded-xl transition-colors group">
                        <i className="fa-solid fa-box text-[#e91e63]/60 group-hover:text-[#e91e63] transition-colors w-4 text-center"></i> My Orders
                      </Link>
                      <Link href="/profile/saved" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#e91e63] hover:bg-pink-50 rounded-xl transition-colors group">
                        <i className="fa-regular fa-heart text-[#e91e63]/60 group-hover:text-[#e91e63] transition-colors w-4 text-center"></i> Saved Items
                      </Link>
                      <Link href="/profile/addresses" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#e91e63] hover:bg-pink-50 rounded-xl transition-colors group">
                        <i className="fa-regular fa-address-book text-[#e91e63]/60 group-hover:text-[#e91e63] transition-colors w-4 text-center"></i> My Addresses
                      </Link>
                      <Link href="/profile/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#e91e63] hover:bg-pink-50 rounded-xl transition-colors group">
                        <i className="fa-solid fa-gear text-[#e91e63]/60 group-hover:text-[#e91e63] transition-colors w-4 text-center"></i> Settings
                      </Link>
                      <div className="my-1 border-t border-gray-100"></div>
                      <button onClick={() => { localStorage.removeItem("giftsite_user"); window.location.reload(); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#e91e63] hover:bg-pink-50 rounded-xl transition-colors group">
                        <i className="fa-solid fa-arrow-right-from-bracket text-[#e91e63]/60 group-hover:text-[#e91e63] transition-colors w-4 text-center"></i> Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => openAuth("login")}
                  className="flex items-center gap-2.5 text-sm text-gray-700 hover:text-[#e91e63] transition-all px-3 py-2 rounded-full hover:bg-pink-50 font-bold group border border-transparent hover:border-pink-100"
                >
                  <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-[#e91e63] group-hover:scale-110 transition-transform shadow-sm">
                    <i className="fa-regular fa-user text-lg"></i>
                  </div>
                  <span className="hidden xl:block">Account</span>
                </button>
              )}

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="flex items-center gap-2.5 text-sm text-gray-700 hover:text-[#e91e63] transition-all px-3 py-2 rounded-full hover:bg-pink-50 font-bold group border border-transparent hover:border-pink-100 relative"
              >
                <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-[#e91e63] group-hover:scale-110 transition-transform shadow-sm relative">
                  <i className="fa-solid fa-bag-shopping text-lg"></i>
                  {cartItems.length > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pop border-2 border-white"
                      style={{ background: "var(--color-primary)" }}
                    >
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <span className="hidden xl:block">Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── MEGA MENU NAV (desktop) ───────────────────────── */}
        <nav className="hidden lg:block bg-white border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-8">
            <ul className="flex items-center gap-2 lg:gap-6">
              {categoriesData.map((cat) => (
                <li key={cat.id} className="relative group/mega">
                  <Link
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-2.5 px-4 py-4 text-[15px] font-bold text-gray-700 hover:text-[#e91e63] transition-colors relative cursor-pointer group-hover/mega:text-[#e91e63]"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    <i className={`${cat.icon} text-[#e91e63] text-lg`}></i>
                    {cat.name}
                    {/* Active underline */}
                    <span
                      className="absolute bottom-0 left-4 right-4 h-1 scale-x-0 group-hover/mega:scale-x-100 transition-transform origin-center rounded-t-full"
                      style={{ background: "var(--color-primary)" }}
                    ></span>
                  </Link>

                  {/* Mega dropdown — pure CSS hover via group */}
                  <div className="absolute top-full left-0 z-[200] pointer-events-none opacity-0 translate-y-2 group-hover/mega:opacity-100 group-hover/mega:translate-y-0 group-hover/mega:pointer-events-auto transition-all duration-200 ease-out"
                    style={{ minWidth: "660px" }}>
                    {/* Bridge so the panel stays hovered when mouse moves down */}
                    <div className="h-2 w-full"></div>
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                      <div className="grid grid-cols-3">
                        {/* Category image */}
                        <div className="relative h-full min-h-[250px]">
                          <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                            <div>
                              <p className="text-white/70 text-xs">Shop Now</p>
                              <h3 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-poppins)" }}>{cat.name}</h3>
                            </div>
                          </div>
                        </div>
                        {/* Links */}
                        <div className="p-8 col-span-2 grid grid-cols-2 gap-8">
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-[#e91e63] mb-4 bg-pink-50 inline-block px-3 py-1 rounded-full">By Type</p>
                            <ul className="space-y-3">
                              {cat.subcategories.map((sub, i) => (
                                <li key={i}>
                                  <Link href={`/category/${cat.slug}`}
                                    className="text-[15px] font-medium text-gray-700 hover:text-[#e91e63] hover:translate-x-1.5 inline-flex items-center gap-3 transition-all cursor-pointer group">
                                    <div className="w-5 flex justify-center"><i className={`${getIconForSub(sub)} text-[#e91e63]/60 group-hover:text-[#e91e63] transition-colors`}></i></div>
                                    {sub}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-[#e91e63] mb-4 bg-pink-50 inline-block px-3 py-1 rounded-full">By Occasion</p>
                            <ul className="space-y-3">
                              <li>
                                <Link href="/category/cakes" className="text-[15px] font-medium text-gray-700 hover:text-[#e91e63] hover:translate-x-1.5 inline-flex items-center gap-3 transition-all cursor-pointer group">
                                  <div className="w-5 flex justify-center"><i className="fa-solid fa-cake-candles text-[#e91e63]/60 group-hover:text-[#e91e63] transition-colors"></i></div> Birthday
                                </Link>
                              </li>
                              <li>
                                <Link href="/category/flowers" className="text-[15px] font-medium text-gray-700 hover:text-[#e91e63] hover:translate-x-1.5 inline-flex items-center gap-3 transition-all cursor-pointer group">
                                  <div className="w-5 flex justify-center"><i className="fa-solid fa-heart text-[#e91e63]/60 group-hover:text-[#e91e63] transition-colors"></i></div> Anniversary
                                </Link>
                              </li>
                              <li>
                                <Link href="/category/personalised" className="text-[15px] font-medium text-gray-700 hover:text-[#e91e63] hover:translate-x-1.5 inline-flex items-center gap-3 transition-all cursor-pointer group">
                                  <div className="w-5 flex justify-center"><i className="fa-solid fa-ring text-[#e91e63]/60 group-hover:text-[#e91e63] transition-colors"></i></div> Wedding
                                </Link>
                              </li>
                              <li>
                                <Link href="/category/plants" className="text-[15px] font-medium text-gray-700 hover:text-[#e91e63] hover:translate-x-1.5 inline-flex items-center gap-3 transition-all cursor-pointer group">
                                  <div className="w-5 flex justify-center"><i className="fa-solid fa-hands-praying text-[#e91e63]/60 group-hover:text-[#e91e63] transition-colors"></i></div> Thank You
                                </Link>
                              </li>
                            </ul>
                            <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                              <Link href="/category/combos" className="text-[15px] font-bold text-[#e91e63] flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity bg-pink-50/50 p-2 rounded-lg">
                                <div className="w-5 flex justify-center"><i className="fa-solid fa-bolt text-[#e91e63]"></i></div> Same-Day Delivery
                              </Link>
                              <Link href="/category/cakes" className="text-[15px] font-bold text-[#e91e63] flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity bg-pink-50/50 p-2 rounded-lg">
                                <div className="w-5 flex justify-center"><i className="fa-solid fa-moon text-[#e91e63]"></i></div> Midnight Delivery
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}

              {/* Extra nav links */}
              <li className="ml-auto">
                <Link href="/track-order" className="flex items-center gap-2 px-4 py-4 text-sm font-semibold text-gray-600 hover:text-[#e91e63] transition-colors">
                  <i className="fa-solid fa-truck text-[#e91e63]"></i>
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* ── MOBILE DRAWER ─────────────────────────────────── */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-[60] lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div
              className="absolute inset-y-0 left-0 w-[85vw] max-w-xs bg-white shadow-2xl flex flex-col animate-slide-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100" style={{ background: "var(--color-primary)" }}>
                <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg" style={{ fontFamily: "var(--font-poppins)" }}>
                  <i className="fa-solid fa-gift"></i> GiftSite
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white">
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>

              {/* Auth row */}
              <div className="p-4 border-b border-gray-100 flex gap-3">
                <button onClick={() => { openAuth("login"); setMobileMenuOpen(false); }}
                  className="flex-1 text-center py-2.5 rounded-xl border-2 border-[#e91e63] text-[#e91e63] font-semibold text-sm hover:bg-pink-50 transition-colors">
                  Login
                </button>
                <button onClick={() => { openAuth("signup"); setMobileMenuOpen(false); }}
                  className="flex-1 text-center py-2.5 rounded-xl font-semibold text-sm text-white transition-colors"
                  style={{ background: "var(--color-primary)" }}>
                  Sign Up
                </button>
              </div>

              {/* Categories */}
              <div className="flex-1 overflow-y-auto py-4">
                <p className="px-5 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Categories</p>
                {categoriesData.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-3.5 text-gray-700 font-medium hover:bg-pink-50 hover:text-[#e91e63] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#e91e63] text-sm">
                      <i className={cat.icon}></i>
                    </div>
                    {cat.name}
                    <i className="fa-solid fa-chevron-right text-xs text-gray-300 ml-auto"></i>
                  </Link>
                ))}
                <div className="mx-5 my-3 border-t border-gray-100"></div>
                <Link href="/track-order" onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3.5 text-gray-700 font-medium hover:bg-pink-50 hover:text-[#e91e63] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#e91e63] text-sm">
                    <i className="fa-solid fa-truck"></i>
                  </div>
                  Track Order
                  <i className="fa-solid fa-chevron-right text-xs text-gray-300 ml-auto"></i>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModals isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} defaultType={authType} />
      <SlideInCart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
