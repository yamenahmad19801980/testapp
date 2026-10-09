import React, { useState } from 'react';
import { Property } from '../data/mockData';

interface MapScreenProps {
  properties: Property[];
  onNavigate: (screen: string) => void;
  onSelectProperty: (property: Property) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  currency: 'SYP' | 'USD';
}

export const MapScreen: React.FC<MapScreenProps> = ({
  properties,
  onNavigate,
  onSelectProperty,
  favorites,
  onToggleFavorite,
  currency,
}) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(properties[0]?.id || 'SK-102');
  const [zoomLevel, setZoomLevel] = useState<number>(12);
  const [mapSearch, setMapSearch] = useState('');
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('الكل');

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) || properties[0];

  const formatPrice = (p: Property) => {
    if (currency === 'USD') {
      return `$${p.priceUSD.toLocaleString()}`;
    }
    return `${p.priceSYP.toLocaleString()} ل.س`;
  };

  // Pins plotted relative to Syrian coast region
  const pins = [
    { id: 'SL-2041', label: 'الكورنيش', top: '48%', right: '28%', city: 'طرطوس' },
    { id: 'SL-2043', label: 'صافيتا', top: '28%', right: '42%', city: 'صافيتا' },
    { id: 'SL-2042', label: 'دريكيش', top: '52%', right: '62%', city: 'الدريكيش' },
    { id: 'SL-1092', label: 'الشيخ بدر', top: '38%', right: '54%', city: 'الشيخ بدر' },
    { id: 'SK-102', label: 'يعفور / دمشق', top: '68%', right: '35%', city: 'دمشق' },
  ];

  return (
    <div className="relative h-[calc(100vh-65px)] w-full overflow-hidden bg-[#e5e3df] flex flex-col font-['IBM_Plex_Sans_Arabic']">
      {/* Search & Filter Bar Overlay */}
      <div className="absolute top-4 left-0 w-full px-4 z-20 flex flex-col gap-2.5 pointer-events-none">
        <div className="max-w-md w-full mx-auto pointer-events-auto">
          <div className="relative group shadow-xl rounded-2xl overflow-hidden">
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#514532]">
              search
            </span>
            <input
              type="text"
              value={mapSearch}
              onChange={(e) => setMapSearch(e.target.value)}
              placeholder="ابحث في طرطوس، الكورنيش، أو صافيتا..."
              className="w-full h-12 pr-12 pl-4 bg-white/95 backdrop-blur-md text-xs sm:text-sm text-[#1c1b1b] border-none outline-none focus:ring-2 focus:ring-[#ffb300]"
            />
            {mapSearch && (
              <button
                onClick={() => setMapSearch('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#514532]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Quick filter pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pointer-events-auto pb-1 max-w-xl mx-auto px-2">
          <button
            onClick={() => onNavigate('explore')}
            className="shrink-0 bg-[#7e5700] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-base">tune</span>
            <span>تصفية</span>
          </button>
          {['الكل', 'شقة', 'فيلا', 'مكتب', 'أرض'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTypeFilter(t)}
              className={`shrink-0 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-colors cursor-pointer ${
                activeTypeFilter === t
                  ? 'bg-[#ffb300] text-[#281900] font-bold'
                  : 'bg-white/90 text-[#1c1b1b] hover:bg-white border border-[#d6c4ac]/40'
              }`}
            >
              {t === 'الكل' ? 'جميع الأنواع' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Visual Surface */}
      <div className="relative flex-1 w-full h-full overflow-hidden select-none">
        {/* Map Background with Tartous / coastal styling */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-300"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJI92EeNaFujE_Qrm09OxypK-RMcRii6EeG3JYb6imrxfOxydVKjISHBgcqiaEgtcihhMwvtgIsc0-BnTIaCL9jPENhGP9Hx7GDFHj7zTsobhBUFYy0AXNimnl2-ApZo5ptFlBxqIOaXS6CKxHhxRKN1hfDl_4b3aaq4aMlqPE0DW05bX7uaOYnI1T1speL033CsP24hpgM001fgWn5nbKkCG-ETpBZDMeD5YD2KKfSbterMU5ukdRhNB_X2r64cWXxcMRli0i2PKS')`,
            filter: 'contrast(1.05) brightness(0.95)',
            transform: `scale(${zoomLevel / 12})`,
          }}
        />

        {/* Subtle Map Graticule Overlay */}
        <div className="absolute inset-0 bg-[#7e5700]/5 pointer-events-none" />

        {/* Simulated Map Pins */}
        {pins.map((pin) => {
          const isSelected = selectedProperty?.id === pin.id;
          return (
            <div
              key={pin.id}
              onClick={() => setSelectedPropertyId(pin.id)}
              style={{ top: pin.top, right: pin.right }}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform hover:scale-110 active:scale-95"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`px-3 py-1 rounded-full shadow-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-[#7e5700] text-white ring-4 ring-[#ffb300]'
                      : 'bg-[#fb7800] text-white hover:bg-[#ffb300] hover:text-[#281900]'
                  }`}
                >
                  <span>{pin.label}</span>
                </div>
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-md -mt-1 ${
                    isSelected ? 'bg-[#7e5700]' : 'bg-[#fb7800]'
                  }`}
                />
              </div>
            </div>
          );
        })}

        {/* City Cluster marker */}
        <div
          onClick={() => setSelectedPropertyId('SL-2041')}
          className="absolute top-[60%] right-[44%] z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-[#7e5700] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-2xl border-4 border-white/80 transition-transform group-hover:scale-110">
            12
          </div>
        </div>
      </div>

      {/* Map Control Buttons (Left Side) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        <div className="flex flex-col bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-[#d6c4ac]/40 overflow-hidden">
          <button
            onClick={() => setZoomLevel((prev) => Math.min(prev + 1, 16))}
            className="w-11 h-11 flex items-center justify-center text-[#1c1b1b] hover:bg-[#f6f3f2] active:bg-[#e5e2e1] transition-colors cursor-pointer"
            title="تكبير"
          >
            <span className="material-symbols-outlined text-xl">add</span>
          </button>
          <div className="h-[1px] bg-[#e5e2e1] w-7 mx-auto" />
          <button
            onClick={() => setZoomLevel((prev) => Math.max(prev - 1, 8))}
            className="w-11 h-11 flex items-center justify-center text-[#1c1b1b] hover:bg-[#f6f3f2] active:bg-[#e5e2e1] transition-colors cursor-pointer"
            title="تصغير"
          >
            <span className="material-symbols-outlined text-xl">remove</span>
          </button>
        </div>

        <button
          onClick={() => {
            setSelectedPropertyId('SL-2041');
            setZoomLevel(13);
          }}
          className="w-11 h-11 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-[#d6c4ac]/40 flex items-center justify-center text-[#7e5700] hover:bg-[#ffb300]/20 transition-colors cursor-pointer"
          title="موقعي في طرطوس"
        >
          <span className="material-symbols-outlined text-xl">my_location</span>
        </button>
      </div>

      {/* Switch to List View Floating Pill */}
      <button
        onClick={() => onNavigate('explore')}
        className="absolute left-4 bottom-44 sm:bottom-40 z-20 bg-[#1c1b1b] text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold hover:bg-black active:scale-95 transition-all cursor-pointer border border-[#ffb300]/40"
      >
        <span className="material-symbols-outlined text-lg">view_list</span>
        <span>عرض القائمة</span>
      </button>

      {/* Bottom Selected Property Preview Card */}
      {selectedProperty && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-30">
          <div
            onClick={() => {
              onSelectProperty(selectedProperty);
              onNavigate('property-detail');
            }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-row h-36 border border-[#ffb300]/40 cursor-pointer group hover:border-[#7e5700] transition-all"
          >
            {/* Thumbnail */}
            <div className="relative w-1/3 overflow-hidden bg-[#e5e2e1] shrink-0">
              <img
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-[#ffb300] text-[#281900] text-[10px] font-bold px-2 py-0.5 rounded-md">
                {selectedProperty.purpose === 'بيع' ? 'للبيع' : 'للإيجار'}
              </div>
            </div>

            {/* Info */}
            <div className="w-2/3 p-3.5 flex flex-col justify-between text-right">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm text-[#1c1b1b] line-clamp-1 group-hover:text-[#7e5700] transition-colors">
                    {selectedProperty.title}
                  </h3>
                  <button
                    onClick={(e) => onToggleFavorite(selectedProperty.id, e)}
                    className="text-[#514532] hover:text-[#ba1a1a] p-1"
                  >
                    <span
                      className={`material-symbols-outlined text-lg ${
                        favorites.includes(selectedProperty.id)
                          ? 'text-[#ba1a1a] material-symbols-filled'
                          : ''
                      }`}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <p className="text-[11px] text-[#514532] flex items-center gap-1 mt-1 line-clamp-1">
                  <span className="material-symbols-outlined text-sm text-[#7e5700]">
                    location_on
                  </span>
                  <span>{selectedProperty.location}</span>
                </p>
              </div>

              {/* Specs & Price */}
              <div className="flex items-center justify-between border-t border-[#f0edec] pt-2 mt-1">
                <div className="flex gap-2.5 text-[11px] text-[#514532]">
                  {selectedProperty.beds > 0 && (
                    <div className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-sm text-[#7e5700]">
                        bed
                      </span>
                      <span>{selectedProperty.beds}</span>
                    </div>
                  )}
                  {selectedProperty.baths > 0 && (
                    <div className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-sm text-[#7e5700]">
                        bathtub
                      </span>
                      <span>{selectedProperty.baths}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-sm text-[#7e5700]">
                      square_foot
                    </span>
                    <span>{selectedProperty.area}م²</span>
                  </div>
                </div>

                <div className="text-xs font-bold text-[#7e5700]">
                  {formatPrice(selectedProperty)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
