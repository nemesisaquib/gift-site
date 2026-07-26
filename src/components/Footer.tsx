import Link from "next/link";

const footerLinks = {
  "Know Us": [
    { label: "About GiftSite", href: "/about" },
    { label: "Our Story", href: "/story" },
    { label: "Corporate Gifting", href: "/corporate" },
    { label: "Franchise", href: "/franchise" },
    { label: "Careers", href: "/careers" },
  ],
  "Need Help?": [
    { label: "Track Order", href: "/track-order" },
    { label: "Return & Refund Policy", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "FAQ", href: "/faq" },
  ],
  "Categories": [
    { label: "Flowers", href: "/category/flowers" },
    { label: "Cakes", href: "/category/cakes" },
    { label: "Plants", href: "/category/plants" },
    { label: "Personalised Gifts", href: "/category/personalised" },
    { label: "Combos", href: "/category/combos" },
  ],
};

const socialLinks = [
  { icon: "fa-brands fa-facebook-f", href: "https://facebook.com", label: "Facebook" },
  { icon: "fa-brands fa-instagram", href: "https://instagram.com", label: "Instagram" },
  { icon: "fa-brands fa-twitter", href: "https://twitter.com", label: "Twitter" },
  { icon: "fa-brands fa-youtube", href: "https://youtube.com", label: "YouTube" },
];

const trustItems = [
  { icon: "fa-solid fa-truck-fast", title: "Same-Day Delivery", sub: "Order before 8 PM" },
  { icon: "fa-solid fa-star", title: "4.8★ Rating", sub: "2.5 Lakh+ Reviews" },
  { icon: "fa-solid fa-shield-halved", title: "100% Secure", sub: "SSL Encrypted" },
  { icon: "fa-solid fa-rotate-left", title: "Easy Returns", sub: "Hassle-free policy" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-16">
      {/* Trust bar */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shrink-0"
                style={{ background: "var(--color-primary)" }}
              >
                <i className={t.icon}></i>
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-tight">{t.title}</p>
                <p className="text-xs text-gray-400 leading-tight mt-0.5">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-lg"
                style={{ background: "var(--color-primary)" }}
              >
                <i className="fa-solid fa-gift"></i>
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-poppins)" }}>
                Gift<span style={{ color: "var(--color-primary)" }}>Site</span>
              </span>
            </Link>
            <p className="text-gray-500 text-[13px] leading-relaxed max-w-sm">
              India&apos;s #1 Online Gift Store. Delivering smiles, love, and memories since 1994. 8 Million+ happy customers.
            </p>

            {/* Social */}
            <div className="flex gap-3 mb-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#e91e63] hover:text-white transition-colors"
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>


          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-bold text-sm mb-5 tracking-wide">{heading}</h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-gray-400 hover:text-[#e91e63] transition-colors hover:translate-x-1 inline-block"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-gray-500">© {new Date().getFullYear()} GiftSite. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-500 text-2xl">
            <i className="fa-brands fa-cc-visa opacity-50 hover:opacity-100 transition-opacity cursor-pointer"></i>
            <i className="fa-brands fa-cc-mastercard opacity-50 hover:opacity-100 transition-opacity cursor-pointer"></i>
            <i className="fa-brands fa-cc-paypal opacity-50 hover:opacity-100 transition-opacity cursor-pointer"></i>
            <i className="fa-brands fa-cc-amex opacity-50 hover:opacity-100 transition-opacity cursor-pointer"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
