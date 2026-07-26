"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface Toast {
  id: number;
  message: string;
}

interface ToastContextType {
  addToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[99999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="bg-gray-900 text-white px-5 py-3.5 rounded-xl shadow-2xl transition-all duration-300 transform animate-pop flex items-center gap-3 border border-gray-700 min-w-[250px]">
            <i className="fa-solid fa-circle-check text-green-400 text-lg"></i>
            <span className="font-semibold text-sm tracking-wide">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
