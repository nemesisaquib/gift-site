import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | GiftSite",
  description: "Read GiftSite's privacy policy — how we collect, use and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#e91e63] text-sm font-semibold hover:underline mb-6">
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4" style={{ fontFamily: "var(--font-poppins)" }}>
            Privacy Policy
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Last updated: July 2026</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 space-y-8 text-gray-700 text-sm leading-relaxed">
          {[
            { title: "1. Information We Collect", content: "We collect information you provide directly to us, such as name, email address, phone number, and delivery address when you create an account or place an order. We also collect usage data, device information, and payment details processed securely through our payment gateway partners." },
            { title: "2. How We Use Your Information", content: "We use the information to process orders and deliver gifts, send order updates and delivery notifications, personalise your shopping experience, respond to customer support requests, send promotional communications (with your consent), and improve our services." },
            { title: "3. Sharing Your Information", content: "We share your information only with trusted partners who help us operate our business — including delivery partners, payment processors, and logistics providers. We never sell your personal data to third parties for marketing purposes." },
            { title: "4. Data Security", content: "All data is encrypted in transit using 256-bit SSL/TLS. Payment information is processed through PCI-DSS compliant gateways. We regularly review our security practices to protect your information." },
            { title: "5. Cookies", content: "We use cookies and similar tracking technologies to remember your preferences, analyse site traffic, and personalise content. You can control cookie settings through your browser at any time." },
            { title: "6. Your Rights", content: "You have the right to access, correct, or delete your personal data at any time. You can update your profile from your account settings or contact our support team at privacy@giftsite.in." },
            { title: "7. Contact Us", content: "For any privacy-related concerns, write to us at privacy@giftsite.in or call our customer care at 1800-XXX-XXXX (toll-free, 9 AM – 9 PM)." },
          ].map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-poppins)" }}>{s.title}</h2>
              <p>{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
