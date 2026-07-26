import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import productsData from "@/../data/products.json";
import categoriesData from "@/../data/categories.json";
import fnpData from "@/../data/fnp.json";
import PincodeChecker from "@/components/PincodeChecker";
import AddToCartButton from "@/components/AddToCartButton";
import DeliveryDateSelector from "@/components/DeliveryDateSelector";
import ProductTabs from "@/components/ProductTabs";
import ProductGallery from "@/components/ProductGallery";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = productsData.find((p) => p.slug === id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} | Buy Online with Same-Day Delivery`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = productsData.find((p) => p.slug === id);
  if (!product) return notFound();

  const category = categoriesData.find(c => c.id === product.categoryId);
  
  // Extract live details from fnp data if available
  const fnpProduct = fnpData.products.find(p => p.slug === product.slug);
  const specifications = fnpProduct?.details || null;
  const careInstructions = fnpProduct?.care_instructions || null;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const deliveryDates = [
    { label: "Today", day: "26", month: "Jul", available: true, badge: "Same Day" },
    { label: "Tomorrow", day: "27", month: "Jul", available: true, badge: null },
    { label: "Mon", day: "28", month: "Jul", available: true, badge: null },
    { label: "Tue", day: "29", month: "Jul", available: true, badge: null },
  ];

  const relatedProducts = productsData.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#fafafa] pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-xs text-gray-500 flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-[#e91e63] transition-colors">Home</Link>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <Link href={`/category/${category?.slug}`} className="hover:text-[#e91e63] transition-colors capitalize">
              {category?.name || "Category"}
            </Link>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span className="text-gray-800 font-semibold line-clamp-1">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── LEFT: IMAGE GALLERY ─────────────────────────── */}
          <ProductGallery 
            images={[product.image, product.image]} 
            productName={product.title} 
            isBestSeller={product.isBestSeller}
            expressDelivery={product.expressDelivery}
            discount={discount}
          />

          {/* ── RIGHT: PRODUCT INFO ─────────────────────────── */}
          <div className="space-y-5">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight" style={{ fontFamily: "var(--font-poppins)" }}>
                {product.title}
              </h1>
              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                  <span className="font-bold text-sm text-amber-700">{product.rating}</span>
                  <i className="fa-solid fa-star text-amber-500 text-xs"></i>
                </div>
                <Link href="#reviews" className="text-sm text-[#e91e63] hover:underline font-medium">
                  {product.reviews.toLocaleString()} Reviews
                </Link>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
                  <i className="fa-solid fa-circle-check text-xs"></i> In Stock
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-5 border-b border-gray-100">
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">₹{product.price}</span>
              {discount > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                  <span className="bg-green-50 text-green-700 text-sm font-bold px-2.5 py-1 rounded-lg border border-green-100">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Urgency */}
            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-red-700 font-semibold">
              <i className="fa-solid fa-fire text-red-500 animate-pulse"></i>
              Order within <span className="font-extrabold mx-1">2:34:15</span> for Same Day Delivery!
            </div>

            {/* Pincode Checker */}
            <PincodeChecker />

            {/* Delivery Date */}
            <DeliveryDateSelector dates={deliveryDates} />

            {/* Personalisation */}
            {product.categoryId === "c3" && (
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-2 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-wand-magic-sparkles text-purple-500"></i>
                  Personalise Your Gift
                </h3>
                <label className="block w-full border-2 border-dashed border-purple-200 rounded-xl p-5 text-center cursor-pointer hover:bg-purple-100/50 transition-colors">
                  <i className="fa-solid fa-cloud-arrow-up text-3xl text-purple-400 mb-2 block"></i>
                  <span className="font-semibold text-gray-700 text-sm">Upload Your Photo</span>
                  <span className="block text-xs text-gray-500 mt-1">JPG or PNG, max 5MB</span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <AddToCartButton product={product} />
              <button
                className="text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2 text-sm"
                style={{ background: "var(--color-primary)" }}
              >
                <i className="fa-solid fa-bolt"></i>
                Buy Now
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-100">
              {[
                { icon: "fa-solid fa-truck-fast", text: "Free Delivery" },
                { icon: "fa-solid fa-rotate-left", text: "Easy Returns" },
                { icon: "fa-solid fa-shield-halved", text: "100% Secure" },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <i className={`${t.icon} text-[#e91e63]`}></i>
                  {t.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── DESCRIPTION TABS ───────────────────────────────── */}
        <ProductTabs 
          description={product.description} 
          specifications={specifications}
          careInstructions={careInstructions}
        />

        {/* ── RELATED PRODUCTS ───────────────────────────────── */}
        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "var(--font-poppins)" }}>
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {relatedProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <Link href={`/product/${p.slug}`} className="block relative overflow-hidden bg-gray-50" style={{ paddingTop: "80%" }}>
                  <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="p-3">
                  <Link href={`/product/${p.slug}`} className="block font-semibold text-gray-800 text-xs sm:text-sm line-clamp-2 hover:text-[#e91e63] transition-colors mb-2" style={{ minHeight: "2.25rem" }}>
                    {p.title}
                  </Link>
                  <p className="font-bold text-gray-900">₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STICKY MOBILE CTA ──────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-3 lg:hidden z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <AddToCartButton product={product} isMobile={true} />
        <button className="flex-1 text-white font-bold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2" style={{ background: "var(--color-primary)" }}>
          <i className="fa-solid fa-bolt"></i> Buy Now
        </button>
      </div>
    </div>
  );
}
