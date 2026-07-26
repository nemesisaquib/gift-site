"use client";

import { useState } from "react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found">("idle");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("found"), 1500);
  };

  const timeline = [
    {
      label: "Order Placed",
      time: "25 Jul, 10:30 AM",
      desc: "Your order has been received and confirmed.",
      icon: "fa-solid fa-circle-check",
      done: true,
    },
    {
      label: "Prepared & Packed",
      time: "25 Jul, 02:15 PM",
      desc: "Quality checked and beautifully packaged.",
      icon: "fa-solid fa-box",
      done: true,
    },
    {
      label: "Out for Delivery",
      time: "26 Jul, 09:45 AM",
      desc: "Your gift is on its way! 🚀",
      icon: "fa-solid fa-truck-fast",
      done: true,
      active: true,
    },
    {
      label: "Delivered",
      time: "Expected by 01:00 PM",
      desc: "Your gift will make them smile!",
      icon: "fa-solid fa-gift",
      done: false,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 rounded-2xl items-center justify-center text-white text-2xl mb-4 shadow-lg" style={{ background: "var(--color-primary)" }}>
            <i className="fa-solid fa-truck-fast"></i>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900" style={{ fontFamily: "var(--font-poppins)" }}>
            Track Your Order
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Enter your order details to get real-time updates
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6">
          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Order ID
              </label>
              <div className="relative">
                <i className="fa-solid fa-hashtag absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input
                  required
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. GS-123456"
                  className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-[#e91e63]/20 bg-gray-50 focus:bg-white transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <i className="fa-regular fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-[#e91e63]/20 bg-gray-50 focus:bg-white transition-all"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full text-white font-bold py-3.5 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2 shadow-md mt-2"
              style={{ background: "var(--color-primary)" }}
            >
              {status === "loading" ? (
                <><i className="fa-solid fa-circle-notch fa-spin"></i> Tracking...</>
              ) : (
                <><i className="fa-solid fa-magnifying-glass"></i> Track Order</>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {status === "found" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
            {/* Order header */}
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-lg text-gray-900" style={{ fontFamily: "var(--font-poppins)" }}>
                  Order #{orderId || "GS-123456"}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">Placed on 25 Jul 2026 • 2 items</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Out for Delivery
              </span>
            </div>

            {/* Delivery Agent */}
            <div className="px-6 py-4 bg-pink-50 border-b border-pink-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#e91e63]/10 border-2 border-[#e91e63]/20 flex items-center justify-center text-[#e91e63] text-xl">
                <i className="fa-solid fa-user"></i>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Delivery Agent: Rahul K.</p>
                <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                  <i className="fa-solid fa-phone text-[#e91e63]"></i>
                  +91 98765 43210
                </p>
              </div>
              <a href="tel:+919876543210" className="ml-auto w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm" style={{ background: "var(--color-primary)" }}>
                <i className="fa-solid fa-phone"></i>
              </a>
            </div>

            {/* Timeline */}
            <div className="p-6">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-5 top-5 bottom-5 w-px bg-gray-100"></div>

                <div className="space-y-8">
                  {timeline.map((t, i) => (
                    <div key={i} className="flex gap-5 relative">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm z-10 shrink-0 ${
                          t.active
                            ? "text-white shadow-lg animate-pulse-ring"
                            : t.done
                            ? "text-white"
                            : "bg-gray-100 text-gray-300"
                        }`}
                        style={t.active || t.done ? { background: t.done ? "var(--color-primary)" : undefined } : {}}
                      >
                        <i className={t.icon}></i>
                      </div>
                      <div className="flex-1 pt-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`font-bold text-sm ${t.active ? "text-[#e91e63]" : t.done ? "text-gray-800" : "text-gray-400"}`}>
                            {t.label}
                          </h4>
                          <span className={`text-xs shrink-0 ${t.done ? "text-gray-500" : "text-gray-300"}`}>{t.time}</span>
                        </div>
                        <p className={`text-xs mt-0.5 ${t.done ? "text-gray-500" : "text-gray-300"}`}>{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 text-center text-sm font-semibold border-2 border-gray-200 text-gray-700 py-3 rounded-xl hover:border-[#e91e63] hover:text-[#e91e63] transition-colors"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i>
                Continue Shopping
              </Link>
              <button className="flex-1 text-sm font-semibold text-white py-3 rounded-xl hover:opacity-90 transition-opacity" style={{ background: "var(--color-primary)" }}>
                <i className="fa-regular fa-envelope mr-2"></i>
                Email Tracking Details
              </button>
            </div>
          </div>
        )}

        {/* Help link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Need help?{" "}
          <a href="#" className="text-[#e91e63] font-semibold hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
