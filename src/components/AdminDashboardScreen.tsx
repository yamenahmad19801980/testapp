import React, { useState } from 'react';
import { Property, AdminUser } from '../data/mockData';

interface AdminDashboardScreenProps {
  properties: Property[];
  onUpdatePropertyStatus: (id: string, status: Property['status']) => void;
  onUpdatePropertyPrice: (id: string, newPrice: number) => void;
  onDeleteProperty: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onNavigate: (screen: string) => void;
  users: AdminUser[];
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  properties,
  onUpdatePropertyStatus,
  onUpdatePropertyPrice,
  onDeleteProperty,
  onSelectProperty,
  onNavigate,
  users,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'users' | 'analytics' | 'settings'>('overview');
  const [propertySearch, setPropertySearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'متاح' | 'مباع' | 'قيد المراجعة'>('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const pendingProperties = properties.filter((p) => p.status === 'قيد المراجعة');

  const filteredProperties = properties.filter((p) => {
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    if (propertySearch.trim()) {
      const q = propertySearch.toLowerCase().trim();
      return (
        p.title.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] pb-28 font-['IBM_Plex_Sans_Arabic']">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[110] bg-[#1c1b1b] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce border border-[#ffb300]">
          <span className="material-symbols-outlined text-[#ffb300]">check_circle</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Admin Profile Header */}
      <section className="px-4 md:px-12 pt-8 pb-6 bg-[#1c1b1b] text-[#ffdeac] border-b border-white/10">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-right">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              لوحة التحكم الشاملة
            </h1>
            <p className="text-xs md:text-sm text-[#e5e2e1] mt-1">
              أهلاً بك، المهندس وسيم صقر (مشرف رئيسي - سكاي لاند طرطوس)
            </p>
          </div>

          <button
            onClick={() => onNavigate('add-property')}
            className="bg-[#ffb300] hover:bg-[#fb7800] text-[#281900] hover:text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            <span>إضافة عقار جديد</span>
          </button>
        </div>
      </section>

      {/* Segmented Navigation Tabs */}
      <nav className="bg-white sticky top-[58px] z-30 border-b border-[#e5e2e1] px-4 md:px-12 overflow-x-auto no-scrollbar flex gap-6 text-xs font-bold whitespace-nowrap py-3">
        <div className="max-w-[1280px] w-full mx-auto flex gap-6">
          {[
            { id: 'overview', label: 'نظرة عامة', icon: 'dashboard' },
            { id: 'properties', label: 'إدارة العقارات', icon: 'domain', badge: properties.length },
            { id: 'users', label: 'المستخدمين', icon: 'group', badge: users.length },
            { id: 'analytics', label: 'التحليلات', icon: 'analytics' },
            { id: 'settings', label: 'الإعدادات', icon: 'settings' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-1.5 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#7e5700] text-[#7e5700] font-bold'
                    : 'border-transparent text-[#514532] hover:text-[#7e5700]'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-[#ffb300] text-[#281900]' : 'bg-[#f0edec] text-[#514532]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content Area */}
      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 space-y-8 text-right">
        {/* ================= SECTION 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5e2e1]">
                <div className="flex justify-between items-start mb-2">
                  <span className="material-symbols-outlined text-[#994700] text-3xl">trending_up</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    +24%
                  </span>
                </div>
                <p className="text-xs text-[#514532]">نمو العقارات</p>
                <h3 className="text-2xl font-bold text-[#1c1b1b] mt-1">+24%</h3>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5e2e1]">
                <div className="flex justify-between items-start mb-2">
                  <span className="material-symbols-outlined text-[#7e5700] text-3xl">ads_click</span>
                  <span className="text-[11px] font-bold text-[#7e5700] bg-[#ffb300]/20 px-2 py-0.5 rounded-full">
                    نشط
                  </span>
                </div>
                <p className="text-xs text-[#514532]">الإعلانات النشطة</p>
                <h3 className="text-2xl font-bold text-[#1c1b1b] mt-1">
                  {properties.filter((p) => p.status === 'متاح').length + 1240}
                </h3>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5e2e1]">
                <div className="flex justify-between items-start mb-2">
                  <span className="material-symbols-outlined text-[#525f71] text-3xl">call</span>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                    هذا الشهر
                  </span>
                </div>
                <p className="text-xs text-[#514532]">الاتصالات المباشرة</p>
                <h3 className="text-2xl font-bold text-[#1c1b1b] mt-1">850</h3>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5e2e1]">
                <div className="flex justify-between items-start mb-2">
                  <span className="material-symbols-outlined text-[#fb7800] text-3xl">visibility</span>
                  <span className="text-[11px] font-bold text-[#fb7800] bg-[#fb7800]/15 px-2 py-0.5 rounded-full">
                    +18%
                  </span>
                </div>
                <p className="text-xs text-[#514532]">إجمالي المشاهدات</p>
                <h3 className="text-2xl font-bold text-[#1c1b1b] mt-1">45.2K</h3>
              </div>
            </div>

            {/* Pending Reviews Card & Chart Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left (or Right in RTL): Pending Review List */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-xs border border-[#e5e2e1] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#e5e2e1]">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[#1c1b1b]">طلبات بانتظار المراجعة</h3>
                      <span className="bg-[#fb7800] text-white text-[11px] px-2.5 py-0.5 rounded-full font-bold">
                        {pendingProperties.length} جديد
                      </span>
                    </div>
                  </div>

                  {pendingProperties.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#514532]">
                      <span className="material-symbols-outlined text-4xl text-emerald-600 mb-2">
                        task_alt
                      </span>
                      <p>لا توجد طلبات معلقة حالياً، تم تدقيق كافة العقارات!</p>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {pendingProperties.map((prop) => (
                        <div
                          key={prop.id}
                          className="bg-[#f6f3f2] p-3.5 rounded-2xl border border-[#d6c4ac]/40 flex items-center gap-3.5"
                        >
                          <img
                            src={prop.images[0]}
                            alt={prop.title}
                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-[#1c1b1b] truncate">
                              {prop.title}
                            </h4>
                            <p className="text-[11px] text-[#514532] mt-0.5 truncate">
                              بواسطة: {prop.ownerName}
                            </p>
                            <p className="text-[10px] text-[#7e5700] font-bold mt-1">
                              {prop.priceSYP.toLocaleString()} ل.س
                            </p>
                          </div>

                          <div className="flex gap-1.5 shrink-0">
                            <button
                              onClick={() => {
                                onUpdatePropertyStatus(prop.id, 'متاح');
                                showToast(`تمت الموافقة على العقار #${prop.id} ونشره للجمهور!`);
                              }}
                              className="w-8 h-8 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                              title="موافقة ونشر"
                            >
                              <span className="material-symbols-outlined text-base">check</span>
                            </button>
                            <button
                              onClick={() => {
                                onUpdatePropertyStatus(prop.id, 'مباع');
                                showToast(`تم رفض العقار #${prop.id}`);
                              }}
                              className="w-8 h-8 rounded-lg bg-[#ba1a1a] text-white hover:bg-red-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                              title="رفض"
                            >
                              <span className="material-symbols-outlined text-base">close</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setActiveTab('properties');
                    setStatusFilter('قيد المراجعة');
                  }}
                  className="w-full mt-6 py-2.5 text-[#7e5700] hover:bg-[#ffb300]/10 rounded-xl text-xs font-bold border border-[#7e5700]/30 transition-colors cursor-pointer"
                >
                  عرض كافة العقارات والطلبات
                </button>
              </div>

              {/* Growth Chart */}
              <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl shadow-xs border border-[#e5e2e1]">
                <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#e5e2e1]">
                  <div>
                    <h3 className="text-lg font-bold text-[#1c1b1b]">نمو إدراجات العقارات</h3>
                    <p className="text-xs text-[#514532]">إحصائية العقارات الجديدة شهرياً</p>
                  </div>
                  <span className="text-xs font-bold text-[#7e5700] bg-[#ffb300]/20 px-3 py-1 rounded-lg">
                    آخر 6 أشهر
                  </span>
                </div>

                {/* Simulated Growth Bars */}
                <div className="h-60 flex items-end justify-between gap-3 px-2 pt-6">
                  {[
                    { month: 'يناير', height: '45%', count: 120 },
                    { month: 'فبراير', height: '55%', count: 180 },
                    { month: 'مارس', height: '35%', count: 95 },
                    { month: 'أبريل', height: '80%', count: 240, active: true },
                    { month: 'مايو', height: '65%', count: 210 },
                    { month: 'يونيو', height: '90%', count: 310 },
                  ].map((bar) => (
                    <div key={bar.month} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <span className="text-[10px] font-bold text-[#514532] mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {bar.count}
                      </span>
                      <div
                        style={{ height: bar.height }}
                        className={`w-full rounded-t-xl transition-all duration-500 cursor-pointer ${
                          bar.active
                            ? 'bg-[#ffb300] shadow-md hover:bg-[#fb7800]'
                            : 'bg-[#e5e2e1] hover:bg-[#ffdeac]'
                        }`}
                      />
                      <span className="text-xs text-[#514532] mt-2 font-medium">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setActiveTab('properties');
                  setStatusFilter('قيد المراجعة');
                }}
                className="p-5 bg-white rounded-2xl shadow-xs border border-[#e5e2e1] hover:border-[#ffb300] flex items-center gap-4 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#ffb300]/20 flex items-center justify-center text-[#7e5700]">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                </div>
                <div className="text-right">
                  <h4 className="text-sm font-bold text-[#1c1b1b]">مراجعة العقارات المعلقة</h4>
                  <p className="text-xs text-[#514532]">تدقيق الطلبات الجديدة وتفعيلها</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className="p-5 bg-white rounded-2xl shadow-xs border border-[#e5e2e1] hover:border-[#ffb300] flex items-center gap-4 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#7e5700]/15 flex items-center justify-center text-[#7e5700]">
                  <span className="material-symbols-outlined text-2xl">group</span>
                </div>
                <div className="text-right">
                  <h4 className="text-sm font-bold text-[#1c1b1b]">إدارة الوسطاء والمستثمرين</h4>
                  <p className="text-xs text-[#514532]">متابعة الحسابات وصلاحيات الوصول</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className="p-5 bg-white rounded-2xl shadow-xs border border-[#e5e2e1] hover:border-[#ffb300] flex items-center gap-4 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#fb7800]/20 flex items-center justify-center text-[#fb7800]">
                  <span className="material-symbols-outlined text-2xl">pie_chart</span>
                </div>
                <div className="text-right">
                  <h4 className="text-sm font-bold text-[#1c1b1b]">تقارير السوق والمبيعات</h4>
                  <p className="text-xs text-[#514532]">تحليلات الطلب والأسعار الإقليمية</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ================= SECTION 2: PROPERTY MANAGEMENT ================= */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#1c1b1b]">إدارة العقارات والأسعار</h2>
                <p className="text-xs text-[#514532]">
                  تعديل الأسعار مباشرة، تغيير الحالة (متاح / مباع)، أو حذف العقار
                </p>
              </div>

              <div className="flex gap-2">
                {(['All', 'متاح', 'مباع', 'قيد المراجعة'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      statusFilter === s
                        ? 'bg-[#7e5700] text-white shadow-xs'
                        : 'bg-white border border-[#d6c4ac] text-[#514532] hover:bg-[#f6f3f2]'
                    }`}
                  >
                    {s === 'All' ? 'الكل' : s}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#847560]">
                search
              </span>
              <input
                type="text"
                value={propertySearch}
                onChange={(e) => setPropertySearch(e.target.value)}
                placeholder="ابحث باسم العقار، الكود، أو المدينة..."
                className="w-full pr-11 pl-4 py-3 rounded-2xl border border-[#d6c4ac] bg-white text-xs outline-none focus:ring-2 focus:ring-[#ffb300]"
              />
            </div>

            {/* Properties List Items */}
            <div className="space-y-4">
              {filteredProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-white p-5 rounded-2xl shadow-xs border border-[#e5e2e1] hover:border-[#ffb300] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  {/* Photo & Main info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                      onClick={() => {
                        onSelectProperty(prop);
                        onNavigate('property-detail');
                      }}
                    />

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono text-[#847560]">#{prop.id}</span>
                        <span className="bg-[#f0edec] text-[#514532] text-[10px] font-bold px-2 py-0.5 rounded">
                          {prop.type}
                        </span>
                      </div>

                      <h3
                        onClick={() => {
                          onSelectProperty(prop);
                          onNavigate('property-detail');
                        }}
                        className="text-sm font-bold text-[#1c1b1b] hover:text-[#7e5700] transition-colors cursor-pointer line-clamp-1"
                      >
                        {prop.title}
                      </h3>

                      <p className="text-xs text-[#514532] flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm text-[#7e5700]">location_on</span>
                        <span>{prop.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Inline Status Toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#514532] font-semibold">الحالة:</span>
                    <select
                      value={prop.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as Property['status'];
                        onUpdatePropertyStatus(prop.id, newStatus);
                        showToast(`تم تحديث حالة #${prop.id} إلى ${newStatus}`);
                      }}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border-none outline-none cursor-pointer ${
                        prop.status === 'متاح'
                          ? 'bg-emerald-100 text-emerald-800'
                          : prop.status === 'مباع'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <option value="متاح">متاح (Available)</option>
                      <option value="مباع">مباع (Sold)</option>
                      <option value="قيد المراجعة">قيد المراجعة (Pending)</option>
                    </select>
                  </div>

                  {/* Inline Price Edit */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="number"
                        defaultValue={prop.priceSYP}
                        onBlur={(e) => {
                          const val = Number(e.target.value);
                          if (val && val !== prop.priceSYP) {
                            onUpdatePropertyPrice(prop.id, val);
                            showToast(`تم تحديث سعر العقار #${prop.id}`);
                          }
                        }}
                        className="w-36 py-1.5 px-3 border border-[#d6c4ac] rounded-xl text-xs font-bold text-[#7e5700] bg-[#f6f3f2] focus:bg-white focus:ring-2 focus:ring-[#ffb300] outline-none"
                      />
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#847560] font-bold">
                        ل.س
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectProperty(prop);
                        onNavigate('property-detail');
                      }}
                      className="p-2 text-[#514532] hover:text-[#7e5700] hover:bg-[#ffb300]/10 rounded-xl transition-colors cursor-pointer"
                      title="عرض كامل التفاصيل"
                    >
                      <span className="material-symbols-outlined text-lg">visibility</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(prop.id)}
                      className="p-2 text-[#514532] hover:text-[#ba1a1a] hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="حذف العقار"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SECTION 3: USERS ================= */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-[#1c1b1b]">إدارة الوسطاء والمستثمرين</h2>
                <p className="text-xs text-[#514532]">إدارة وتفويض الحسابات المعتمدة</p>
              </div>

              <button
                onClick={() => alert('تم فتح نافذة إضافة مستخدم جديد.')}
                className="bg-[#7e5700] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#994700] cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">person_add</span>
                <span>إضافة مستخدم</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#e5e2e1]">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#f6f3f2] text-[#514532] border-b border-[#e5e2e1]">
                  <tr>
                    <th className="p-4 font-bold">المستخدم</th>
                    <th className="p-4 font-bold">الدور</th>
                    <th className="p-4 font-bold">العقارات المدرجة</th>
                    <th className="p-4 font-bold">الحالة</th>
                    <th className="p-4 font-bold">الهاتف</th>
                    <th className="p-4 font-bold text-center">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e2e1]">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-[#fcf9f8] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#ffb300]/25 text-[#7e5700] flex items-center justify-center font-bold text-xs">
                            {u.initials}
                          </div>
                          <div>
                            <div className="font-bold text-[#1c1b1b]">{u.name}</div>
                            <div className="text-[10px] text-[#847560] font-mono">ID: {u.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-medium">{u.role}</td>
                      <td className="p-4 font-bold text-[#7e5700]">{u.propertiesCount} عقار</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            u.status === 'نشط'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 text-[#514532]" dir="ltr">
                        {u.phone}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => showToast(`تم اختيار المستخدم ${u.name}`)}
                          className="p-1 hover:bg-[#f0edec] rounded-lg text-[#514532]"
                        >
                          <span className="material-symbols-outlined text-lg">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= SECTION 4: ANALYTICS ================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1c1b1b]">تحليلات الأداء والسوق</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Regional Activity */}
              <div className="bg-white p-6 rounded-3xl shadow-xs border border-[#e5e2e1] space-y-5">
                <h3 className="font-bold text-base text-[#1c1b1b]">معدل النشاط والطلب حسب المنطقة</h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between mb-1.5 font-bold">
                      <span>طرطوس والكورنيش البحري</span>
                      <span className="text-[#7e5700]">85%</span>
                    </div>
                    <div className="w-full bg-[#f0edec] h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#7e5700] h-full rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5 font-bold">
                      <span>ريف طرطوس والدريكيش</span>
                      <span className="text-[#994700]">72%</span>
                    </div>
                    <div className="w-full bg-[#f0edec] h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#994700] h-full rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5 font-bold">
                      <span>صافيتا والمشروع السادس</span>
                      <span className="text-[#fb7800]">64%</span>
                    </div>
                    <div className="w-full bg-[#f0edec] h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#fb7800] h-full rounded-full" style={{ width: '64%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5 font-bold">
                      <span>دمشق ويعفور</span>
                      <span className="text-[#525f71]">50%</span>
                    </div>
                    <div className="w-full bg-[#f0edec] h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#525f71] h-full rounded-full" style={{ width: '50%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* KPI Totals */}
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl shadow-xs border border-[#e5e2e1]">
                  <div className="flex justify-between items-start mb-2">
                    <span className="material-symbols-outlined text-[#7e5700] text-3xl">visibility</span>
                    <span className="text-emerald-700 bg-emerald-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      +12% هذا الشهر
                    </span>
                  </div>
                  <p className="text-xs text-[#514532]">إجمالي مشاهدات العقارات</p>
                  <h3 className="text-3xl font-bold text-[#1c1b1b] mt-1">124.5K</h3>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-xs border border-[#e5e2e1]">
                  <div className="flex justify-between items-start mb-2">
                    <span className="material-symbols-outlined text-[#fb7800] text-3xl">payments</span>
                    <span className="text-emerald-700 bg-emerald-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      +8% صفقات مكتملة
                    </span>
                  </div>
                  <p className="text-xs text-[#514532]">حجم الصفقات المنجزة</p>
                  <h3 className="text-3xl font-bold text-[#1c1b1b] mt-1">4.2 مليار ل.س</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SECTION 5: SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-xl font-bold text-[#1c1b1b]">إعدادات النظام والمنصة</h2>

            <div className="bg-white rounded-3xl border border-[#e5e2e1] divide-y divide-[#e5e2e1] overflow-hidden shadow-xs text-xs">
              {/* Notification toggle */}
              <div className="p-5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#7e5700] text-xl">notifications</span>
                  <div>
                    <h4 className="font-bold text-[#1c1b1b]">إشعارات النظام والطلبات</h4>
                    <p className="text-[#514532] text-[11px]">تلقي تنبيهات عند إضافة عقار جديد للمراجعة</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    notificationsEnabled ? 'bg-[#ffb300]' : 'bg-[#d6c4ac]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-xs transition-transform ${
                      notificationsEnabled ? 'left-1' : 'left-6'
                    }`}
                  />
                </button>
              </div>

              {/* Password */}
              <div
                onClick={() => alert('تم إرسال رابط تأكيد إعادة تعيين كلمة المرور إلى بريدك المسجل.')}
                className="p-5 flex justify-between items-center hover:bg-[#fcf9f8] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#7e5700] text-xl">lock</span>
                  <span className="font-bold text-[#1c1b1b]">تغيير كلمة مرور المشرف</span>
                </div>
                <span className="material-symbols-outlined text-[#847560] text-lg">chevron_left</span>
              </div>

              {/* Language and Region */}
              <div className="p-5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#7e5700] text-xl">language</span>
                  <span className="font-bold text-[#1c1b1b]">اللغة والمنطقة الافتراضية</span>
                </div>
                <span className="font-bold text-[#7e5700]">العربية (سوريا - طرطوس)</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('تم تسجيل الخروج بنجاح.');
                onNavigate('home');
              }}
              className="w-full py-4 text-[#ba1a1a] font-bold border border-rose-200 hover:bg-rose-50 rounded-2xl transition-colors cursor-pointer text-xs"
            >
              تسجيل الخروج من لوحة الإدارة
            </button>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border border-[#e5e2e1]">
            <div className="w-14 h-14 bg-rose-100 text-[#ba1a1a] rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">warning</span>
            </div>
            <h3 className="text-lg font-bold text-[#1c1b1b]">تأكيد حذف العقار؟</h3>
            <p className="text-xs text-[#514532]">
              هل أنت متأكد من رغبتك في حذف العقار رقم <span className="font-bold">#{deleteConfirmId}</span>؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#d6c4ac] text-xs font-bold text-[#514532] hover:bg-[#f6f3f2]"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  onDeleteProperty(deleteConfirmId);
                  showToast(`تم حذف العقار #${deleteConfirmId} بنجاح.`);
                  setDeleteConfirmId(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#ba1a1a] text-white text-xs font-bold hover:bg-red-700 transition-colors"
              >
                حذف نهائي
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
