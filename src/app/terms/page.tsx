import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | GiftSite",
  description: "Terms and conditions of using GiftSite.",
};

export default function TermsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[50vh]">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900" style={{ fontFamily: "var(--font-poppins)" }}>
        Terms & Conditions
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl">
        This page is currently under construction. Terms of service will be added here soon.
      </p>
    </div>
  );
}
