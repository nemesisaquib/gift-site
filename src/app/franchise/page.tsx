import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Franchise | GiftSite",
  description: "Franchise opportunities with GiftSite.",
};

export default function FranchisePage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[50vh]">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900" style={{ fontFamily: "var(--font-poppins)" }}>
        Franchise
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl">
        This page is currently under construction. Franchise details will be updated here soon!
      </p>
    </div>
  );
}
