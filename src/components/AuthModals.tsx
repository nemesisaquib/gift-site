"use client";

import { useState, useEffect, useRef } from "react";

interface AuthModalsProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: "login" | "signup";
}

export default function AuthModals({ isOpen, onClose, defaultType = "login" }: AuthModalsProps) {
  const [type, setType] = useState<"login" | "signup">(defaultType);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setType(defaultType);
    setIsLoading(false);
  }, [defaultType, isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;

    setTimeout(() => {
      setIsLoading(false);
      
      if (type === "login") {
        if (email === "user@giftsite.com" && password === "password123") {
          localStorage.setItem("giftsite_user", JSON.stringify({ name: "Demo User", email }));
          window.location.reload();
        } else {
          setError("Invalid email or password. Use user@giftsite.com / password123");
        }
      } else {
        // Signup success simulation
        localStorage.setItem("giftsite_user", JSON.stringify({ name: fullName || "New User", email }));
        window.location.reload();
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient banner */}
        <div
          className="h-28 flex items-center justify-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #e91e63 0%, #c2185b 100%)" }}
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }}></div>
          <div className="relative text-center text-white">
            <i className="fa-solid fa-gift text-4xl mb-1"></i>
            <p className="font-bold text-xl" style={{ fontFamily: "var(--font-poppins)" }}>GiftSite</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-7">
          {/* Tab switcher */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all duration-200 ${
                  type === t
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2 border border-red-100 animate-shake">
                <i className="fa-solid fa-circle-exclamation"></i> {error}
              </div>
            )}
            
            {type === "signup" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <i className="fa-regular fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                  <input
                    type="text"
                    name="fullName"
                    required
                    className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-[#e91e63]/20 transition-all bg-gray-50 focus:bg-white"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <i className="fa-regular fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-[#e91e63]/20 transition-all bg-gray-50 focus:bg-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                {type === "login" && (
                  <a href="#" className="text-xs font-semibold text-[#e91e63] hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  required
                  className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-10 text-sm outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-[#e91e63]/20 transition-all bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className={`fa-regular ${showPass ? "fa-eye-slash" : "fa-eye"} text-sm`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white font-bold py-3.5 rounded-xl text-sm transition-all hover:opacity-90 disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg mt-2"
              style={{ background: "var(--color-primary)" }}
            >
              {isLoading ? (
                <i className="fa-solid fa-circle-notch fa-spin"></i>
              ) : type === "login" ? (
                "Login Securely"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center my-4">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-xs text-gray-400 font-medium">or continue with</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                <i className="fa-brands fa-google text-red-500 text-base"></i> Google
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                <i className="fa-brands fa-facebook text-blue-600 text-base"></i> Facebook
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-5">
            {type === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setType(type === "login" ? "signup" : "login")}
              className="font-semibold text-[#e91e63] hover:underline"
            >
              {type === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
