"use client";

import Link from "next/link";
import { useState } from "react";

interface Product {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  isBestSeller: boolean;
  expressDelivery: boolean;
  image: string;
}

import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const { addToCart, isInCart } = useCart();
  const { addToast } = useToast();
  const added = isInCart(product.id);
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!added) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        qty: 1,
        image: product.image,
        delivery: product.expressDelivery ? "Today — Same Day" : "Standard Delivery"
      });
      addToast("Successfully added to cart");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block relative h-56 overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Top-left badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="bg-[#e91e63] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
              ⭐ Best Seller
            </span>
          )}
          {product.expressDelivery && (
            <span className="bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
              <i className="fa-solid fa-bolt"></i> Express
            </span>
          )}
        </div>
        {/* Wishlist */}
        <button
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-[#e91e63] hover:scale-110 transition-all shadow-sm"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          aria-label="Add to wishlist"
        >
          <i className="fa-regular fa-heart"></i>
        </button>
        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute bottom-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {discount}% OFF
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-amber-400 text-xs">
            {[1, 2, 3, 4, 5].map((s) => (
              <i key={s} className={`fa-${s <= Math.floor(product.rating) ? "solid" : "regular"} fa-star`}></i>
            ))}
          </div>
          <span className="text-[11px] text-gray-500 font-medium">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Title */}
        <Link
          href={`/product/${product.slug}`}
          className="block font-semibold text-gray-800 text-sm leading-snug line-clamp-2 hover:text-[#e91e63] transition-colors mb-3"
          style={{ minHeight: "2.5rem" }}
        >
          {product.title}
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Add to cart */}
        <button 
          onClick={handleAddToCart}
          className={`w-full border-2 border-[#e91e63] font-semibold py-2.5 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn ${added ? 'bg-[#e91e63] text-white scale-[1.02] shadow-md' : 'text-[#e91e63] hover:bg-[#e91e63] hover:text-white'}`}
        >
          {added ? (
            <>
              <i className="fa-solid fa-check text-green-300"></i>
              View Cart
            </>
          ) : (
            <>
              <i className="fa-solid fa-cart-shopping transition-transform group-hover/btn:scale-110"></i>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
