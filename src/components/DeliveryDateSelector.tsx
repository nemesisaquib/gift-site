"use client";

import { useState } from "react";

interface DeliveryDateSelectorProps {
  dates: {
    label: string;
    day: string;
    month: string;
    available: boolean;
    badge: string | null;
  }[];
}

export default function DeliveryDateSelector({ dates }: DeliveryDateSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <h3 className="font-bold text-gray-800 mb-3 text-sm">Select Delivery Date</h3>
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {dates.map((d, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`shrink-0 w-[72px] rounded-xl border-2 py-2.5 flex flex-col items-center transition-all duration-300 ${
              selectedIndex === i
                ? "border-[#e91e63] bg-pink-50 text-[#e91e63] shadow-sm transform scale-105"
                : "border-gray-200 text-gray-600 hover:border-[#e91e63] bg-white hover:shadow-sm"
            }`}
          >
            <span className="text-[10px] font-semibold uppercase">{d.label}</span>
            <span className={`text-xl font-extrabold leading-none my-0.5 ${selectedIndex === i ? 'text-[#e91e63]' : 'text-gray-800'}`}>{d.day}</span>
            <span className="text-[10px] opacity-70">{d.month}</span>
            {d.badge && (
              <span className={`text-[9px] font-bold px-1.5 rounded-full mt-1 ${selectedIndex === i ? 'bg-[#e91e63] text-white' : 'bg-gray-200 text-gray-600'}`}>
                {d.badge}
              </span>
            )}
          </button>
        ))}
        <button className="shrink-0 w-[72px] rounded-xl border-2 border-dashed border-gray-200 text-gray-400 py-2.5 flex flex-col items-center hover:border-[#e91e63] hover:text-[#e91e63] transition-colors bg-white hover:bg-gray-50">
          <i className="fa-regular fa-calendar text-xl"></i>
          <span className="text-[10px] mt-1">More</span>
        </button>
      </div>
    </div>
  );
}
