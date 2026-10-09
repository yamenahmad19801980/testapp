import React from 'react';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-[0_-4px_16px_rgba(13,27,42,0.08)] border-t border-[#e5e2e1] px-4 py-1.5 flex justify-around items-center md:hidden">
      {/* Home */}
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
          currentScreen === 'home'
            ? 'text-[#7e5700] bg-[#ffb300]/15 font-bold scale-100'
            : 'text-[#514532] opacity-75 hover:opacity-100'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{ fontVariationSettings: currentScreen === 'home' ? "'FILL' 1" : "'FILL' 0" }}
        >
          home
        </span>
        <span className="text-[11px] mt-0.5">الرئيسية</span>
      </button>

      {/* Explore */}
      <button
        onClick={() => onNavigate('explore')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
          currentScreen === 'explore'
            ? 'text-[#7e5700] bg-[#ffb300]/15 font-bold scale-100'
            : 'text-[#514532] opacity-75 hover:opacity-100'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{ fontVariationSettings: currentScreen === 'explore' ? "'FILL' 1" : "'FILL' 0" }}
        >
          explore
        </span>
        <span className="text-[11px] mt-0.5">استكشف</span>
      </button>

      {/* Map */}
      <button
        onClick={() => onNavigate('map')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
          currentScreen === 'map'
            ? 'text-[#7e5700] bg-[#ffb300]/15 font-bold scale-100'
            : 'text-[#514532] opacity-75 hover:opacity-100'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{ fontVariationSettings: currentScreen === 'map' ? "'FILL' 1" : "'FILL' 0" }}
        >
          map
        </span>
        <span className="text-[11px] mt-0.5">الخريطة</span>
      </button>

      {/* Add */}
      <button
        onClick={() => onNavigate('add-property')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
          currentScreen === 'add-property'
            ? 'text-[#7e5700] bg-[#ffb300]/15 font-bold scale-100'
            : 'text-[#514532] opacity-75 hover:opacity-100'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{ fontVariationSettings: currentScreen === 'add-property' ? "'FILL' 1" : "'FILL' 0" }}
        >
          add_circle
        </span>
        <span className="text-[11px] mt-0.5">أضف</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
          currentScreen === 'profile'
            ? 'text-[#7e5700] bg-[#ffb300]/15 font-bold scale-100'
            : 'text-[#514532] opacity-75 hover:opacity-100'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{ fontVariationSettings: currentScreen === 'profile' ? "'FILL' 1" : "'FILL' 0" }}
        >
          person
        </span>
        <span className="text-[11px] mt-0.5">حسابي</span>
      </button>
    </nav>
  );
};
