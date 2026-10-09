import React, { useState } from 'react';
import { Property, LOCATIONS_LIST } from '../data/mockData';

interface HomeScreenProps {
  properties: Property[];
  onNavigate: (screen: string) => void;
  onSelectProperty: (property: Property) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  currency: 'SYP' | 'USD';
  onFilterByCity?: (city: string) => void;
  onFilterByType?: (type: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  properties,
  onNavigate,
  onSelectProperty,
  favorites,
  onToggleFavorite,
  currency,
  onFilterByCity,
  onFilterByType,
}) => {
  const [purposeTab, setPurposeTab] = useState<'بيع' | 'إيجار'>('بيع');
  const [searchType, setSearchType] = useState<string>('الكل');
  const [searchCity, setSearchCity] = useState<string>('الكل');

  const featuredProperties = properties.filter((p) => p.featured || p.status === 'متاح');

  const formatPrice = (p: Property) => {
    if (currency === 'USD') {
      return `$${p.priceUSD.toLocaleString()}`;
    }
    return `${p.priceSYP.toLocaleString()} ل.س`;
  };

  const handleSearchSubmit = () => {
    if (onFilterByCity && searchCity !== 'الكل') {
      onFilterByCity(searchCity);
    }
    if (onFilterByType && searchType !== 'الكل') {
      onFilterByType(searchType);
    }
    onNavigate('explore');
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b]">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[580px] max-h-[760px] w-full overflow-hidden flex items-center justify-center">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-105"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA1P4jaiNs7G-tfWfmXImDtZEIW08Xh6jcMU3BfrjSwTjfmKtT4k0i7nTnDcq1rVxtHaFlJxc01Ty3z6f2t_-n6M2Qw8rhAVBNcwxkifF3qO026QM3tabolnr60PeqaLKeYyU1bkduLgak-mID1YSJpLc_iHladhIwqguhLPs2V5arIzRNvhE_I25Vq2dIteA5PBMocSU9WJZ6-_oCVuGy6pXBof8pp35FoIuARjtjxmq34Y597Sq6KDf2LXjqfK_K8R9KFUQUsmxwm')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b]/90 via-[#1c1b1b]/50 to-[#1c1b1b]/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-[#ffb300]/25 backdrop-blur-md text-[#ffdeac] px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-[#ffb300]/30 shadow-xs">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>بوابتك الأولى للعقارات الفاخرة في طرطوس وسوريا</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md tracking-tight leading-tight max-w-4xl font-['IBM_Plex_Sans_Arabic']">
            ابحث عن عقارك المناسب بسهولة
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#f0edec] max-w-2xl mb-8 drop-shadow-sm leading-relaxed">
            عقارات للبيع والإيجار في مكان واحد، مع معلومات واضحة، صور حقيقية، وموقع العقار على الخريطة.
          </p>

          {/* Quick Search Box (Bento Style) */}
          <div className="w-full max-w-3xl bg-white p-4 md:p-6 rounded-2xl shadow-2xl border border-white/60 flex flex-col gap-4 text-right">
            {/* Sale / Rent Toggle */}
            <div className="flex gap-2 p-1 bg-[#f0edec] rounded-xl">
              <button
                type="button"
                onClick={() => setPurposeTab('بيع')}
                className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                  purposeTab === 'بيع'
                    ? 'bg-[#7e5700] text-white shadow-xs'
                    : 'text-[#514532] hover:text-[#1c1b1b]'
                }`}
              >
                بيع
              </button>
              <button
                type="button"
                onClick={() => setPurposeTab('إيجار')}
                className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                  purposeTab === 'إيجار'
                    ? 'bg-[#7e5700] text-white shadow-xs'
                    : 'text-[#514532] hover:text-[#1c1b1b]'
                }`}
              >
                إيجار
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Type Select */}
              <div className="relative">
                <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#847560] pointer-events-none">
                  home_work
                </span>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full pr-11 pl-4 py-3 rounded-xl border border-[#d6c4ac] bg-[#f6f3f2] focus:bg-white focus:ring-2 focus:ring-[#ffb300] focus:border-[#7e5700] text-sm text-[#1c1b1b] outline-none cursor-pointer appearance-none"
                >
                  <option value="الكل">نوع العقار (الكل)</option>
                  <option value="شقة">شقة</option>
                  <option value="فيلا">فيلا</option>
                  <option value="أرض">أرض</option>
                  <option value="مكتب">مكتب تجاري</option>
                  <option value="شاليه">شاليه</option>
                </select>
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#847560] pointer-events-none">
                  expand_more
                </span>
              </div>

              {/* City Select */}
              <div className="relative">
                <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#847560] pointer-events-none">
                  location_on
                </span>
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full pr-11 pl-4 py-3 rounded-xl border border-[#d6c4ac] bg-[#f6f3f2] focus:bg-white focus:ring-2 focus:ring-[#ffb300] focus:border-[#7e5700] text-sm text-[#1c1b1b] outline-none cursor-pointer appearance-none"
                >
                  <option value="الكل">المحافظة / المدينة</option>
                  <option value="طرطوس">طرطوس</option>
                  <option value="دمشق">دمشق</option>
                  <option value="صافيتا">صافيتا</option>
                  <option value="الدريكيش">الدريكيش</option>
                  <option value="الشيخ بدر">الشيخ بدر</option>
                  <option value="القدموس">القدموس</option>
                  <option value="حلب">حلب</option>
                </select>
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#847560] pointer-events-none">
                  expand_more
                </span>
              </div>

              {/* Search Button */}
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="bg-[#ffb300] text-[#281900] hover:bg-[#fb7800] hover:text-white py-3 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">search</span>
                <span>بحث</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Strip */}
      <section className="-mt-7 relative z-20 px-4 md:px-12 max-w-[1280px] mx-auto overflow-x-auto no-scrollbar">
        <div className="flex gap-3 pb-3 justify-start md:justify-center">
          {[
            { label: 'شقق', icon: 'apartment', type: 'شقة' },
            { label: 'أراضي', icon: 'landscape', type: 'أرض' },
            { label: 'محلات', icon: 'store', type: 'مكتب' },
            { label: 'فيلات', icon: 'villa', type: 'فيلا' },
            { label: 'مكاتب', icon: 'business_center', type: 'مكتب' },
          ].map((cat) => (
            <button
              key={cat.label}
              onClick={() => {
                if (onFilterByType) onFilterByType(cat.type);
                onNavigate('explore');
              }}
              className="flex items-center gap-2.5 px-6 py-3 bg-white shadow-md rounded-full whitespace-nowrap border border-[#d6c4ac]/40 hover:border-[#7e5700] hover:text-[#7e5700] active:scale-95 transition-all text-sm font-semibold text-[#1c1b1b] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#7e5700] text-xl">
                {cat.icon}
              </span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Properties Slider */}
      <section className="py-12 px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#ffb300]">star</span>
              <span className="text-xs font-bold text-[#7e5700] uppercase tracking-wider">
                مختارات مميزة
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1c1b1b]">
              عقارات مميزة
            </h2>
            <div className="h-1 w-16 bg-[#ffb300] mt-1.5 rounded-full" />
          </div>

          <button
            onClick={() => onNavigate('explore')}
            className="text-[#7e5700] hover:text-[#994700] font-bold text-sm flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>عرض الكل</span>
            <span className="material-symbols-outlined text-base">chevron_left</span>
          </button>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 snap-x -mx-4 px-4 md:mx-0 md:px-0">
          {featuredProperties.slice(0, 5).map((property) => {
            const isFav = favorites.includes(property.id);
            return (
              <div
                key={property.id}
                onClick={() => {
                  onSelectProperty(property);
                  onNavigate('property-detail');
                }}
                className="min-w-[300px] md:min-w-[360px] max-w-[380px] bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden snap-start border border-[#e5e2e1] group cursor-pointer flex flex-col"
              >
                {/* Photo container */}
                <div className="relative h-60 w-full overflow-hidden bg-[#e5e2e1]">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex gap-2">
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

                  {/* Favorite button */}
                  <button
                    onClick={(e) => onToggleFavorite(property.id, e)}
                    className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1c1b1b] hover:text-[#ba1a1a] transition-colors shadow-sm cursor-pointer"
                  >
                    <span
                      className={`material-symbols-outlined text-xl ${
                        isFav ? 'text-[#ba1a1a] material-symbols-filled' : ''
                      }`}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Price Tag Floating Overlay */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-[#7e5700] px-3.5 py-1.5 rounded-xl font-bold text-sm shadow-md border border-[#ffb300]/30">
                    {formatPrice(property)}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-[#1c1b1b] line-clamp-1 mb-1.5 group-hover:text-[#7e5700] transition-colors">
                      {property.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-[#514532] mb-4">
                      <span className="material-symbols-outlined text-base text-[#7e5700]">
                        location_on
                      </span>
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="flex justify-between items-center py-2.5 border-t border-[#f0edec] text-xs text-[#514532]">
                    {property.beds > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base text-[#7e5700]">
                          bed
                        </span>
                        <span>{property.beds} غرف</span>
                      </div>
                    )}
                    {property.baths > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base text-[#7e5700]">
                          bathtub
                        </span>
                        <span>{property.baths} حمام</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base text-[#7e5700]">
                        square_foot
                      </span>
                      <span>{property.area} م²</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Browse by Type Grid */}
      <section className="py-14 bg-[#f6f3f2] px-4 md:px-12 border-y border-[#e5e2e1]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1c1b1b] mb-2">
              تصفح حسب نوع العقار
            </h2>
            <p className="text-sm md:text-base text-[#514532]">
              اختر الفئة التي تبحث عنها لاستعراض أفضل الخيارات
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'شقق', icon: 'apartment', count: '140+ عقار', type: 'شقة' },
              { label: 'أراضي', icon: 'landscape', count: '80+ عقار', type: 'أرض' },
              { label: 'فيلات', icon: 'villa', count: '45+ عقار', type: 'فيلا' },
              { label: 'محلات', icon: 'store', count: '60+ عقار', type: 'مكتب' },
            ].map((item) => (
              <div
                key={item.label}
                onClick={() => {
                  if (onFilterByType) onFilterByType(item.type);
                  onNavigate('explore');
                }}
                className="bg-white p-6 rounded-2xl shadow-xs hover:shadow-md transition-all text-center group cursor-pointer border border-transparent hover:border-[#ffba38] hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-[#ffdeac]/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#ffb300] transition-colors">
                  <span className="material-symbols-outlined text-[#7e5700] group-hover:text-white text-3xl transition-colors">
                    {item.icon}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-[#1c1b1b] mb-1">{item.label}</h3>
                <span className="text-xs text-[#514532] opacity-80">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Location */}
      <section className="py-14 px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1c1b1b]">
              استكشف حسب الموقع
            </h2>
            <p className="text-sm text-[#514532] mt-1">
              مشاريع وعقارات في أبرز مدن ومصايف الساحل السوري
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {LOCATIONS_LIST.map((loc) => (
            <div
              key={loc.id}
              onClick={() => {
                if (onFilterByCity) onFilterByCity(loc.cityQuery);
                onNavigate('explore');
              }}
              className="relative h-52 rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${loc.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b]/90 via-[#1c1b1b]/40 to-transparent" />
              <div className="absolute bottom-4 right-4 text-white z-10 text-right">
                <h3 className="text-xl font-bold drop-shadow-sm mb-1">{loc.name}</h3>
                <p className="text-xs text-[#ffdeac] font-medium">{loc.count}</p>
              </div>
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Discovery Section */}
      <section className="py-10 px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#d6c4ac]/30 flex flex-col md:flex-row">
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center text-right">
            <div className="inline-flex items-center gap-2 text-[#7e5700] text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-base">map</span>
              <span>خريطة ذكية تفاعلية</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1c1b1b] mb-4">
              اكتشف العقارات على الخريطة
            </h2>
            <p className="text-[#514532] text-sm md:text-base mb-8 leading-relaxed">
              شاهد جميع العقارات المتاحة حولك أو في أي منطقة تختارها بدقة عالية، مع إمكانية التصفية المباشرة ومعاينة الأسعار في الوقت الفعلي.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('map')}
                className="bg-[#7e5700] text-white py-3.5 px-8 rounded-xl font-bold text-sm hover:bg-[#994700] transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">explore</span>
                <span>استعرض جميع العقارات على الخريطة</span>
              </button>
            </div>
          </div>

          <div
            className="h-64 md:h-auto md:w-1/2 relative bg-cover bg-center cursor-pointer min-h-[280px]"
            onClick={() => onNavigate('map')}
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJI92EeNaFujE_Qrm09OxypK-RMcRii6EeG3JYb6imrxfOxydVKjISHBgcqiaEgtcihhMwvtgIsc0-BnTIaCL9jPENhGP9Hx7GDFHj7zTsobhBUFYy0AXNimnl2-ApZo5ptFlBxqIOaXS6CKxHhxRKN1hfDl_4b3aaq4aMlqPE0DW05bX7uaOYnI1T1speL033CsP24hpgM001fgWn5nbKkCG-ETpBZDMeD5YD2KKfSbterMU5ukdRhNB_X2r64cWXxcMRli0i2PKS')`,
            }}
          >
            <div className="absolute inset-0 bg-[#7e5700]/10 hover:bg-transparent transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white/95 text-[#7e5700] px-5 py-2.5 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined">zoom_in</span>
                <span>فتح الخريطة التفاعلية</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sky Land */}
      <section className="py-14 px-4 md:px-12 max-w-[1280px] mx-auto relative overflow-hidden">
        <div className="blueprint-pattern absolute inset-0 pointer-events-none opacity-50" />
        <div className="relative z-10 text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1c1b1b] mb-2">
            لماذا سكاي لاند؟
          </h2>
          <p className="text-sm md:text-base text-[#514532]">
            نحن نجمع بين الخبرة الهندسية وسوق العقارات لضمان أفضل استثمار
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center border-b-4 border-[#7e5700] transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-[#ffb300]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[#7e5700] text-3xl material-symbols-filled">
                verified
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#1c1b1b] mb-3">عقارات موثوقة</h3>
            <p className="text-sm text-[#514532] leading-relaxed">
              جميع العقارات المدرجة تمر بعملية تدقيق هندسي وقانوني صارمة لضمان المصداقية التامة والسلامة الإنشائية.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm text-center border-b-4 border-[#7e5700] transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-[#ffb300]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[#7e5700] text-3xl material-symbols-filled">
                forum
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#1c1b1b] mb-3">تواصل مباشر</h3>
            <p className="text-sm text-[#514532] leading-relaxed">
              نربطك مباشرة بصاحب العقار أو مكتبنا الهندسي المعتمد دون تعقيدات وبشفافية مطلقة في كافة الرسوم.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm text-center border-b-4 border-[#7e5700] transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-[#ffb300]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[#7e5700] text-3xl material-symbols-filled">
                engineering
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#1c1b1b] mb-3">خدمات هندسية</h3>
            <p className="text-sm text-[#514532] leading-relaxed">
              نقدم استشارات هندسية، إكساء داخلي، وتقييمات فنية متخصصة قبل قرار الشراء أو البدء في أي مشروع تطوير.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-10 px-4 md:px-12 max-w-[1280px] mx-auto mb-10">
        <div className="bg-[#1c1b1b] text-white rounded-3xl p-8 md:p-14 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 font-['IBM_Plex_Sans_Arabic']">
              هل لديك عقار للبيع أو الإيجار؟
            </h2>
            <p className="text-sm md:text-base text-[#e5e2e1] mb-8 max-w-2xl mx-auto leading-relaxed">
              انضم إلى آلاف المستخدمين واعرض عقارك اليوم ليصل إلى أكبر قاعدة من المهتمين والمستثمرين في سوريا وخارجها.
            </p>
            <button
              onClick={() => onNavigate('add-property')}
              className="bg-[#fb7800] text-white py-4 px-10 rounded-xl font-bold text-base hover:bg-[#ffb300] hover:text-[#281900] transition-all shadow-lg flex items-center gap-2 mx-auto active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">add_circle</span>
              <span>أضف عقارك الآن</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1c1b1b] text-white w-full border-t border-white/10">
        <div className="flex flex-col items-center text-center py-12 px-4 md:px-12 w-full max-w-[1280px] mx-auto">
          <div className="text-2xl md:text-3xl font-black text-[#ffdeac] mb-6 tracking-wider">
            SKY LAND
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full mb-10 border-b border-white/10 pb-10 text-xs md:text-sm">
            <button
              onClick={() => {
                if (onFilterByType) onFilterByType('الكل');
                onNavigate('explore');
              }}
              className="text-[#e5e2e1]/70 hover:text-[#ffdeac] transition-colors cursor-pointer"
            >
              عقارات للبيع
            </button>
            <button
              onClick={() => {
                if (onFilterByType) onFilterByType('الكل');
                onNavigate('explore');
              }}
              className="text-[#e5e2e1]/70 hover:text-[#ffdeac] transition-colors cursor-pointer"
            >
              عقارات للإيجار
            </button>
            <button
              onClick={() => onNavigate('add-property')}
              className="text-[#e5e2e1]/70 hover:text-[#ffdeac] transition-colors cursor-pointer"
            >
              بيع عقارك
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="text-[#e5e2e1]/70 hover:text-[#ffdeac] transition-colors cursor-pointer"
            >
              اتصل بنا
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="text-[#e5e2e1]/70 hover:text-[#ffdeac] transition-colors cursor-pointer"
            >
              سياسة الخصوصية
            </button>
          </div>

          <p className="text-xs text-[#e5e2e1]/50">
            © 2024 Sky Land Real Estate. BUILD YOUR DREAMS FROM LAND TO SKY
          </p>
        </div>
      </footer>
    </div>
  );
};
