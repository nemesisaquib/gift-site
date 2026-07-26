"use client";

import { useState } from "react";

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "available" | "limited" | "error">("idle");
  const [cityName, setCityName] = useState("");

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) return;
    setStatus("loading");
    
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();
      
      if (data && data[0] && data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setCityName(`${postOffice.Name}, ${postOffice.District}`);
        setStatus(["110001", "400001", "560001", "225001"].includes(pincode) ? "available" : "limited");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
        <i className="fa-solid fa-location-dot text-[#e91e63]"></i>
        Check Delivery Availability
      </h3>
      <form onSubmit={check} className="flex gap-2">
        <input
          type="text"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
            setStatus("idle");
          }}
          placeholder="Enter 6-digit pincode"
          maxLength={6}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-[#e91e63]/20 bg-white transition-all"
        />
        <button
          type="submit"
          disabled={pincode.length !== 6 || status === "loading"}
          className="text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
          style={{ background: "var(--color-primary)" }}
        >
          {status === "loading" ? <i className="fa-solid fa-spinner fa-spin"></i> : "Check"}
        </button>
      </form>
      {status === "available" && (
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
          <i className="fa-solid fa-circle-check text-green-500 shrink-0"></i>
          Great! Same-day delivery available for {cityName} ({pincode}).
        </div>
      )}
      {status === "limited" && (
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
          <i className="fa-solid fa-triangle-exclamation text-amber-500 shrink-0"></i>
          Standard delivery (2–3 days) available for {cityName} ({pincode}).
        </div>
      )}
      {status === "error" && (
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          <i className="fa-solid fa-circle-xmark text-red-500 shrink-0"></i>
          Invalid Pincode. Please check and try again.
        </div>
      )}
    </div>
  );
}
