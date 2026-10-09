import React, { useState } from 'react';
import { Property } from '../data/mockData';

interface AddPropertyScreenProps {
  onAddProperty: (newProperty: Property) => void;
  onNavigate: (screen: string) => void;
}

export const AddPropertyScreen: React.FC<AddPropertyScreenProps> = ({
  onAddProperty,
  onNavigate,
}) => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('مدينة طرطوس');
  const [neighborhood, setNeighborhood] = useState('حي الكورنيش');
  const [price, setPrice] = useState<number | ''>(450000000);
  const [propertyType, setPropertyType] = useState<Property['type']>('شقة');
  const [purpose, setPurpose] = useState<'بيع' | 'إيجار'>('بيع');
  const [rooms, setRooms] = useState<number | ''>(3);
  const [area, setArea] = useState<number | ''>(145);
  const [buildingAge, setBuildingAge] = useState('جديد (أول سكن)');
  const [floorNumber, setFloorNumber] = useState('الطابق الرابع');
  const [finishing, setFinishing] = useState<Property['finishing']>('ممتاز / سوبر لوكس');
  const [furnished, setFurnished] = useState(false);
  const [ownership, setOwnership] = useState<Property['ownership']>('طابو أخضر');
  const [step, setStep] = useState(3);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Initial media manager photos
  const [mediaImages, setMediaImages] = useState<string[]>([
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBqV0gRK6N3IQh3OAcBaMZ2YQF3u0brPraOoXK-2WAEEuFF2Yoq6928o7LJwLgDPFAZavP9T9ioNHVfj1VuYdNiNZ7Ik9iwCIuOYcrpO_gIifTh_DoAN3nn4Rsil6kCjIzMfVDE2eZA0YOaQmUrmaK1mJOryCd3bLJvXRUVUJce1fGZJCGbYNMk1OrTU-9Iog3WozUC3ub9NAR1nACTBcpHUWLbxWnoj-gaWq0CC8huA_gKs3Mazl1gNbcOl8U02hVEKapaWTha41_4',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDcuFQu205WtG2XunG7vJ9RiafrksIkx9MPzhZWEcxGdO9XjEoz5QWZmIHgSkBvCr2q-dBMU1P6pa-AXFcr23WyzLQDcXMLgknpwKtGBR_p7xjhizQY1zdGy3reAi-r0imXV2hzUpT7sfgvbH4PXFOLULseTEVbPjz4Esa7d7vambfLugehaNzoEmOr_VPCUGWYvSLXHMB9egoY1WQhXyDZZ1f42qzP3pJQCaa0AknqLBRhOUnTbjKSFfl0LiNhgGShDyv_c0u7qk3-',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAQuDO00q_A49Nir57wxF4VaFMDAHv5LK_Ot_J4Y_rCwq-FnhrD7Q87KpZ92aZV1CTKV3CtTIWL_txnaYKX2SxdtV6O0uDhyey9AOOvE1tevT_ijeu6BYSpr8yLgIMZi3uZcB8LDnanunvwLU9rT15AZq7b7YdK7AD1577alDc6534THHHpxW_IjmxWjCaHQLDdekMi_TbLduuNopQXMLlSmcOUEi7n96DZeQjRaeBm5CecuuchYGvZcXWA_PSDHB7DVX9KBS73l_Uy',
  ]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleDeleteImage = (index: number) => {
    if (mediaImages.length <= 1) {
      alert('يجب الإبقاء على صورة واحدة على الأقل للعقار.');
      return;
    }
    const updated = mediaImages.filter((_, i) => i !== index);
    setMediaImages(updated);
    if (mainImageIndex >= updated.length) {
      setMainImageIndex(0);
    }
  };

  const handleAddSampleImage = () => {
    const extraImages = [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAhdEPvVtO9dT-Hbk3xZkXCKnzkYdJ1yhT0buTe7vmTMHLEMB-gm7lwf6L2fFak_1GQfEjYm95CEzat1TKTJJDaLnuP2SFX4-3H3UvDGECGDZZg_tZcEHzyA2xxzVumO6JqAtnT-nDJVT4zbRVfCW7FPtvBmXGXyRgdxfArNCFkxzRyV76offHDqsfvGGQs7VdGqJ86XPulDY03rBC85SE8EAUoNyIpPUGC3Bk9uVwQQSpoYDuOPlB0tUpXZQIk24zFnYlFJ5Ajpo4I',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-nMKr0f5SydaKkw2nKY3BuuwGBMRsvpu1eXgChEhsQUxIAWCFUyLUjQ6FxtJmGWr_VlEFHlV_fTR9gdvyD--NuaI01N4I2WxCg92O4wDqayGcOeKMWjaqF0CvMpCwMjnACPzuL-ohS-eteZ9T96j8e8WG0wnoAI8dInxFTA9KY5EiFfI-x_Ql4wWsR4KNIF09e0slDzCbe-8bRwRtXm7dYPow1hhWchQY7arpVqWDY4ei10kJqS3-mS6NBrUwnB6Idz7q00wUeEGk',
    ];
    const nextImg = extraImages[mediaImages.length % extraImages.length];
    setMediaImages([...mediaImages, nextImg]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProperty: Property = {
      id: `SL-${Math.floor(1000 + Math.random() * 9000)}`,
      title: title || 'شقة فاخرة بإطلالة مفتوحة في طرطوس',
      type: propertyType,
      purpose: purpose,
      priceSYP: Number(price) || 350000000,
      priceUSD: Math.round((Number(price) || 350000000) / 1500),
      isNegotiable: true,
      featured: false,
      status: 'قيد المراجعة',
      location: `${city}، ${neighborhood}`,
      city: (city.includes('طرطوس') ? 'طرطوس' : city.includes('صافيتا') ? 'صافيتا' : city.includes('الدريكيش') ? 'الدريكيش' : 'دمشق') as Property['city'],
      neighborhood: neighborhood,
      beds: Number(rooms) || 3,
      baths: 2,
      area: Number(area) || 120,
      floor: floorNumber,
      buildingAge: buildingAge,
      orientation: 'قبلي غربي',
      finishing: finishing,
      furnished: furnished,
      ownership: ownership,
      images: mediaImages,
      mainImageIndex: mainImageIndex,
      date: 'اليوم',
      description: `عقار مميز بمواصفات عالية الجودة في ${city}. ${finishing}. مساحة ${area} م²، ${rooms} غرف. نوع الملكية: ${ownership}.`,
      tags: [ownership, finishing.split('/')[0].trim(), furnished ? 'مفروش' : 'غير مفروش'],
      amenities: ['مصعد', 'مرآب سيارات', 'عزل حراري', 'خزان مياه'],
      viewsCount: 1,
      callsCount: 0,
      whatsappCount: 0,
      ownerName: 'أحمد المنصوري (المستخدم الحالي)',
      ownerPhone: '+963 932400182',
      coordinates: { lat: 34.8959, lng: 35.8867 },
    };

    onAddProperty(newProperty);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] pb-28 font-['IBM_Plex_Sans_Arabic']">
      <main className="max-w-4xl mx-auto px-4 md:px-8 pt-8">
        {/* Multi-step Header */}
        <section className="mb-8 text-right">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1c1b1b]">المواصفات</h1>
              <p className="text-xs text-[#514532] opacity-80 mt-1">الخطوة {step} من 10</p>
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-[#7e5700] uppercase tracking-wider">
                Property Details & Media
              </span>
            </div>
          </div>

          <div className="w-full bg-[#e5e2e1] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#ffb300] to-[#fb7800] h-full transition-all duration-500 rounded-full"
              style={{ width: `${(step / 10) * 100}%` }}
            />
          </div>
        </section>

        <form onSubmit={handleSubmit} className="space-y-6 text-right">
          {/* Main Specs & Furniture Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Box: Basic Specs */}
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#d6c4ac]/40 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#514532] mb-1.5">
                  عنوان العقار
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثلاً: شقة فاخرة في وسط المدينة بإطلالة بحرية"
                  className="w-full rounded-xl border border-[#d6c4ac] p-3 text-xs focus:ring-2 focus:ring-[#ffb300] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#514532] mb-1.5">الموقع</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-[#d6c4ac] p-3 text-xs focus:ring-2 focus:ring-[#ffb300] outline-none bg-white cursor-pointer"
                >
                  <option value="مدينة طرطوس">مدينة طرطوس</option>
                  <option value="ريف طرطوس">ريف طرطوس</option>
                  <option value="صافيتا">صافيتا</option>
                  <option value="الدريكيش">الدريكيش</option>
                  <option value="الشيخ بدر">الشيخ بدر</option>
                  <option value="القدموس">القدموس</option>
                  <option value="دمشق">دمشق ويعفور</option>
                  <option value="حلب">حلب</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#514532] mb-1.5">
                    السعر (ل.س)
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-[#d6c4ac] p-3 text-xs focus:ring-2 focus:ring-[#ffb300] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#514532] mb-1.5">
                    نوع العقار
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as Property['type'])}
                    className="w-full rounded-xl border border-[#d6c4ac] p-3 text-xs focus:ring-2 focus:ring-[#ffb300] outline-none bg-white cursor-pointer"
                  >
                    <option value="شقة">شقة</option>
                    <option value="فيلا">فيلا</option>
                    <option value="أرض">أرض</option>
                    <option value="مكتب">مكتب</option>
                    <option value="شاليه">شاليه</option>
                    <option value="دوبلكس">دوبلكس</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#514532] mb-1.5">
                    الهدف
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPurpose('بيع')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                        purpose === 'بيع'
                          ? 'bg-[#7e5700] text-white border-[#7e5700]'
                          : 'bg-[#f6f3f2] text-[#514532] border-[#d6c4ac]'
                      }`}
                    >
                      للبيع
                    </button>
                    <button
                      type="button"
                      onClick={() => setPurpose('إيجار')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                        purpose === 'إيجار'
                          ? 'bg-[#7e5700] text-white border-[#7e5700]'
                          : 'bg-[#f6f3f2] text-[#514532] border-[#d6c4ac]'
                      }`}
                    >
                      للإيجار
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#514532] mb-1.5">
                    عدد الغرف
                  </label>
                  <input
                    type="number"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="مثلاً: 3"
                    className="w-full rounded-xl border border-[#d6c4ac] p-3 text-xs focus:ring-2 focus:ring-[#ffb300] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#514532] mb-1.5">
                  المساحة الإجمالية
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="مثلاً: 120"
                    className="w-full rounded-xl border border-[#d6c4ac] p-3 pl-10 text-xs focus:ring-2 focus:ring-[#ffb300] outline-none"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#847560] font-bold">
                    م²
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#514532] mb-1.5">عمر البناء</label>
                <select
                  value={buildingAge}
                  onChange={(e) => setBuildingAge(e.target.value)}
                  className="w-full rounded-xl border border-[#d6c4ac] p-3 text-xs focus:ring-2 focus:ring-[#ffb300] outline-none bg-white cursor-pointer"
                >
                  <option value="جديد (أول سكن)">جديد (أول سكن)</option>
                  <option value="1 - 5 سنوات">1 - 5 سنوات</option>
                  <option value="5 - 10 سنوات">5 - 10 سنوات</option>
                  <option value="أكثر من 10 سنوات">أكثر من 10 سنوات</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#514532] mb-1.5">رقم الطابق</label>
                <input
                  type="text"
                  value={floorNumber}
                  onChange={(e) => setFloorNumber(e.target.value)}
                  placeholder="مثلاً: الطابق الرابع"
                  className="w-full rounded-xl border border-[#d6c4ac] p-3 text-xs focus:ring-2 focus:ring-[#ffb300] outline-none"
                />
              </div>
            </div>

            {/* Right Box: Finishing & Furniture */}
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#d6c4ac]/40 flex flex-col justify-between space-y-6">
              <div>
                <span className="block text-xs font-bold text-[#514532] mb-3">
                  حالة التشطيب
                </span>
                <div className="space-y-3">
                  {[
                    'ممتاز / سوبر لوكس',
                    'جيد / تشطيب عادي',
                    'عظم / بدون تشطيب',
                  ].map((f) => (
                    <label
                      key={f}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        finishing === f
                          ? 'border-[#ffb300] bg-[#ffb300]/10 font-bold text-[#7e5700]'
                          : 'border-[#e5e2e1] hover:bg-[#f6f3f2] text-[#1c1b1b]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="finishing"
                        checked={finishing === f}
                        onChange={() => setFinishing(f as Property['finishing'])}
                        className="w-4 h-4 text-[#7e5700] focus:ring-0"
                      />
                      <span className="text-xs">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Furniture Toggle */}
              <div className="pt-6 border-t border-[#e5e2e1] flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-[#1c1b1b] block">حالة الفرش</span>
                  <p className="text-[11px] text-[#514532]">هل العقار يحتوي على أثاث كامل؟</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#514532]">
                    {furnished ? 'مفروش' : 'غير مفروش'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFurnished(!furnished)}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      furnished ? 'bg-[#ffb300]' : 'bg-[#d6c4ac]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform ${
                        furnished ? 'left-1' : 'left-6'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#f6f3f2] rounded-xl border border-[#d6c4ac]/30">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7e5700] mb-1">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>فحص وتدقيق سكاي لاند</span>
                </div>
                <p className="text-[11px] text-[#514532] leading-relaxed">
                  يتم التحقق من دقة المساحات والبيانات الهندسية بواسطة فريقنا قبل النشر النهائي في المنصة.
                </p>
              </div>
            </div>
          </div>

          {/* Media Manager */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-[#d6c4ac]/40 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-lg font-bold text-[#1c1b1b]">إدارة الوسائط</h3>
                <p className="text-xs text-[#514532]">
                  أضف صوراً وفيديوهات عالية الجودة لجذب المشترين والمستثمرين
                </p>
              </div>
              <button
                type="button"
                onClick={() => alert('تم تفعيل ميزة إرفاق رابط جولة الفيديو الافتراضية.')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-[#7e5700] text-[#7e5700] hover:bg-[#ffb300]/10 text-xs font-bold transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">video_call</span>
                <span>إضافة فيديو</span>
              </button>
            </div>

            {/* Drag & Drop Area */}
            <div
              onClick={handleAddSampleImage}
              className="border-2 border-dashed border-[#d6c4ac] rounded-2xl p-6 md:p-8 text-center bg-[#f6f3f2] hover:border-[#ffb300] transition-colors cursor-pointer group"
            >
              <span className="material-symbols-outlined text-4xl text-[#847560] group-hover:scale-110 transition-transform mb-2">
                cloud_upload
              </span>
              <p className="text-xs font-bold text-[#1c1b1b] mb-1">اسحب الصور وأفلتها هنا</p>
              <p className="text-[11px] text-[#514532] mb-3">
                أو اضغط لتصفح الملفات (PNG, JPG, بحد أقصى 10 ميجا)
              </p>
              <button
                type="button"
                className="bg-[#1c1b1b] text-white px-5 py-2 rounded-lg text-xs font-bold cursor-pointer hover:bg-black"
              >
                تصفح وإضافة صور جديدة
              </button>
            </div>

            {/* Image Previews */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mediaImages.map((img, idx) => {
                const isMain = idx === mainImageIndex;
                return (
                  <div
                    key={idx}
                    className={`relative rounded-xl overflow-hidden group shadow-xs border-2 transition-all ${
                      isMain ? 'border-[#ffb300]' : 'border-[#d6c4ac]/40 bg-white'
                    }`}
                  >
                    <div className="h-40 w-full overflow-hidden bg-[#e5e2e1]">
                      <img
                        src={img}
                        alt={`عقار ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(idx)}
                      className="absolute top-2 right-2 bg-[#ba1a1a] text-white p-1 rounded-lg hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
                      title="حذف الصورة"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>

                    {/* Main image label / selector */}
                    <div
                      onClick={() => setMainImageIndex(idx)}
                      className={`absolute bottom-0 inset-x-0 p-2 text-center text-xs font-bold cursor-pointer transition-colors ${
                        isMain
                          ? 'bg-[#ffb300] text-[#281900]'
                          : 'bg-black/60 text-white hover:bg-black/80'
                      }`}
                    >
                      {isMain ? '✓ الصورة الرئيسية' : 'تعيين كرئيسية'}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Ownership Type Section */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-[#d6c4ac]/40 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#1c1b1b]">نوع الملكية</h3>
              <p className="text-xs text-[#514532]">حدد الوضع القانوني الحالي للعقار بدقة</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { type: 'طابو أخضر', desc: 'سند ملكية دائم وسجل عقاري رسمي', icon: 'gavel' },
                { type: 'حكم محكمة', desc: 'وثائق قانونية مصدقة قضائياً', icon: 'description' },
                { type: 'وكالة عامة', desc: 'توكيل رسمي مصدق لدى كاتب العدل', icon: 'history_edu' },
              ].map((item) => (
                <label
                  key={item.type}
                  className={`border-2 rounded-2xl p-4 flex flex-col gap-2 cursor-pointer transition-all ${
                    ownership === item.type
                      ? 'border-[#ffb300] bg-[#ffb300]/10 shadow-xs'
                      : 'border-[#d6c4ac]/40 hover:border-[#ffb300]/60'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="material-symbols-outlined text-[#7e5700] text-2xl">
                      {item.icon}
                    </span>
                    <input
                      type="radio"
                      name="ownership"
                      checked={ownership === item.type}
                      onChange={() => setOwnership(item.type as Property['ownership'])}
                      className="w-4 h-4 text-[#7e5700] focus:ring-0"
                    />
                  </div>
                  <span className="text-sm font-bold text-[#1c1b1b]">{item.type}</span>
                  <span className="text-[11px] text-[#514532] leading-tight">{item.desc}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-[#d6c4ac]/40">
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="flex-1 sm:flex-none border border-[#d6c4ac] text-[#1c1b1b] font-bold text-xs px-8 py-3 rounded-xl hover:bg-[#f6f3f2] transition-colors cursor-pointer"
              >
                السابق
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none bg-[#ffb300] text-[#281900] font-bold text-xs px-10 py-3 rounded-xl hover:bg-[#fb7800] hover:text-white shadow-md transition-all active:scale-95 cursor-pointer"
              >
                إرسال للمراجعة
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                alert('تم حفظ البيانات كمسودة بنجاح.');
                onNavigate('profile');
              }}
              className="text-[#7e5700] hover:underline text-xs font-bold cursor-pointer"
            >
              حفظ كمسودة
            </button>
          </div>
        </form>
      </main>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-[#e5e2e1] space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-[#ffb300]/20 rounded-full flex items-center justify-center mx-auto text-[#7e5700]">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h3 className="text-xl font-bold text-[#1c1b1b]">تم الإرسال بنجاح</h3>
            <p className="text-xs text-[#514532] leading-relaxed">
              تم إرسال عقارك بنجاح وهو بانتظار مراجعة الإدارة والتدقيق الفني. ستتلقى إشعاراً فور اعتماده ونشره للعملاء.
            </p>
            <div className="flex gap-3 pt-3">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onNavigate('admin-dashboard');
                }}
                className="flex-1 py-3 bg-[#7e5700] text-white rounded-xl text-xs font-bold hover:bg-[#994700] transition-colors cursor-pointer"
              >
                معاينة في لوحة الإدارة
              </button>
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onNavigate('explore');
                }}
                className="flex-1 py-3 bg-[#ffb300] text-[#281900] rounded-xl text-xs font-bold hover:bg-[#fb7800] hover:text-white transition-colors cursor-pointer"
              >
                استكشاف العقارات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
