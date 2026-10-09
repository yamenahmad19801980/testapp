import React, { useState, useMemo } from 'react';
import { Property } from '../data/mockData';

interface ExploreScreenProps {
  properties: Property[];
  onNavigate: (screen: string) => void;
  onSelectProperty: (property: Property) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  currency: 'SYP' | 'USD';
  initialCity?: string;
  initialType?: string;
  showOnlyFavorites?: boolean;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  properties,
  onNavigate,
  onSelectProperty,
  favorites,
  onToggleFavorite,
  currency,
  initialCity = 'الكل',
  initialType = 'الكل',
  showOnlyFavorites = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedPurpose, setSelectedPurpose] = useState<'الكل' | 'بيع' | 'إيجار'>('الكل');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [minBeds, setMinBeds] = useState<number>(0);
  const [onlyFavoritesMode, setOnlyFavoritesMode] = useState<boolean>(showOnlyFavorites);

  const activeChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];
    if (selectedPurpose !== 'الكل') {
      chips.push({
        label: selectedPurpose === 'بيع' ? 'للبيع' : 'للإيجار',
        onRemove: () => setSelectedPurpose('الكل'),
      });
    }
    if (selectedType !== 'الكل') {
      chips.push({
        label: selectedType,
        onRemove: () => setSelectedType('الكل'),
      });
    }
    if (selectedCity !== 'الكل') {
      chips.push({
        label: selectedCity,
        onRemove: () => setSelectedCity('الكل'),
      });
    }
    if (minBeds > 0) {
      chips.push({
        label: `${minBeds}+ غرف`,
        onRemove: () => setMinBeds(0),
      });
    }
    if (onlyFavoritesMode) {
      chips.push({
        label: 'المفضلة فقط',
        onRemove: () => setOnlyFavoritesMode(false),
      });
    }
    return chips;
  }, [selectedPurpose, selectedType, selectedCity, minBeds, onlyFavoritesMode]);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Don't show pending in standard public catalog unless viewing admin
      if (p.status === 'قيد المراجعة') return false;

      if (onlyFavoritesMode && !favorites.includes(p.id)) return false;

      if (selectedPurpose !== 'الكل' && p.purpose !== selectedPurpose) return false;
      if (selectedType !== 'الكل' && p.type !== selectedType) return false;
      if (selectedCity !== 'الكل' && p.city !== selectedCity) return false;
      if (minBeds > 0 && p.beds < minBeds) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesLocation = p.location.toLowerCase().includes(query);
        const matchesCity = p.city.toLowerCase().includes(query);
        const matchesId = p.id.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesCity && !matchesId) return false;
      }

      return true;
    });
  }, [properties, selectedPurpose, selectedType, selectedCity, minBeds, onlyFavoritesMode, favorites, searchQuery]);

  const formatPrice = (p: Property) => {
    if (currency === 'USD') {
      return `$${p.priceUSD.toLocaleString()}`;
    }
    return `${p.priceSYP.toLocaleString()} ل.س`;
  };

  const handleResetFilters = () => {
    setSelectedCity('الكل');
    setSelectedType('الكل');
    setSelectedPurpose('الكل');
    setMinBeds(0);
    setOnlyFavoritesMode(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] pb-28">
      {/* Top Bar for Results */}
      <div className="bg-white shadow-xs border-b border-[#e5e2e1] px-4 md:px-12 py-3.5 max-w-[1280px] mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f6f3f2] text-[#514532] cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-[#7e5700] font-['IBM_Plex_Sans_Arabic']">
              {onlyFavoritesMode ? 'عقاراتي المفضلة' : 'نتائج البحث واستكشاف العقارات'}
            </h1>
          </div>

          <div className="relative flex-1 max-w-md hidden sm:block">
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#847560] text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، المدينة، الحي، أو المعرف..."
              className="w-full pr-10 pl-8 py-2 rounded-xl border border-[#d6c4ac] text-xs bg-[#f6f3f2] focus:bg-white focus:ring-2 focus:ring-[#ffb300] outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#847560] hover:text-[#1c1b1b]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="relative w-full mt-3 sm:hidden">
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#847560] text-lg">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم، المدينة، الحي، أو المعرف..."
            className="w-full pr-10 pl-8 py-2.5 rounded-xl border border-[#d6c4ac] text-xs bg-[#f6f3f2] focus:bg-white focus:ring-2 focus:ring-[#ffb300] outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#847560]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter and stats row */}
      <section className="px-4 md:px-12 max-w-[1280px] mx-auto mt-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#514532]">تم العثور على</span>
            <span className="text-lg font-bold text-[#7e5700] px-2 py-0.5 bg-[#ffb300]/20 rounded-lg">
              {filteredProperties.length}
            </span>
            <span className="text-sm text-[#514532]">عقار</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#d6c4ac] hover:border-[#7e5700] rounded-xl text-xs font-bold text-[#1c1b1b] shadow-xs hover:bg-[#ffb300]/10 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#7e5700] text-lg">tune</span>
              <span>فلترة متقدمة</span>
            </button>

            <div className="flex bg-white rounded-xl p-1 border border-[#d6c4ac] shadow-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#ffb300]/30 text-[#7e5700]'
                    : 'text-[#514532] hover:bg-[#f6f3f2]'
                }`}
                title="عرض شبكي"
              >
                <span className="material-symbols-outlined text-lg">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#ffb300]/30 text-[#7e5700]'
                    : 'text-[#514532] hover:bg-[#f6f3f2]'
                }`}
                title="عرض قائمة"
              >
                <span className="material-symbols-outlined text-lg">view_list</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar items-center">
          {/* Quick city filter chips */}
          {['الكل', 'طرطوس', 'صافيتا', 'الدريكيش', 'الشيخ بدر', 'القدموس', 'دمشق'].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCity === city
                  ? 'bg-[#7e5700] text-white shadow-xs'
                  : 'bg-white border border-[#d6c4ac] text-[#514532] hover:border-[#7e5700]'
              }`}
            >
              {city === 'الكل' ? 'جميع المدن' : city}
            </button>
          ))}

          {activeChips.length > 0 && (
            <button
              onClick={handleResetFilters}
              className="text-[#7e5700] font-bold text-xs underline px-3 whitespace-nowrap cursor-pointer hover:text-[#994700]"
            >
              مسح الكل
            </button>
          )}
        </div>

        {/* Active badges */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center pt-1 border-t border-[#e5e2e1]">
            <span className="text-xs text-[#847560] font-medium">الفلاتر المطبقة:</span>
            {activeChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffb300]/15 text-[#7e5700] border border-[#ffb300]/30 rounded-full text-xs font-semibold"
              >
                <span>{chip.label}</span>
                <button
                  onClick={chip.onRemove}
                  className="hover:text-[#ba1a1a] cursor-pointer text-xs"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Property Cards */}
      <main className="px-4 md:px-12 max-w-[1280px] mx-auto mt-6">
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#e5e2e1] my-8 shadow-xs max-w-lg mx-auto">
            <div className="w-16 h-16 bg-[#ffb300]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#7e5700]">
              <span className="material-symbols-outlined text-3xl">search_off</span>
            </div>
            <h3 className="text-lg font-bold text-[#1c1b1b] mb-2">لا توجد نتائج مطابقة</h3>
            <p className="text-sm text-[#514532] mb-6">
              جرّب تغيير خيارات البحث أو إزالة بعض الفلاتر لعرض عقارات أخرى متاحة.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-[#7e5700] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#994700] transition-colors cursor-pointer"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => {
              const isFav = favorites.includes(property.id);
              return (
                <article
                  key={property.id}
                  onClick={() => {
                    onSelectProperty(property);
                    onNavigate('property-detail');
                  }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-[#e5e2e1] group cursor-pointer flex flex-col"
                >
                  <div className="relative h-64 w-full bg-[#e5e2e1] overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                      {property.featured && (
                        <span className="bg-[#ffb300] text-[#281900] px-3 py-1 rounded-lg text-xs font-bold shadow-xs">
                          مميز
                        </span>
                      )}
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold text-white shadow-xs ${
                          property.purpose === 'بيع' ? 'bg-[#994700]' : 'bg-[#525f71]'
                        }`}
                      >
                        {property.purpose === 'بيع' ? 'للبيع' : 'للإيجار'}
                      </span>
                    </div>

                    <button
                      onClick={(e) => onToggleFavorite(property.id, e)}
                      className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1c1b1b] hover:text-[#ba1a1a] transition-colors shadow-sm cursor-pointer z-10"
                    >
                      <span
                        className={`material-symbols-outlined text-xl ${
                          isFav ? 'text-[#ba1a1a] material-symbols-filled' : ''
                        }`}
                      >
                        favorite
                      </span>
                    </button>

                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-[#7e5700] px-4 py-1.5 rounded-xl font-bold text-base shadow-md border border-[#ffb300]/30">
                      {formatPrice(property)}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-2 mb-2">
                        <span className="bg-[#f0edec] text-[#514532] px-2 py-0.5 rounded text-[10px] font-bold">
                          {property.type}
                        </span>
                        {property.tags[0] && (
                          <span className="bg-[#ffb300]/15 text-[#7e5700] px-2 py-0.5 rounded text-[10px] font-bold">
                            {property.tags[0]}
                          </span>
                        )}
                      </div>

                      <h2 className="text-base font-bold text-[#1c1b1b] line-clamp-1 mb-1.5 group-hover:text-[#7e5700] transition-colors">
                        {property.title}
                      </h2>

                      <div className="flex items-center gap-1.5 text-xs text-[#514532] mb-4">
                        <span className="material-symbols-outlined text-base text-[#7e5700]">
                          location_on
                        </span>
                        <span className="line-clamp-1">{property.location}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-[#f0edec] text-xs text-[#514532]">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base text-[#7e5700]">
                          square_foot
                        </span>
                        <span>{property.area}م²</span>
                      </div>
                      {property.beds > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base text-[#7e5700]">
                            bed
                          </span>
                          <span>{property.beds}</span>
                        </div>
                      )}
                      {property.baths > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base text-[#7e5700]">
                            bathtub
                          </span>
                          <span>{property.baths}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* List Mode */
          <div className="space-y-4">
            {filteredProperties.map((property) => {
              const isFav = favorites.includes(property.id);
              return (
                <article
                  key={property.id}
                  onClick={() => {
                    onSelectProperty(property);
                    onNavigate('property-detail');
                  }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 border border-[#e5e2e1] group cursor-pointer flex flex-col sm:flex-row"
                >
                  <div className="relative sm:w-72 h-52 sm:h-auto shrink-0 bg-[#e5e2e1]">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      <span className="bg-[#994700] text-white px-2.5 py-0.5 rounded text-xs font-bold">
                        {property.purpose === 'بيع' ? 'للبيع' : 'للإيجار'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex gap-2 mb-1">
                            <span className="bg-[#f0edec] text-[#514532] px-2 py-0.5 rounded text-[10px] font-bold">
                              {property.type}
                            </span>
                            <span className="text-[10px] text-[#847560] font-mono">
                              #{property.id}
                            </span>
                          </div>
                          <h2 className="text-lg font-bold text-[#1c1b1b] group-hover:text-[#7e5700] transition-colors">
                            {property.title}
                          </h2>
                        </div>

                        <button
                          onClick={(e) => onToggleFavorite(property.id, e)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f6f3f2] text-[#1c1b1b]"
                        >
                          <span
                            className={`material-symbols-outlined text-lg ${
                              isFav ? 'text-[#ba1a1a] material-symbols-filled' : ''
                            }`}
                          >
                            favorite
                          </span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#514532] mt-2">
                        <span className="material-symbols-outlined text-base text-[#7e5700]">
                          location_on
                        </span>
                        <span>{property.location}</span>
                      </div>

                      <p className="text-xs text-[#514532] mt-2 line-clamp-2 leading-relaxed">
                        {property.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-between items-center pt-3 border-t border-[#f0edec] mt-4 gap-2">
                      <div className="flex items-center gap-4 text-xs text-[#514532]">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base text-[#7e5700]">
                            square_foot
                          </span>
                          {property.area} م²
                        </span>
                        {property.beds > 0 && (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base text-[#7e5700]">
                              bed
                            </span>
                            {property.beds} غرف
                          </span>
                        )}
                        {property.baths > 0 && (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base text-[#7e5700]">
                              bathtub
                            </span>
                            {property.baths} حمام
                          </span>
                        )}
                      </div>

                      <div className="text-base font-bold text-[#7e5700]">
                        {formatPrice(property)}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Action Button (Show Map) */}
      <button
        onClick={() => onNavigate('map')}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#1c1b1b] text-white px-6 py-3 rounded-full flex items-center gap-2.5 shadow-2xl z-40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#ffb300]/40"
      >
        <span className="material-symbols-outlined text-xl text-[#ffb300]">map</span>
        <span className="font-bold text-sm font-['IBM_Plex_Sans_Arabic']">عرض الخريطة</span>
      </button>

      {/* Advanced Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl text-right">
            <div className="flex justify-between items-center pb-4 border-b border-[#e5e2e1] mb-6">
              <h3 className="text-lg font-bold text-[#1c1b1b]">فلترة متقدمة للعقارات</h3>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f6f3f2] text-[#514532]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 text-sm">
              {/* Purpose */}
              <div>
                <label className="block font-bold text-xs text-[#514532] mb-2">
                  الهدف من العقار
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['الكل', 'بيع', 'إيجار'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPurpose(p)}
                      className={`py-2 rounded-xl text-xs font-bold transition-colors ${
                        selectedPurpose === p
                          ? 'bg-[#7e5700] text-white'
                          : 'bg-[#f6f3f2] text-[#514532] hover:bg-[#e5e2e1]'
                      }`}
                    >
                      {p === 'الكل' ? 'الكل' : p === 'بيع' ? 'للبيع' : 'للإيجار'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block font-bold text-xs text-[#514532] mb-2">
                  نوع العقار
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#d6c4ac] bg-white outline-none text-xs"
                >
                  <option value="الكل">جميع الأنواع</option>
                  <option value="شقة">شقة</option>
                  <option value="فيلا">فيلا</option>
                  <option value="أرض">أرض</option>
                  <option value="مكتب">مكتب تجاري</option>
                  <option value="شاليه">شاليه</option>
                  <option value="دوبلكس">دوبلكس</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block font-bold text-xs text-[#514532] mb-2">
                  المدينة أو المنطقة
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#d6c4ac] bg-white outline-none text-xs"
                >
                  <option value="الكل">جميع المدن والمناطق</option>
                  <option value="طرطوس">مدينة طرطوس وريفها</option>
                  <option value="صافيتا">صافيتا</option>
                  <option value="الدريكيش">الدريكيش</option>
                  <option value="الشيخ بدر">الشيخ بدر</option>
                  <option value="القدموس">القدموس</option>
                  <option value="دمشق">دمشق ويعفور</option>
                  <option value="حلب">حلب</option>
                </select>
              </div>

              {/* Minimum bedrooms */}
              <div>
                <label className="block font-bold text-xs text-[#514532] mb-2">
                  الحد الأدنى لعدد الغرف
                </label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setMinBeds(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                        minBeds === num
                          ? 'bg-[#ffb300] text-[#281900]'
                          : 'bg-[#f6f3f2] text-[#514532]'
                      }`}
                    >
                      {num === 0 ? 'الكل' : `${num}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Only favorites checkbox */}
              <label className="flex items-center gap-3 p-3 bg-[#f6f3f2] rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyFavoritesMode}
                  onChange={(e) => setOnlyFavoritesMode(e.target.checked)}
                  className="w-4 h-4 text-[#7e5700] rounded focus:ring-0"
                />
                <span className="font-semibold text-xs text-[#1c1b1b]">
                  إظهار العقارات المحفوظة في المفضلة فقط ({favorites.length})
                </span>
              </label>
            </div>

            <div className="flex gap-3 mt-8 pt-4 border-t border-[#e5e2e1]">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 rounded-xl border border-[#d6c4ac] text-xs font-bold text-[#514532] hover:bg-[#f6f3f2]"
              >
                إعادة ضبط
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-[#ffb300] text-[#281900] text-xs font-bold hover:bg-[#fb7800] hover:text-white transition-colors"
              >
                تطبيق الفلترة ({filteredProperties.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
