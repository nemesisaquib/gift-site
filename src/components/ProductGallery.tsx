"use client";

import { useState } from "react";
import Image from "next/image"; // we can just use normal img since the old code did

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isBestSeller?: boolean;
  expressDelivery?: boolean;
  discount?: number;
}

export default function ProductGallery({ 
  images, 
  productName, 
  isBestSeller, 
  expressDelivery, 
  discount 
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex gap-3 items-start self-start lg:sticky lg:top-28">
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="hidden sm:flex flex-col gap-2.5 w-[72px] shrink-0">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-full aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                  activeIndex === i
                    ? "border-[#e91e63] shadow-md"
                    : "border-gray-200 hover:border-[#e91e63] opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`${productName} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Main image */}
        <div 
          className="flex-1 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 shadow-md cursor-zoom-in group"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={images[activeIndex]}
            alt={productName}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ aspectRatio: "1 / 1" }}
          />
          
          {/* Zoom Hint Icon */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
              <i className="fa-solid fa-magnifying-glass-plus text-xl"></i>
            </div>
          </div>
          
          {/* Wishlist */}
          <button 
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-[#e91e63] transition-all shadow-md hover:scale-110 z-10"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <i className="fa-regular fa-heart text-lg"></i>
          </button>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {isBestSeller && (
              <span className="text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm bg-[#e91e63]">
                ⭐ Best Seller
              </span>
            )}
            {expressDelivery && (
              <span className="bg-amber-400 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                <i className="fa-solid fa-bolt mr-1"></i> Express
              </span>
            )}
            {discount && discount > 0 ? (
              <span className="bg-green-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                {discount}% OFF
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fadeIn">
          {/* Close Button */}
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>

          {/* Previous Arrow */}
          {images.length > 1 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
              }}
              className="absolute left-4 sm:left-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <i className="fa-solid fa-chevron-left text-xl"></i>
            </button>
          )}

          {/* Modal Image */}
          <div className="relative w-full max-w-5xl max-h-[90vh] px-4 sm:px-12 flex items-center justify-center" onClick={() => setIsModalOpen(false)}>
            <img
              src={images[activeIndex]}
              alt={productName}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl cursor-zoom-out animate-scaleIn"
              onClick={(e) => e.stopPropagation()} // prevent click from closing if clicked exactly on image
            />
          </div>

          {/* Next Arrow */}
          {images.length > 1 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-4 sm:right-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <i className="fa-solid fa-chevron-right text-xl"></i>
            </button>
          )}

          {/* Thumbnail Strip in Modal */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    activeIndex === i ? "border-[#e91e63] scale-110" : "border-white/20 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
