import React from 'react';
import { LOGO_URL } from '../data/mockData';

interface HeaderProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onToggleMenu: () => void;
  currency: 'SYP' | 'USD';
  onToggleCurrency: () => void;
  lang: 'AR' | 'EN';
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onToggleMenu,
  currency,
  onToggleCurrency,
  lang,
  onToggleLang,
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-md shadow-xs sticky top-0 z-50 border-b border-[#e5e2e1]/60">
      <div className="flex justify-between items-center w-full px-4 md:px-12 py-2.5 max-w-[1280px] mx-auto">
        {/* Right side in RTL: Menu and Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMenu}
            aria-label="القائمة"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#7e5700] hover:bg-[#ffb300]/15 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img
              alt="Sky Land"
              className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              src={LOGO_URL}
            />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-[#7e5700] tracking-tight leading-none font-['IBM_Plex_Sans_Arabic']">
                سكاي لاند
              </span>
              <span className="text-[10px] tracking-wider text-[#514532] font-semibold hidden sm:inline uppercase">
                Sky Land Real Estate
              </span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[#1c1b1b] font-medium text-sm">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors py-1 cursor-pointer ${
              currentScreen === 'home'
                ? 'text-[#7e5700] font-bold border-b-2 border-[#7e5700]'
                : 'text-[#514532] hover:text-[#7e5700]'
            }`}
          >
            الرئيسية
          </button>
          <button
            onClick={() => onNavigate('explore')}
            className={`transition-colors py-1 cursor-pointer ${
              currentScreen === 'explore'
                ? 'text-[#7e5700] font-bold border-b-2 border-[#7e5700]'
                : 'text-[#514532] hover:text-[#7e5700]'
            }`}
          >
            استكشف العقارات
          </button>
          <button
            onClick={() => onNavigate('map')}
            className={`transition-colors py-1 cursor-pointer ${
              currentScreen === 'map'
                ? 'text-[#7e5700] font-bold border-b-2 border-[#7e5700]'
                : 'text-[#514532] hover:text-[#7e5700]'
            }`}
          >
            الخريطة
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors py-1 cursor-pointer ${
              currentScreen === 'about'
                ? 'text-[#7e5700] font-bold border-b-2 border-[#7e5700]'
                : 'text-[#514532] hover:text-[#7e5700]'
            }`}
          >
            من نحن
          </button>
          <button
            onClick={() => onNavigate('admin-dashboard')}
            className={`transition-colors py-1 cursor-pointer ${
              currentScreen === 'admin-dashboard'
                ? 'text-[#7e5700] font-bold border-b-2 border-[#7e5700]'
                : 'text-[#514532] hover:text-[#7e5700]'
            }`}
          >
            لوحة الإدارة
          </button>
        </nav>

        {/* Left side in RTL: Tools and Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Toggle */}
          <button
            onClick={onToggleCurrency}
            title="تبديل العملة"
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[#d6c4ac] hover:border-[#7e5700] text-[#514532] hover:text-[#7e5700] transition-colors cursor-pointer bg-white"
          >
            {currency}
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            title="تغيير اللغة"
            className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-[#ffb300]/20 text-[#7e5700] hover:bg-[#ffb300]/30 transition-colors cursor-pointer"
          >
            {lang}
          </button>

          {/* Add property quick CTA button */}
          <button
            onClick={() => onNavigate('add-property')}
            className="hidden sm:flex items-center gap-1.5 bg-[#ffb300] text-[#281900] hover:bg-[#fb7800] hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add_box</span>
            <span>أضف عقارك</span>
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => onNavigate('profile')}
            title="الملف الشخصي"
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#ffb300]/40 hover:border-[#7e5700] transition-colors cursor-pointer shadow-xs"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXh3hh2bEFhLOWv7YS1KfwVT-HTe2GFBmCQbXc8ZKKmhBvGiXNycZLaTepckeUoi4--pr-S_k5mMkypYTT5I64DjvI8revJxJMaES9tSvUe5KpuX4ZMvoJRQM4VPqWQsT5atf3l8-brlOi-I1HJljwo1UjtVY8042AagU2HBSNeYcoUFWLX4Fwr7tZbLpSkaS519p7nrtXjUjg2zy7dDhyYUjUrBxeIzOS2wp75vquEjQleiJP-Ij6bQ-8-Eo96HWpSSKmzX-Colpc"
              alt="الملف الشخصي"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
