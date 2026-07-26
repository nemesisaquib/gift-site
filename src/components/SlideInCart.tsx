"use client";

import Link from "next/link";
import { useEffect } from "react";

interface SlideInCartProps {
  isOpen: boolean;
  onClose: () => void;
}

import { useCart } from "@/context/CartContext";

export default function SlideInCart({ isOpen, onClose }: SlideInCartProps) {
  const { cartItems, removeFromCart, updateQty } = useCart();
  
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-[90] w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2" style={{ fontFamily: "var(--font-poppins)" }}>
            <i className="fa-solid fa-bag-shopping text-[#e91e63]"></i>
            Your Cart
            <span className="text-sm font-semibold bg-[#e91e63] text-white px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Free shipping bar */}
        <div className="px-6 py-3 bg-green-50 border-b border-green-100 text-xs text-green-700 font-semibold flex items-center gap-2">
          <i className="fa-solid fa-truck-fast"></i>
          You qualify for FREE delivery!
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <i className="fa-solid fa-truck text-[#e91e63]"></i>
                  {item.delivery}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-xs font-bold transition-colors">−</button>
                    <span className="w-7 text-center text-sm font-semibold border-x border-gray-200">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-xs font-bold transition-colors">+</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">₹{item.price}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <i className="fa-solid fa-trash-can text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary + CTA */}
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cartItems.length} items)</span>
              <span className="font-semibold text-gray-900">₹{total}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
          </div>
          <div className="flex justify-between items-center font-bold text-gray-900 text-lg mb-5 pt-3 border-t border-gray-200">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <Link
            href="/checkout"
            onClick={onClose}
            className="w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg hover:opacity-90 transition-opacity"
            style={{ background: "var(--color-primary)" }}
          >
            Proceed to Checkout
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
          <button
            onClick={onClose}
            className="w-full mt-3 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors text-center"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
