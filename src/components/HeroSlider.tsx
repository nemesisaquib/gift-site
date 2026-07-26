"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const heroBanners = [
  {
    id: 1,
    tag: "1ST AUGUST",
    title: "Make Her Smile on\nGirlfriend's Day",
    sub: "Plan romantic gifts to\nsurprise your favourite girl",
    cta: "ORDER NOW",
    href: "/category/flowers",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=90",
    theme: "#F3C4B9", 
    text: "text-gray-900",
    ctaTheme: "bg-[#7c8b59] text-white hover:bg-[#6b7a48]",
  },
  {
    id: 2,
    tag: "2ND AUGUST",
    title: "Celebrate\nFriendship Day",
    sub: "Find fab gifts to\nWOW your BFFs",
    cta: "ORDER NOW",
    href: "/category/combos",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=90",
    theme: "#1A6B39",
    text: "text-white",
    ctaTheme: "bg-[#FFC629] text-gray-900 hover:bg-[#e5b225]",
  },
  {
    id: 3,
    tag: "SPECIAL OFFERS",
    title: "Birthday Joy,\nGift-Wrapped",
    sub: "Curated bloom, cakes & more\nfor thoughtful celebrations",
    cta: "ORDER NOW",
    href: "/category/cakes",
    image: "https://images.unsplash.com/photo-1530103862676-de8892437659?w=800&q=90",
    theme: "#FFF1E0",
    text: "text-gray-900",
    ctaTheme: "bg-[#7c8b59] text-white hover:bg-[#6b7a48]",
  },
  {
    id: 4,
    tag: "NEW ARRIVALS",
    title: "Premium\nGift Hampers",
    sub: "Exclusive hampers for\nevery special occasion",
    cta: "ORDER NOW",
    href: "/category/hampers",
    image: "https://images.unsplash.com/photo-1542840410-3092f99611a3?w=800&q=90",
    theme: "#D8E2DC",
    text: "text-gray-900",
    ctaTheme: "bg-[#ff9f1c] text-white hover:bg-[#ff8f00]",
  }
];

export default function HeroSlider() {
  const extendedBanners = [...heroBanners, ...heroBanners, ...heroBanners];
  const [current, setCurrent] = useState(heroBanners.length);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const scrollLeft = () => {
    if (!isTransitioning) setIsTransitioning(true);
    setCurrent((prev) => prev - 1);
  };

  const scrollRight = () => {
    if (!isTransitioning) setIsTransitioning(true);
    setCurrent((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitioning(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  const handleTransitionEnd = () => {
    if (current < heroBanners.length) {
      setIsTransitioning(false);
      setCurrent(current + heroBanners.length);
    } else if (current >= heroBanners.length * 2) {
      setIsTransitioning(false);
      setCurrent(current - heroBanners.length);
    }
  };

  // Auto scroll
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) setIsTransitioning(true);
      setCurrent((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [isTransitioning]);

  return (
    <section className="w-full relative overflow-hidden bg-white py-8 group">
      {/* 
        We use CSS variables to define card width and gap dynamically.
        This allows us to calculate the exact translateX in CSS for perfectly smooth, centered animations.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        .slider-track {
          --card-w: 90vw;
          --gap: 1.5rem; /* 24px */
        }
        @media (min-width: 768px) {
          .slider-track { --card-w: 70vw; }
        }
        @media (min-width: 1024px) {
          .slider-track { --card-w: 1000px; }
        }
        
        .slider-transform {
          /* 50vw places the left edge of the track at the center of the screen */
          /* -(var(--card-w) / 2) offsets the card so its center aligns with the screen center */
          /* -calc(var(--current) * (var(--card-w) + var(--gap))) shifts the track to the active card */
          transform: translateX(calc(50vw - (var(--card-w) / 2) - var(--current) * (var(--card-w) + var(--gap))));
        }
      `}} />

      <div className="w-full relative h-[350px] sm:h-[400px] md:h-[460px]">
        
        {/* Track */}
        <div 
          className={`slider-track slider-transform absolute top-0 left-0 h-full flex ${
            isTransitioning ? "transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]" : ""
          }`}
          style={{ gap: 'var(--gap)', '--current': current } as React.CSSProperties}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedBanners.map((banner, index) => {
            const isActive = index === current;
            return (
              <div 
                key={`${banner.id}-${index}`}
                className={`shrink-0 h-full rounded-3xl overflow-hidden relative flex items-center shadow-sm ${
                  isTransitioning ? "transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]" : ""
                } ${
                  isActive ? "scale-100 opacity-100" : "scale-[0.98] opacity-60"
                }`}
                style={{ 
                  width: 'var(--card-w)', 
                  backgroundColor: banner.theme 
                }}
              >
                
                {/* Background Image (Right side) */}
                <div className="absolute top-0 right-0 bottom-0 w-1/2">
                  <img 
                    src={banner.image} 
                    alt={banner.title.replace('\n', ' ')} 
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Gradient to blend image with solid background color */}
                  <div 
                    className="absolute inset-y-0 left-0 w-2/5" 
                    style={{ background: `linear-gradient(to right, ${banner.theme} 0%, transparent 100%)` }}
                  />
                </div>

                {/* Content (Left side) */}
                <div className={`relative z-10 w-full sm:w-[55%] px-8 sm:px-12 md:px-16 py-8 flex flex-col justify-center h-full ${banner.text}`}>
                  <p className="text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 opacity-90">
                    {banner.tag}
                  </p>
                  <h2 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.15] mb-5 whitespace-pre-line tracking-tight"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {banner.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg opacity-90 mb-8 whitespace-pre-line max-w-[340px]">
                    {banner.sub}
                  </p>
                  <div>
                    <Link
                      href={banner.href}
                      className={`inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-colors shadow-sm ${banner.ctaTheme}`}
                      tabIndex={isActive ? 0 : -1}
                    >
                      {banner.cta}
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollLeft}
          className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 shadow-xl border border-gray-100 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
          aria-label="Previous slide"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 shadow-xl border border-gray-100 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
          aria-label="Next slide"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

      </div>
    </section>
  );
}
