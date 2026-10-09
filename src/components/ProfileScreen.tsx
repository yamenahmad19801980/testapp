import React, { useState } from 'react';
import { Property } from '../data/mockData';

interface ProfileScreenProps {
  properties: Property[];
  onNavigate: (screen: string) => void;
  onSelectProperty: (property: Property) => void;
  favorites: string[];
  onDeleteProperty: (id: string) => void;
  currency: 'SYP' | 'USD';
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  properties,
  onNavigate,
  onSelectProperty,
  favorites,
  onDeleteProperty,
  currency,
}) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'favorites'>('listings');
  const [messagesModalOpen, setMessagesModalOpen] = useState(false);

  // User's listings
  const myListings = properties.slice(0, 4);
  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  const formatPrice = (p: Property) => {
    if (currency === 'USD') {
      return `$${p.priceUSD.toLocaleString()}`;
    }
    return `${p.priceSYP.toLocaleString()} ل.س`;
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] pb-28 font-['IBM_Plex_Sans_Arabic']">
      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 space-y-8 text-right">
        {/* Profile Card Header */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xs border border-[#e5e2e1] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-[#ffb300]/30 shadow-md">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSs3ZyqgHou5J0XVaLbRIHOgorZaEot1V9t7keZ3xOmfPNv1eNiV9o1m5aSAkkVHSWzv7n0NSrmTpffYJ-xh94d3rKhAvhEjWiQHH__wxq0NlaBwJM2hV_zUSMUU0u3nHcoa7o4W3Eu_EZzciN7CmqV4eRjRrUQAkd_MxPwhwESYnyvs9gzRCYmlCy95DLmpOYnr6GanBNLoQ9wd2NAc9q7HlRGoMDvl1InKNANYOWbwnzo1AMk_j4gI7lJMoSDcVXEygM53njXIzF"
                alt="أحمد المنصوري"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-[#7e5700] rounded-full p-1 border-2 border-white">
                <span className="material-symbols-outlined text-white text-xs material-symbols-filled">
                  verified
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-[#1c1b1b]">أحمد المنصوري</h1>
                <span className="bg-[#ffb300]/25 text-[#7e5700] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  عضو فضي
                </span>
              </div>
              <p className="text-xs text-[#514532] mt-1 font-medium">مستثمر عقاري معتمد - طرطوس</p>
              <p className="text-[11px] text-[#847560] mt-0.5" dir="ltr">
                +963 992 524 874 | ahmed@skyland.sy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('add-property')}
              className="flex-1 sm:flex-none bg-[#ffb300] hover:bg-[#fb7800] text-[#281900] hover:text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              <span>إضافة عقار جديد</span>
            </button>

            <button
              onClick={() => setMessagesModalOpen(true)}
              className="w-11 h-11 rounded-xl bg-[#f6f3f2] hover:bg-[#ffb300]/20 flex items-center justify-center text-[#514532] relative cursor-pointer"
              title="الرسائل"
            >
              <span className="material-symbols-outlined text-xl">chat</span>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full" />
            </button>
          </div>
        </div>

        {/* 4 Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5e2e1] flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#7e5700]/10 flex items-center justify-center text-[#7e5700] mb-3">
              <span className="material-symbols-outlined text-2xl">ads_click</span>
            </div>
            <span className="text-2xl font-bold text-[#1c1b1b]">12</span>
            <span className="text-xs text-[#514532] mt-0.5">إعلانات نشطة</span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5e2e1] flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#fb7800]/15 flex items-center justify-center text-[#fb7800] mb-3">
              <span className="material-symbols-outlined text-2xl">visibility</span>
            </div>
            <span className="text-2xl font-bold text-[#1c1b1b]">2.4k</span>
            <span className="text-xs text-[#514532] mt-0.5">المشاهدات</span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5e2e1] flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
              <span className="material-symbols-outlined text-2xl material-symbols-filled">chat</span>
            </div>
            <span className="text-2xl font-bold text-[#1c1b1b]">184</span>
            <span className="text-xs text-[#514532] mt-0.5">نقرات واتساب</span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5e2e1] flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
              <span className="material-symbols-outlined text-2xl">call</span>
            </div>
            <span className="text-2xl font-bold text-[#1c1b1b]">56</span>
            <span className="text-xs text-[#514532] mt-0.5">اتصالات مباشرة</span>
          </div>
        </div>

        {/* Chart & Quick Actions Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-xs border border-[#e5e2e1]">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#e5e2e1]">
              <h2 className="text-base md:text-lg font-bold text-[#1c1b1b]">تحليل الأداء الأسبوعي</h2>
              <span className="text-xs font-bold text-[#7e5700] bg-[#ffb300]/20 px-3 py-1 rounded-lg">
                آخر 7 أيام
              </span>
            </div>

            <div className="h-48 flex items-end justify-between gap-2 px-2 pt-4">
              {[
                { day: 'الأحد', height: '60%', count: 140 },
                { day: 'الإثنين', height: '40%', count: 95 },
                { day: 'الثلاثاء', height: '85%', count: 210 },
                { day: 'الأربعاء', height: '55%', count: 130 },
                { day: 'الخميس', height: '95%', count: 245, active: true },
                { day: 'الجمعة', height: '70%', count: 180 },
                { day: 'السبت', height: '80%', count: 195 },
              ].map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <span className="text-[10px] font-bold text-[#514532] mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.count}
                  </span>
                  <div
                    style={{ height: item.height }}
                    className={`w-full rounded-t-xl transition-all duration-300 ${
                      item.active ? 'bg-[#ffb300] hover:bg-[#fb7800]' : 'bg-[#e5e2e1] hover:bg-[#ffdeac]'
                    }`}
                  />
                  <span className="text-[11px] text-[#514532] mt-2">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="bg-white p-6 rounded-3xl shadow-xs border border-[#e5e2e1] flex flex-col justify-between">
            <h2 className="text-base font-bold text-[#1c1b1b] mb-4 pb-2 border-b border-[#e5e2e1]">
              إجراءات سريعة
            </h2>
            <div className="grid grid-cols-2 gap-3 flex-1">
              <button
                onClick={() => onNavigate('add-property')}
                className="p-4 bg-[#f6f3f2] hover:bg-[#ffb300]/15 rounded-2xl flex flex-col items-center justify-center text-center transition-all group cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#7e5700] text-2xl mb-1.5 group-hover:scale-110 transition-transform">
                  add_box
                </span>
                <span className="text-xs font-bold text-[#1c1b1b]">إعلان جديد</span>
              </button>

              <button
                onClick={() => setMessagesModalOpen(true)}
                className="p-4 bg-[#f6f3f2] hover:bg-[#ffb300]/15 rounded-2xl flex flex-col items-center justify-center text-center transition-all group cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#7e5700] text-2xl mb-1.5 group-hover:scale-110 transition-transform">
                  mail
                </span>
                <span className="text-xs font-bold text-[#1c1b1b]">رسائلي</span>
              </button>

              <button
                onClick={() => setActiveTab('favorites')}
                className="p-4 bg-[#f6f3f2] hover:bg-[#ffb300]/15 rounded-2xl flex flex-col items-center justify-center text-center transition-all group cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#7e5700] text-2xl mb-1.5 group-hover:scale-110 transition-transform">
                  favorite
                </span>
                <span className="text-xs font-bold text-[#1c1b1b]">المفضلة</span>
              </button>

              <button
                onClick={() => onNavigate('admin-dashboard')}
                className="p-4 bg-[#f6f3f2] hover:bg-[#ffb300]/15 rounded-2xl flex flex-col items-center justify-center text-center transition-all group cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#7e5700] text-2xl mb-1.5 group-hover:scale-110 transition-transform">
                  settings
                </span>
                <span className="text-xs font-bold text-[#1c1b1b]">الإعدادات</span>
              </button>
            </div>
          </div>
        </div>

        {/* Listings / Favorites Segmented View */}
        <section className="bg-white rounded-3xl shadow-xs border border-[#e5e2e1] overflow-hidden">
          <div className="p-6 border-b border-[#e5e2e1] flex justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('listings')}
                className={`text-sm font-bold pb-1 transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'listings'
                    ? 'border-[#7e5700] text-[#7e5700]'
                    : 'border-transparent text-[#514532]'
                }`}
              >
                إدارة إعلاناتي ({myListings.length})
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`text-sm font-bold pb-1 transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'favorites'
                    ? 'border-[#7e5700] text-[#7e5700]'
                    : 'border-transparent text-[#514532]'
                }`}
              >
                عقاراتي المفضلة ({favoriteProperties.length})
              </button>
            </div>

            <button
              onClick={() => onNavigate('explore')}
              className="text-xs font-bold text-[#7e5700] hover:underline"
            >
              عرض السوق العام
            </button>
          </div>

          <div className="divide-y divide-[#e5e2e1]">
            {activeTab === 'listings' ? (
              myListings.map((listing) => (
                <div
                  key={listing.id}
                  className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:bg-[#fcf9f8] transition-colors"
                >
                  <div
                    onClick={() => {
                      onSelectProperty(listing);
                      onNavigate('property-detail');
                    }}
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-24 h-20 rounded-2xl object-cover shrink-0"
                    />
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-[#1c1b1b] hover:text-[#7e5700]">
                        {listing.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-[#514532] mt-1.5">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">calendar_today</span>
                          <span>{listing.date}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                          <span>{listing.viewsCount} مشاهدة</span>
                        </span>
                        <span className="font-bold text-[#7e5700]">{formatPrice(listing)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        listing.status === 'متاح'
                          ? 'bg-emerald-100 text-emerald-800'
                          : listing.status === 'مباع'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {listing.status === 'متاح' ? 'منشور' : listing.status}
                    </span>

                    <button
                      onClick={() => {
                        onSelectProperty(listing);
                        onNavigate('property-detail');
                      }}
                      className="p-2 text-[#514532] hover:bg-[#f0edec] rounded-xl"
                      title="معاينة"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`هل أنت متأكد من حذف ${listing.title}؟`)) {
                          onDeleteProperty(listing.id);
                        }
                      }}
                      className="p-2 text-[#ba1a1a] hover:bg-rose-50 rounded-xl"
                      title="حذف"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              ))
            ) : favoriteProperties.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#514532]">
                <span className="material-symbols-outlined text-4xl text-[#ffb300] mb-2">
                  favorite_border
                </span>
                <p>لم تقم بإضافة أي عقار إلى المفضلة بعد.</p>
              </div>
            ) : (
              favoriteProperties.map((fav) => (
                <div
                  key={fav.id}
                  onClick={() => {
                    onSelectProperty(fav);
                    onNavigate('property-detail');
                  }}
                  className="p-5 flex items-center justify-between gap-4 hover:bg-[#fcf9f8] cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={fav.images[0]}
                      alt={fav.title}
                      className="w-20 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#1c1b1b]">{fav.title}</h4>
                      <p className="text-xs text-[#514532]">{fav.location}</p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#7e5700]">{formatPrice(fav)}</div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Messages Modal */}
      {messagesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#e5e2e1] text-right space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#e5e2e1]">
              <h3 className="font-bold text-base text-[#1c1b1b]">رسائل المهتمين والمستثمرين</h3>
              <button
                onClick={() => setMessagesModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f6f3f2]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-[#f6f3f2] rounded-2xl border border-[#d6c4ac]/40">
                <div className="flex justify-between font-bold mb-1">
                  <span>المهندس كمال حبيب</span>
                  <span className="text-[10px] text-[#847560]">منذ ساعتين</span>
                </div>
                <p className="text-[#514532]">
                  مرحباً أستاذ أحمد، هل الشقة في حي الكورنيش جاهزة للتسليم الفوري؟ أود موعداً للمعاينة.
                </p>
              </div>

              <div className="p-3.5 bg-[#f6f3f2] rounded-2xl border border-[#d6c4ac]/40">
                <div className="flex justify-between font-bold mb-1">
                  <span>د. ريم درويش</span>
                  <span className="text-[10px] text-[#847560]">أمس</span>
                </div>
                <p className="text-[#514532]">
                  السلام عليكم، بخصوص الفيلا في الدريكيش، هل السعر يتضمن الأثاث والطاقة الشمسية؟
                </p>
              </div>
            </div>

            <button
              onClick={() => setMessagesModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#7e5700] text-white font-bold text-xs"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
