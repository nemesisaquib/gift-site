import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Return & Refund Policy | GiftSite",
  description: "GiftSite's hassle-free return and refund policy. Learn how to raise a return request and get your refund.",
};

export default function ReturnsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#e91e63] text-sm font-semibold hover:underline">
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4" style={{ fontFamily: "var(--font-poppins)" }}>
            Return &amp; Refund Policy
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Last updated: July 2026</p>
        </div>

        {/* Quick info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: "fa-solid fa-clock", title: "Report within 24h", sub: "Raise issues within 24 hours of delivery", color: "text-blue-500" },
            { icon: "fa-solid fa-rotate-left", title: "Easy Process", sub: "Simple online return request form", color: "text-green-500" },
            { icon: "fa-solid fa-indian-rupee-sign", title: "Fast Refund", sub: "Refunded within 5-7 business days", color: "text-[#e91e63]" },
          ].map((c) => (
            <div key={c.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center ${c.color} shrink-0`}>
                <i className={c.icon}></i>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{c.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 space-y-8 text-gray-700 text-sm leading-relaxed">
          {[
            { title: "Eligible for Return / Replacement", content: "Products are eligible for return or replacement if they arrive damaged, defective, or significantly different from what was ordered. Perishable items (flowers, cakes, plants) must be reported within 24 hours of delivery with photographic evidence." },
            { title: "Non-Returnable Items", content: "Personalised or customised gifts, digital gift cards, and perishable items (flowers, food items) reported after 24 hours of delivery are not eligible for return. Products with broken seals or damaged packaging by the recipient are also non-returnable." },
            { title: "How to Raise a Return Request", content: "1. Log in to your GiftSite account.\n2. Go to 'My Orders' and select the relevant order.\n3. Click 'Report an Issue' and describe the problem.\n4. Upload clear photographs of the damaged/incorrect product.\n5. Our team will review and respond within 24 hours." },
            { title: "Refund Process", content: "Once your return is approved, refunds are processed to the original payment method within 5-7 business days. For cash-on-delivery orders, refunds are issued as GiftSite credits or bank transfer within 7-10 business days." },
            { title: "Contact Us", content: "For return/refund queries, email us at returns@giftsite.in or call 1800-XXX-XXXX (toll-free, 9 AM – 9 PM, all days)." },
          ].map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-poppins)" }}>{s.title}</h2>
              <p className="whitespace-pre-line">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
