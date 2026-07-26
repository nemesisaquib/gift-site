import { notFound } from "next/navigation";
import Link from "next/link";
import CategoryFilters from "@/components/CategoryFilters";
import categoriesData from "@/../data/categories.json";
import productsData from "@/../data/products.json";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoriesData.find((c) => c.slug === slug);
  return {
    title: cat ? `${cat.name} — Online Gifts | GiftSite` : "All Gifts | GiftSite",
    description: `Shop the best ${cat?.name?.toLowerCase() ?? "gifts"} online. Same-day delivery across India.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categoriesData.find((c) => c.slug === slug);

  if (!category && slug !== "all") return notFound();

  const products = slug === "all"
    ? productsData
    : productsData.filter((p) => p.categoryId === category!.id);

  const priceFilters = ["Under ₹500", "₹500 – ₹999", "₹1,000 – ₹1,999", "Above ₹2,000"];
  const occasions = ["Birthday", "Anniversary", "Wedding", "Thank You", "Congratulations"];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Category Hero */}
      {category && (
        <div className="relative h-40 sm:h-52 overflow-hidden">
          <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
              {/* Breadcrumb */}
              <nav className="text-xs text-white/70 mb-3 flex items-center gap-1">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
                <span className="text-white font-semibold">{category.name}</span>
              </nav>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white flex items-center gap-3" style={{ fontFamily: "var(--font-poppins)" }}>
                <i className={`${category.icon}`}></i>
                {category.name}
              </h1>
              <p className="text-white/80 mt-1 text-sm">{products.length} products found</p>
            </div>
          </div>
        </div>
      )}

      <CategoryFilters initialProducts={products} category={category} />
    </div>
  );
}
