"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<{name: string, email: string} | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("giftsite_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {}
    }
  }, []);

  const navItems = [
    { name: "My Orders", path: "/profile/orders", icon: "fa-solid fa-box" },
    { name: "Saved Items", path: "/profile/saved", icon: "fa-regular fa-heart" },
    { name: "My Addresses", path: "/profile/addresses", icon: "fa-regular fa-address-book" },
    { name: "Settings", path: "/profile/settings", icon: "fa-solid fa-gear" },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <i className="fa-solid fa-lock text-4xl text-gray-300 mb-4"></i>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Please login to view your profile</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#e91e63] to-pink-400 flex items-center justify-center text-white font-bold text-xl uppercase shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                {navItems.map(item => {
                  const isActive = pathname.startsWith(item.path);
                  return (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${isActive ? 'bg-[#e91e63] text-white shadow-md' : 'text-gray-600 hover:bg-pink-50 hover:text-[#e91e63]'}`}
                    >
                      <i className={`${item.icon} w-5 text-center transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}></i>
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 min-h-[500px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
