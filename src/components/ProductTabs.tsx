"use client";

import { useState } from "react";

interface ProductTabsProps {
  description: string;
  specifications: { key: string; value: string }[] | null;
  careInstructions: string[] | null;
}

export default function ProductTabs({ description, specifications, careInstructions }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Description", "Specifications", "Care Instructions"];

  // Default fallback data for products without full FNP data
  const defaultSpecs = [
    { key: "Material", value: "Premium Quality" },
    { key: "Packaging", value: "Secure Box" },
    { key: "Occasion", value: "All occasions" }
  ];
  
  const defaultCare = [
    "Keep away from direct sunlight and extreme temperatures.",
    "Handle with care to avoid damage.",
    "Clean gently with a soft, dry cloth if necessary."
  ];

  const renderContent = () => {
    if (activeTab === 0) {
      return <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line animate-fadeIn">{description}</div>;
    }
    if (activeTab === 1) {
      const specs = specifications && specifications.length > 0 ? specifications : defaultSpecs;
      return (
        <ul className="space-y-3 animate-fadeIn">
          {specs.map((spec, i) => (
            <li key={i} className="flex text-sm border-b border-gray-100 pb-2 last:border-0">
              <span className="w-1/3 text-gray-500 font-medium">{spec.key}</span>
              <span className="w-2/3 text-gray-800">{spec.value}</span>
            </li>
          ))}
        </ul>
      );
    }
    if (activeTab === 2) {
      const care = careInstructions && careInstructions.length > 0 ? careInstructions : defaultCare;
      return (
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 animate-fadeIn marker:text-[#e91e63]">
          {care.map((instruction, i) => (
            <li key={i} className="leading-relaxed">{instruction}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`whitespace-nowrap px-6 sm:px-8 py-4 text-sm font-semibold transition-all duration-300 relative ${
              activeTab === i
                ? "text-[#e91e63] bg-pink-50/30"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            {tab}
            {activeTab === i && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e91e63] shadow-[0_-2px_8px_rgba(233,30,99,0.5)]"></span>
            )}
          </button>
        ))}
      </div>
      <div className="p-6 sm:p-8 min-h-[160px]">
        {renderContent()}
      </div>
    </div>
  );
}
