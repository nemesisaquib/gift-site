"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type Step = 1 | 2 | 3;

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartItems } = useCart();
  
  // Get logged in user to prefill
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  
  useEffect(() => {
    const savedUser = localStorage.getItem("giftsite_user");
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (e) {}
    }
  }, []);

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Auto-create user account at Step 2
    if (step === 2) {
      const formData = new FormData(e.currentTarget);
      const senderName = formData.get("senderName") as string;
      const senderEmail = formData.get("senderEmail") as string;
      if (senderName && senderEmail) {
        const existingUser = localStorage.getItem("giftsite_user");
        if (!existingUser) {
          localStorage.setItem("giftsite_user", JSON.stringify({ name: senderName, email: senderEmail }));
        }
      }
    }

    if (step < 3) {
      setStep((s) => (s + 1) as Step);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        window.location.href = "/";
      }, 2000);
    }
  };

  const steps = [
    { n: 1, label: "Address", icon: "fa-solid fa-location-dot" },
    { n: 2, label: "Message", icon: "fa-solid fa-envelope-open-text" },
    { n: 3, label: "Payment", icon: "fa-solid fa-credit-card" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ background: "var(--color-primary)" }}>
              <i className="fa-solid fa-gift"></i>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block" style={{ fontFamily: "var(--font-poppins)" }}>
              Gift<span style={{ color: "var(--color-primary)" }}>Site</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <i className="fa-solid fa-lock text-gray-400"></i>
            256-bit SSL Secured Checkout
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 px-6 py-5">
          <div className="flex items-center">
            {steps.map((s, idx) => (
              <div key={s.n} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      step > s.n
                        ? "bg-green-500 text-white"
                        : step === s.n
                        ? "text-white shadow-lg"
                        : "bg-gray-100 text-gray-400"
                    }`}
                    style={step === s.n ? { background: "var(--color-primary)" } : {}}
                  >
                    {step > s.n ? <i className="fa-solid fa-check"></i> : <i className={s.icon}></i>}
                  </div>
                  <span className={`text-[11px] font-semibold mt-1.5 ${step >= s.n ? "text-gray-800" : "text-gray-400"}`}>
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-3 mb-5 rounded-full transition-colors ${step > s.n ? "bg-green-500" : "bg-gray-200"}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── FORM ─────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 bg-pink-50 text-[#e91e63] rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">
                  <i className="fa-solid fa-cart-arrow-down"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-poppins)" }}>Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven&apos;t added any gifts yet. Explore our collection and find something special!</p>
                <Link href="/" className="inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-lg" style={{ background: "var(--color-primary)" }}>
                  Browse Gifts <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleNext} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">

              {/* Step 1: Address */}
              {step === 1 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-poppins)" }}>
                    <i className="fa-solid fa-location-dot text-[#e91e63]"></i>
                    Recipient&apos;s Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Recipient Name *</label>
                      <input required type="text" placeholder="Full name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-[#e91e63]/20 bg-gray-50 focus:bg-white transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number *</label>
                      <input required type="tel" placeholder="10-digit mobile" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-[#e91e63]/20 bg-gray-50 focus:bg-white transition-all" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Address *</label>
                      <textarea required placeholder="House/Flat no., Building name, Street, Area..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-[#e91e63]/20 bg-gray-50 focus:bg-white transition-all h-24 resize-none"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pincode *</label>
                      <input required type="text" maxLength={6} placeholder="e.g. 110001" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-[#e91e63]/20 bg-gray-50 focus:bg-white transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">City</label>
                      <input type="text" placeholder="Auto-detected from pincode" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-[#e91e63]/20 bg-gray-50 transition-all" readOnly />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Message */}
              {step === 2 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-poppins)" }}>
                    <i className="fa-solid fa-envelope-open-text text-[#e91e63]"></i>
                    Personal Message & Sender Details
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message on Gift Card <span className="text-green-600 font-normal text-xs">(Free)</span></label>
                      <textarea placeholder="Write your heartfelt message here... (e.g. Happy Birthday! Wishing you all the best!)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-[#e91e63]/20 bg-gray-50 focus:bg-white transition-all h-32 resize-none"></textarea>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                        <input required name="senderName" type="text" defaultValue={user?.name || ""} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-[#e91e63]/20 bg-gray-50 focus:bg-white transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Email *</label>
                        <input required name="senderEmail" type="email" defaultValue={user?.email || ""} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-[#e91e63]/20 bg-gray-50 focus:bg-white transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-poppins)" }}>
                    <i className="fa-solid fa-credit-card text-[#e91e63]"></i>
                    Payment Method
                  </h2>

                  <div className="space-y-3 mb-6">
                    {[
                      { id: "card", label: "Credit / Debit Card", icons: ["fa-brands fa-cc-visa", "fa-brands fa-cc-mastercard"], defaultChecked: true },
                      { id: "upi", label: "UPI Payment", icons: ["fa-solid fa-mobile-screen-button"], defaultChecked: false },
                      { id: "nb", label: "Net Banking", icons: ["fa-solid fa-building-columns"], defaultChecked: false },
                      { id: "cod", label: "Cash on Delivery", icons: ["fa-solid fa-money-bill-wave"], defaultChecked: false },
                    ].map((m) => (
                      <label
                        key={m.id}
                        className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer has-[:checked]:border-[#e91e63] has-[:checked]:bg-pink-50 border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" defaultChecked={m.defaultChecked} className="w-4 h-4 accent-[#e91e63]" />
                          <span className="text-sm font-semibold text-gray-800">{m.label}</span>
                        </div>
                        <div className="flex gap-2 text-xl text-gray-400">
                          {m.icons.map((ic) => <i key={ic} className={ic}></i>)}
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-200">
                    <h4 className="text-sm font-bold text-gray-700">Card Details</h4>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#e91e63] bg-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Expiry Date</label>
                        <input type="text" placeholder="MM / YY" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#e91e63] bg-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">CVV</label>
                        <input type="text" placeholder="• • •" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#e91e63] bg-white" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Nav Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <button type="button" onClick={() => setStep((s) => (s - 1) as Step)} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                    <i className="fa-solid fa-arrow-left"></i> Back
                  </button>
                ) : <div />}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-lg disabled:opacity-70"
                  style={{ background: "var(--color-primary)" }}
                >
                  {isProcessing ? (
                    <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</>
                  ) : step === 3 ? (
                    <><i className="fa-solid fa-lock"></i> Pay ₹{total}</>
                  ) : (
                    <>Continue <i className="fa-solid fa-arrow-right"></i></>
                  )}
                </button>
              </div>
            </form>
            )}
          </div>

          {/* ── ORDER SUMMARY ─────────────────────────────────── */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h3 className="font-extrabold text-gray-900 mb-5 pb-4 border-b border-gray-100 text-lg" style={{ fontFamily: "var(--font-poppins)" }}>
                Order Summary
              </h3>
              <div className="space-y-4 mb-5">
                {cartItems.map((item, i) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 shrink-0 relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{item.qty}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        <i className="fa-solid fa-truck text-[#e91e63]"></i> {item.delivery}
                      </p>
                      <p className="text-sm font-bold text-gray-900 mt-1">₹{item.price * item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 pt-4 border-t border-gray-100 text-sm">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-semibold text-gray-800">₹{total}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="font-semibold text-green-600">FREE</span></div>
                <div className="flex justify-between text-gray-600"><span>Discount</span><span className="font-semibold text-gray-800">— ₹0</span></div>
              </div>

              <div className="flex justify-between font-extrabold text-gray-900 text-xl pt-4 mt-3 border-t-2 border-gray-200">
                <span>Total</span><span>₹{total}</span>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <input type="text" placeholder="Coupon code (e.g. SAVE15)" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e91e63] bg-gray-50 mb-2" />
                <button className="w-full border-2 border-[#e91e63] text-[#e91e63] font-bold py-2.5 rounded-xl text-sm hover:bg-pink-50 transition-colors">
                  Apply Coupon
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-gray-400">
                <i className="fa-solid fa-shield-halved text-green-500"></i>
                Safe &amp; Secure | SSL Encrypted
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
