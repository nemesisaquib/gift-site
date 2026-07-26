"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [user, setUser] = useState<{name: string, email: string}>({ name: "", email: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [isPassSaving, setIsPassSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passSaved, setPassSaved] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("giftsite_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {}
    }
  }, []);

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("giftsite_user", JSON.stringify(user));
      setIsSaving(false);
      setSaved(true);
      window.dispatchEvent(new Event("storage")); // Trigger updates across tabs/components
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const handleUpdatePassword = () => {
    setIsPassSaving(true);
    setTimeout(() => {
      setIsPassSaving(false);
      setPassSaved(true);
      setTimeout(() => setPassSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">Account Settings</h2>
      <div className="max-w-xl space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
          <div className="relative">
            <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              value={user.name} 
              onChange={(e) => setUser({...user, name: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 text-sm focus:border-[#e91e63] focus:bg-white focus:ring-2 focus:ring-pink-50 outline-none transition-all" 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
          <div className="relative">
            <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="email" 
              value={user.email} 
              onChange={(e) => setUser({...user, email: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 text-sm focus:border-[#e91e63] focus:bg-white focus:ring-2 focus:ring-pink-50 outline-none transition-all" 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input type="tel" placeholder="+91 9876543210" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 text-sm focus:border-[#e91e63] focus:bg-white focus:ring-2 focus:ring-pink-50 outline-none transition-all" />
          </div>
        </div>
        <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
          <button 
            onClick={handleSaveProfile}
            disabled={isSaving || !user.name || !user.email}
            className="bg-[#e91e63] text-white px-8 py-3 rounded-xl font-bold shadow-md shadow-pink-200 hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSaving ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "Save Changes"}
          </button>
          {saved && <span className="text-sm font-bold text-green-500 animate-fade-in"><i className="fa-solid fa-circle-check"></i> Profile updated</span>}
        </div>

        <div className="pt-8 mt-2">
          <h3 className="text-lg font-bold text-gray-900 mb-5 font-poppins">Change Password</h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 text-sm focus:border-[#e91e63] focus:bg-white focus:ring-2 focus:ring-pink-50 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <i className="fa-solid fa-key absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-11 text-sm focus:border-[#e91e63] focus:bg-white focus:ring-2 focus:ring-pink-50 outline-none transition-all" />
              </div>
            </div>
            <div className="pt-2 flex items-center gap-4">
              <button 
                onClick={handleUpdatePassword}
                disabled={isPassSaving}
                className="text-[#e91e63] font-bold text-sm bg-pink-50 hover:bg-pink-100 border border-pink-100 px-6 py-2.5 rounded-xl transition-colors shadow-sm hover:shadow disabled:opacity-70"
              >
                {isPassSaving ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "Update Password"}
              </button>
              {passSaved && <span className="text-sm font-bold text-green-500 animate-fade-in"><i className="fa-solid fa-circle-check"></i> Password updated</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
