import React, { useEffect } from 'react';
import { LOGO_URL } from '../data/mockData';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: string;
  onNavigate: (screen: string) => void;
  favoritesCount: number;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  currentScreen,
  onNavigate,
  favoritesCount,
}) => {
  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navItems = [
    {
      id: 'home',
      label: 'الرئيسية',
      icon: 'home',
      fill: true,
    },
    {
      id: 'explore',
      label: 'استكشف العقارات',
      icon: 'explore',
      fill: false,
    },
    {
      id: 'map',
      label: 'الخريطة التفاعلية',
      icon: 'map',
      fill: false,
    },
    {
      id: 'favorites',
      label: 'عقاراتي المفضلة',
      icon: 'favorite',
      badge: favoritesCount > 0 ? favoritesCount : undefined,
      fill: false,
    },
    {
      id: 'add-property',
      label: 'أضف عقارك',
      icon: 'add_box',
      fill: false,
    },
    {
      id: 'profile',
      label: 'الملف الشخصي',
      icon: 'account_circle',
      fill: false,
    },
  ];

  const secondaryItems = [
    {
      id: 'about',
      label: 'عن سكاي لاند',
      icon: 'info',
    },
    {
      id: 'admin-dashboard',
      label: 'لوحة الإدارة',
      icon: 'admin_panel_settings',
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[#1c1b1b]/60 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Side Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-[290px] max-w-[85vw] bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#e5e2e1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img alt="Sky Land Logo" className="h-9 w-auto" src={LOGO_URL} />
            <span className="text-xl font-bold text-[#7e5700] font-['IBM_Plex_Sans_Arabic']">
              سكاي لاند
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#514532] hover:bg-[#e5e2e1]/50 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-6 py-3.5 text-right transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ffb300]/15 text-[#7e5700] font-bold border-r-4 border-[#7e5700]'
                    : 'text-[#1c1b1b] hover:bg-[#ffb300]/10 hover:translate-x-[-4px]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: item.fill || isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="bg-[#ffb300] text-[#281900] text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="border-t border-[#e5e2e1] my-3 mx-6" />

          {secondaryItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-4 px-6 py-3.5 text-right transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ffb300]/15 text-[#7e5700] font-bold border-r-4 border-[#7e5700]'
                    : 'text-[#1c1b1b] hover:bg-[#ffb300]/10 hover:translate-x-[-4px]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer info in drawer */}
        <div className="p-5 bg-[#f6f3f2] text-center border-t border-[#e5e2e1]">
          <p className="text-xs font-semibold text-[#514532]">
            © 2024 سكاي لاند العقارية
          </p>
          <p className="text-[10px] text-[#847560] mt-1">
            طرطوس - شارع الثورة | سوريا
          </p>
        </div>
      </aside>
    </>
  );
};
