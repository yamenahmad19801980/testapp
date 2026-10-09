import React, { useState } from 'react';
import { Property } from '../data/mockData';

interface PropertyDetailScreenProps {
  property: Property;
  allProperties: Property[];
  onNavigate: (screen: string) => void;
  onSelectProperty: (property: Property) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  currency: 'SYP' | 'USD';
  onToggleCurrency: () => void;
}

export const PropertyDetailScreen: React.FC<PropertyDetailScreenProps> = ({
  property,
  allProperties,
  onNavigate,
  onSelectProperty,
  favorites,
  onToggleFavorite,
  currency,
  onToggleCurrency,
}) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('مرحباً، أود الاستفسار عن هذا العقار ومعرفة إمكانية المعاينة.');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const isFav = favorites.includes(property.id);

  const images = property.images && property.images.length > 0
    ? property.images
    : [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBhaey_WI2c_JH2f8HCAESb6ht9SYNqjqKghzkhyKB06SbGXh3a8EdfPYhHkJYCzh4s2DNy3vSnkNsZkXyrs17xpK8aJiI0taqGT1WueFTmogIIKL23PSgSDMHTR7RX-7ftCuy3pBhT70CfR6qzTCyakL2lJi4T_RtJguJMzVol0dKUm058PuACzSmIRyxy43MXrZ3b5rOq4mjmH_WEmP_ehzKt9cW_FWWSTT1OLzK687nEEYII4oqJF_11dsTpfY9cTmQ0En-gqCec'
      ];

  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  const formatPrice = (p: Property) => {
    if (currency === 'USD') {
      return `$${p.priceUSD.toLocaleString()}`;
    }
    return `${p.priceSYP.toLocaleString()} ل.س`;
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setIsInquiryModalOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] pb-32 font-['IBM_Plex_Sans_Arabic']">
      {/* Top action bar */}
      <div className="bg-white sticky top-0 z-40 border-b border-[#e5e2e1] px-4 md:px-12 py-3 flex items-center justify-between max-w-[1280px] mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('explore')}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f6f3f2] text-[#514532] cursor-pointer"
            title="رجوع"
          >
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
          <span className="text-sm font-bold text-[#7e5700]">تفاصيل العقار</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f6f3f2] text-[#514532] cursor-pointer"
            title="مشاركة العقار"
          >
            <span className="material-symbols-outlined text-xl">share</span>
          </button>
          <button
            onClick={(e) => onToggleFavorite(property.id, e)}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f6f3f2] text-[#514532] cursor-pointer"
            title="إضافة للمفضلة"
          >
            <span
              className={`material-symbols-outlined text-xl ${
                isFav ? 'text-[#ba1a1a] material-symbols-filled' : ''
              }`}
            >
              favorite
            </span>
          </button>
        </div>
      </div>

      <main className="max-w-[1280px] mx-auto">
        {/* Gallery Slider Section */}
        <section className="relative w-full h-[45vh] md:h-[65vh] overflow-hidden bg-[#1c1b1b] group">
          <img
            src={images[currentImageIdx]}
            alt={property.title}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Previous / Next buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#1c1b1b] flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>
              <button
                onClick={() => setCurrentImageIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#1c1b1b] flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </>
          )}

          {/* Photo count indicator */}
          <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20">
            <span className="material-symbols-outlined text-sm">photo_camera</span>
            <span>
              {currentImageIdx + 1} / {images.length > 1 ? images.length : 12}
            </span>
          </div>

          {/* Play Video tour button */}
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="absolute bottom-6 left-6 flex items-center gap-2 bg-[#ffb300] hover:bg-[#fb7800] text-[#281900] hover:text-white px-4 py-2 rounded-full font-bold text-xs shadow-xl active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">play_circle</span>
            <span>جولة فيديو</span>
          </button>
        </section>

        {/* Sticky Price Banner */}
        <div className="sticky top-[58px] z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e5e2e1] px-4 md:px-12 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-black text-[#7e5700]">
              {formatPrice(property)}
            </span>
            {property.isNegotiable && (
              <span className="bg-[#fb7800]/15 text-[#994700] text-xs px-2.5 py-1 rounded-md font-bold">
                قابل للتفاوض
              </span>
            )}
          </div>

          <div className="flex bg-[#f6f3f2] p-1 rounded-xl border border-[#d6c4ac]/40">
            <button
              onClick={onToggleCurrency}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === 'SYP' ? 'bg-white shadow-xs text-[#7e5700]' : 'text-[#514532]'
              }`}
            >
              SYP
            </button>
            <button
              onClick={onToggleCurrency}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === 'USD' ? 'bg-white shadow-xs text-[#7e5700]' : 'text-[#514532]'
              }`}
            >
              USD
            </button>
          </div>
        </div>

        {/* Property Main Content Body */}
        <div className="px-4 md:px-12 mt-8 space-y-8">
          {/* Title and location */}
          <section className="space-y-4 text-right">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1c1b1b] mb-2 leading-snug">
                  {property.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-[#514532]">
                  <div className="flex items-center gap-1.5 text-[#994700] font-semibold">
                    <span className="material-symbols-outlined text-base">location_on</span>
                    <span>{property.location}</span>
                  </div>
                  <span className="text-xs text-[#847560] font-mono">
                    المعرف: {property.id}
                  </span>
                </div>
              </div>

              <div className="text-xs text-[#514532] bg-[#f0edec] px-3.5 py-1.5 rounded-lg font-medium self-start">
                نشر في: {property.date}
              </div>
            </div>

            {/* Tag Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {property.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#ffb300]/20 text-[#7e5700] border border-[#ffb300]/30 px-3.5 py-1 rounded-full text-xs font-bold"
                >
                  {tag}
                </span>
              ))}
              <span className="bg-[#f0edec] text-[#514532] px-3.5 py-1 rounded-full text-xs font-semibold">
                حالة الملكية: {property.ownership}
              </span>
              <span className="bg-[#f0edec] text-[#514532] px-3.5 py-1 rounded-full text-xs font-semibold">
                التشطيب: {property.finishing}
              </span>
            </div>
          </section>

          {/* Key Specs Grid */}
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5e2e1] flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[#7e5700] text-3xl mb-1.5">
                square_foot
              </span>
              <span className="text-xs text-[#514532] mb-1">المساحة</span>
              <span className="text-xl font-bold text-[#1c1b1b]">{property.area} م²</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5e2e1] flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[#7e5700] text-3xl mb-1.5">
                bed
              </span>
              <span className="text-xs text-[#514532] mb-1">الغرف</span>
              <span className="text-xl font-bold text-[#1c1b1b]">{property.beds}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5e2e1] flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[#7e5700] text-3xl mb-1.5">
                bathtub
              </span>
              <span className="text-xs text-[#514532] mb-1">الحمامات</span>
              <span className="text-xl font-bold text-[#1c1b1b]">{property.baths}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5e2e1] flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[#7e5700] text-3xl mb-1.5">
                layers
              </span>
              <span className="text-xs text-[#514532] mb-1">الطابق</span>
              <span className="text-xl font-bold text-[#1c1b1b]">{property.floor}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5e2e1] flex flex-col items-center text-center col-span-2 sm:col-span-1">
              <span className="material-symbols-outlined text-[#7e5700] text-3xl mb-1.5">
                explore
              </span>
              <span className="text-xs text-[#514532] mb-1">الاتجاه</span>
              <span className="text-base font-bold text-[#1c1b1b]">{property.orientation}</span>
            </div>
          </section>

          {/* Description Section */}
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-xs border border-[#e5e2e1] text-right space-y-4">
            <h2 className="text-xl font-bold text-[#1c1b1b] border-r-4 border-[#ffb300] pr-3">
              الوصف التفصيلي
            </h2>
            <div
              className={`text-sm md:text-base text-[#514532] leading-relaxed transition-all ${
                isDescExpanded ? '' : 'line-clamp-3'
              }`}
            >
              {property.description}
            </div>
            <button
              onClick={() => setIsDescExpanded(!isDescExpanded)}
              className="text-[#7e5700] font-bold text-xs flex items-center gap-1 cursor-pointer hover:underline"
            >
              <span>{isDescExpanded ? 'عرض أقل' : 'اقرأ المزيد'}</span>
              <span className="material-symbols-outlined text-sm">
                {isDescExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </section>

          {/* Amenities & Services Grid */}
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-xs border border-[#e5e2e1] text-right space-y-5">
            <h2 className="text-xl font-bold text-[#1c1b1b] border-r-4 border-[#ffb300] pr-3">
              المرافق والخدمات
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {property.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 bg-[#f6f3f2] rounded-xl border border-[#d6c4ac]/30"
                >
                  <span className="material-symbols-outlined text-[#7e5700] text-xl">
                    check_circle
                  </span>
                  <span className="text-xs font-bold text-[#1c1b1b]">{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Location & Map Section */}
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-xs border border-[#e5e2e1] text-right space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#1c1b1b] border-r-4 border-[#ffb300] pr-3">
                الموقع على الخريطة
              </h2>
              <button
                onClick={() => onNavigate('map')}
                className="bg-[#1c1b1b] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-black transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">directions</span>
                <span>الحصول على الاتجاهات</span>
              </button>
            </div>

            <div className="w-full h-72 rounded-2xl overflow-hidden border border-[#e5e2e1] relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx1_z6mehsdEawimFndWFI7dSRztcAE-R5VKHhy_GdD0bYEmrkUkfTltzVMprzXbalaO4Om0JIJ7n8dbAQXzrUaMEiN07qddqye29-Kp6kxwskIybEt2MbU2UjOewbN71u7F4S2PkbINVGMBx4e_jMWZli-HiFchsgF4be04CzGMB7Ay-empqlAOcm0qptuCN0WfcdpVK_4E_O_pe3SKcTEDQ2usA2b3UU07c1NzwV37SLQCFYIGqXCrz2xnWxpuAo1IkMIyQWmxij"
                alt="خريطة الموقع"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-12 h-12 bg-[#7e5700] rounded-full flex items-center justify-center border-4 border-white shadow-2xl animate-bounce">
                  <span className="material-symbols-outlined text-white text-xl">domain</span>
                </div>
                <div className="bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-[#7e5700] shadow-md mt-1 whitespace-nowrap">
                  {property.location}
                </div>
              </div>
            </div>
          </section>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <section className="space-y-4 text-right">
              <h2 className="text-xl font-bold text-[#1c1b1b] border-r-4 border-[#ffb300] pr-3">
                عقارات مشابهة
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {similarProperties.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => {
                      onSelectProperty(sim);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all border border-[#e5e2e1] cursor-pointer group"
                  >
                    <div className="h-44 relative bg-[#e5e2e1]">
                      <img
                        src={sim.images[0]}
                        alt={sim.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-2 right-2 bg-[#ffb300] text-[#281900] px-2 py-0.5 rounded text-[10px] font-bold">
                        {sim.purpose === 'بيع' ? 'للبيع' : 'للإيجار'}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-sm text-[#1c1b1b] line-clamp-1 mb-1">
                        {sim.title}
                      </h4>
                      <p className="text-[#7e5700] font-bold text-xs mb-2">
                        {formatPrice(sim)}
                      </p>
                      <div className="flex justify-between text-[11px] text-[#514532] border-t border-[#f0edec] pt-2">
                        <span>{sim.area} م²</span>
                        <span>{sim.beds} غرف</span>
                        <span>{sim.city}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Sticky Bottom Contact Bar */}
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-[0_-6px_20px_rgba(13,27,42,0.1)] border-t border-[#e5e2e1] p-3 sm:p-4">
        <div className="max-w-[1280px] mx-auto flex gap-3">
          {/* Call direct */}
          <a
            href={`tel:${property.ownerPhone}`}
            className="flex-1 bg-[#ffb300] text-[#281900] hover:bg-[#fb7800] hover:text-white py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">call</span>
            <span>اتصل الآن</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/963992524874?text=${encodeURIComponent(
              `مرحباً سكاي لاند، أود الاستفسار عن العقار: ${property.title} (كود: ${property.id})`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] text-white hover:brightness-105 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg material-symbols-filled">chat</span>
            <span>واتساب</span>
          </a>

          {/* Instant Inquiry Modal Trigger */}
          <button
            onClick={() => setIsInquiryModalOpen(true)}
            className="w-12 h-12 bg-[#1c1b1b] text-white hover:bg-[#7e5700] rounded-xl flex items-center justify-center transition-colors active:scale-95 cursor-pointer shrink-0"
            title="طلب معاينة أو مراسلة"
          >
            <span className="material-symbols-outlined text-xl">mail</span>
          </button>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1c1b1b] rounded-3xl p-6 max-w-2xl w-full text-white text-right relative border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base">جولة فيديو افتراضية - {property.title}</h3>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={images[0]}
                alt="جولة فيديو"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#ffb300] text-[#281900] flex items-center justify-center shadow-2xl animate-pulse">
                  <span className="material-symbols-outlined text-3xl">play_arrow</span>
                </div>
                <p className="text-xs font-semibold bg-black/60 px-4 py-1.5 rounded-full">
                  جاري تشغيل المعاينة الافتراضية بدقة 4K
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-right shadow-2xl border border-[#e5e2e1]">
            <h3 className="font-bold text-base text-[#1c1b1b] mb-4">مشاركة تفاصيل العقار</h3>
            <p className="text-xs text-[#514532] mb-4">
              يمكنك نسخ الرابط أو إرسال تفاصيل هذا العقار عبر تطبيقات التواصل:
            </p>
            <div className="flex items-center gap-2 p-2 bg-[#f6f3f2] rounded-xl border border-[#d6c4ac] mb-5">
              <input
                readOnly
                value={`https://skyland-sy.com/property/${property.id}`}
                className="w-full bg-transparent text-xs text-[#1c1b1b] outline-none font-mono"
              />
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(`https://skyland-sy.com/property/${property.id}`);
                  alert('تم نسخ رابط العقار إلى الحافظة!');
                  setIsShareModalOpen(false);
                }}
                className="bg-[#7e5700] text-white px-3 py-1 rounded-lg text-xs font-bold cursor-pointer hover:bg-[#994700]"
              >
                نسخ
              </button>
            </div>
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="w-full py-2.5 rounded-xl border border-[#d6c4ac] text-xs font-bold text-[#514532]"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Inquiry Form Modal */}
      {isInquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#e5e2e1] text-right">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#e5e2e1]">
              <h3 className="font-bold text-base text-[#1c1b1b]">طلب معاينة / استفسار</h3>
              <button
                onClick={() => setIsInquiryModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f6f3f2]"
              >
                ✕
              </button>
            </div>

            {inquirySubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h4 className="font-bold text-base text-[#1c1b1b]">تم إرسال طلبك بنجاح!</h4>
                <p className="text-xs text-[#514532]">
                  سيتواصل معك فريق سكاي لاند العقارية خلال دقائق لتنسيق الموعد.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#514532] mb-1">اسمك الكامل</label>
                  <input
                    required
                    type="text"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="مثال: م. فادي الأحمد"
                    className="w-full p-3 rounded-xl border border-[#d6c4ac] outline-none focus:ring-2 focus:ring-[#ffb300]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#514532] mb-1">رقم الهاتف أو الواتساب</label>
                  <input
                    required
                    type="tel"
                    dir="ltr"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="+963 932 400 182"
                    className="w-full p-3 rounded-xl border border-[#d6c4ac] outline-none focus:ring-2 focus:ring-[#ffb300] text-right"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#514532] mb-1">الرسالة أو الاستفسار</label>
                  <textarea
                    rows={3}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#d6c4ac] outline-none focus:ring-2 focus:ring-[#ffb300]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsInquiryModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-[#d6c4ac] font-bold text-[#514532]"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-[#ffb300] text-[#281900] font-bold hover:bg-[#fb7800] hover:text-white transition-colors"
                  >
                    إرسال الطلب
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
