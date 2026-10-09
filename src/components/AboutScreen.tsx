import React, { useState } from 'react';
import { SERVICES_LIST, ADVANTAGES_LIST } from '../data/mockData';

interface AboutScreenProps {
  onNavigate: (screen: string) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] pb-28 font-['IBM_Plex_Sans_Arabic']">
      {/* Hero Section */}
      <section className="relative h-[480px] md:h-[540px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAr5iGU26WmuegCjj2J0dojwkQ7hn3W3S2d9O5buPfbHeAB3MMAgg0WR3pAZCU1b2rLR0QVXWgplfaExJqJARrlrEVwQ6tCFbKs0EoZz_qNDLOnYBGmh0UZuNyd2vf4oceCdLI6STq5xGQOTAuPso-41jbYnwD6AVduXCPCqJjYEabXWsvCKqHVQGQpYcJYIg4r0S-a99zXiFvWmPBeh1r1uS4zMISSkpFTPmFwpSsQ9XQGWoQm4ZQXC8dMU-l2Y6WkSZw51eYVUzk0')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b]/95 via-[#1c1b1b]/60 to-[#1c1b1b]/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <span className="inline-block bg-[#ffb300]/25 text-[#ffdeac] px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-[#ffb300]/30 shadow-xs">
            نبذة عن الشركة ورسالتنا
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-sm font-['IBM_Plex_Sans_Arabic']">
            عن سكاي لاند
          </h1>
          <p className="text-base sm:text-lg text-white/90 mb-8 max-w-xl mx-auto leading-relaxed">
            شريكك الموثوق في بيع، شراء، استثمار، تأجير وتطوير العقارات في طرطوس وكافة المحافظات السورية.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('contact-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#ffb300] hover:bg-[#fb7800] text-[#281900] hover:text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              اتصل بنا
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer border border-white/30"
            >
              استكشف مشاريعنا
            </button>
          </div>
        </div>
      </section>

      {/* Legacy & Story */}
      <section className="py-16 px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Photo */}
          <div className="w-full aspect-video md:aspect-square rounded-3xl overflow-hidden shadow-xl border border-[#e5e2e1]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVQ5qX3VuzkkAZuRI3-xRrJcEgOqococooqg9CQjBys61Fc_hexJBYHTUhlqHTWO6Sd73fE4_UG0_P26kvgkzNF25agCBYf1gy_0NxNDPbq-PLQCv6I6Q8XzyG59yQYbozfCCkmYYRUTgCf-hneZxUa9sk-eBrzOYMyIFz4u0hfpAQjEAlGKPqVpmMt5tdhcG7D3t7-jS1BqpEuftSwutO_Ii4EPzgufRWOuWaEe2JF4xPvgE6TWDcDKmimUwr6JcoDGoEkBhVD4ZO"
              alt="مقر سكاي لاند في طرطوس"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="text-right space-y-5">
            <span className="text-[#7e5700] text-xs font-bold tracking-widest uppercase block">
              إرثنا العقاري
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1c1b1b]">
              متجذرون في طرطوس، ملتزمون بالتميز
            </h2>
            <div className="space-y-4 text-sm text-[#514532] leading-relaxed">
              <p>
                سكاي لاند هي شركة عقارية حديثة مقرها طرطوس، سوريا، مكرسة لتقديم خدمات عقارية شاملة باحترافية عالية. تأسست برؤية واضحة تهدف إلى سد الفجوة بين الوساطة التقليدية والاحتياجات المتطورة للمستثمرين في السوق السوري.
              </p>
              <p>
                رحلتنا مبنية على الثقة؛ فنحن لا نبيع مساحات فحسب، بل نبني علاقات طويلة الأمد تعتمد على الخبرة المحلية العميقة والشفافية المطلقة في كافة التعاملات، من قلب شارع الثورة وحتى أرقى المشاريع الساحلية والجبلية.
              </p>
            </div>

            <div className="mt-6 border-r-4 border-[#ffb300] pr-6 italic text-[#514532] text-sm bg-[#f6f3f2] py-4 rounded-l-2xl">
              "في سكاي لاند، نؤمن بأن كل قطعة أرض تحمل حلماً. مهمتنا هي أن نكون الجسر الذي يربط ذلك الحلم بالواقع."
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#f6f3f2] py-14 px-4 md:px-12 border-y border-[#e5e2e1]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-xs border border-[#e5e2e1] text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[#ffb300]/20 rounded-2xl flex items-center justify-center mb-4 text-[#7e5700]">
              <span className="material-symbols-outlined text-3xl">rocket_launch</span>
            </div>
            <h3 className="text-xl font-bold text-[#1c1b1b] mb-3">أهدافنا</h3>
            <p className="text-sm text-[#514532] leading-relaxed">
              مساعدتكم في العثور على العقار المثالي مع تقديم نصيحة صادقة ودقيقة، وضمان تجربة عقارية سلسة تعطي الأولوية لأمنكم واستثماركم طويل الأمد في سوريا.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xs border border-[#e5e2e1] text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[#ffb300]/20 rounded-2xl flex items-center justify-center mb-4 text-[#7e5700]">
              <span className="material-symbols-outlined text-3xl">visibility</span>
            </div>
            <h3 className="text-xl font-bold text-[#1c1b1b] mb-3">رؤيتنا</h3>
            <p className="text-sm text-[#514532] leading-relaxed">
              أن نكون الشركة الرائدة بلا منازع في تكنولوجيا العقارات والسكن الفاخر في المنطقة الساحلية وسوريا، واضعين المعايير الذهبية في الدقة الهندسية وخدمة العملاء.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid (12 services) */}
      <section className="py-16 px-4 md:px-12 max-w-[1280px] mx-auto text-right">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1c1b1b] mb-2">
            خدماتنا الشاملة
          </h2>
          <p className="text-sm text-[#514532]">
            أبعد من مجرد وساطة، نقدم منظومة متكاملة من الخدمات العقارية والهندسية والتسويقية
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SERVICES_LIST.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-[#d6c4ac]/40 hover:border-[#ffb300] hover:shadow-md transition-all group cursor-pointer flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-[#f6f3f2] group-hover:bg-[#ffb300] rounded-xl flex items-center justify-center text-[#7e5700] group-hover:text-[#281900] transition-colors mb-3">
                <span className="material-symbols-outlined text-2xl">{srv.icon}</span>
              </div>
              <h4 className="text-xs md:text-sm font-bold text-[#1c1b1b]">{srv.label}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Band */}
      <section className="bg-[#1c1b1b] py-14 px-4 md:px-12 text-white relative overflow-hidden">
        <div className="blueprint-pattern absolute inset-0 opacity-20 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-black text-[#ffdeac] mb-1 font-mono">
              +500
            </div>
            <div className="text-xs text-[#e5e2e1] uppercase tracking-wider">عقار مدرج</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-[#ffdeac] mb-1 font-mono">
              +300
            </div>
            <div className="text-xs text-[#e5e2e1] uppercase tracking-wider">عميل راضٍ</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-[#ffdeac] mb-1 font-mono">
              +100
            </div>
            <div className="text-xs text-[#e5e2e1] uppercase tracking-wider">صفقة ناجحة</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-[#ffdeac] mb-1 font-mono">
              24/7
            </div>
            <div className="text-xs text-[#e5e2e1] uppercase tracking-wider">دعم فني واستشاري</div>
          </div>
        </div>
      </section>

      {/* 8 Advantages */}
      <section className="py-16 px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1c1b1b] mb-2">
            لماذا تختار سكاي لاند؟
          </h2>
          <p className="text-sm text-[#514532]">المزايا والضمانات التي تجعلنا الخيار الأول للمستثمرين</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ADVANTAGES_LIST.map((adv, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-[#e5e2e1] hover:border-[#ffb300] hover:shadow-xs transition-all flex gap-4 text-right"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#ffdeac]/30 shrink-0 flex items-center justify-center text-[#7e5700]">
                <span className="material-symbols-outlined text-2xl">{adv.icon}</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1c1b1b] mb-1">{adv.title}</h4>
                <p className="text-xs text-[#514532] leading-relaxed">{adv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Map Section */}
      <section id="contact-section" className="py-10 px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#e5e2e1] grid grid-cols-1 lg:grid-cols-2">
          {/* Details */}
          <div className="p-8 md:p-12 text-right space-y-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-[#1c1b1b] border-r-4 border-[#ffb300] pr-3">
              تواصل معنا
            </h2>

            <div className="space-y-4 text-sm text-[#514532]">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#7e5700] text-2xl">location_on</span>
                <div>
                  <p className="font-bold text-[#1c1b1b]">طرطوس - شارع الثورة</p>
                  <p className="text-xs text-[#514532]">مقابل فادي كوكتيل، مكتب سكاي لاند العقارية</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#7e5700] text-2xl">call</span>
                <div>
                  <a href="tel:+963932400182" className="font-bold text-[#1c1b1b] hover:text-[#7e5700]" dir="ltr">
                    +963 932 400 182
                  </a>
                  <p className="text-xs text-[#514532]">اتصال هاتفي مباشر</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#25D366] text-2xl material-symbols-filled">chat</span>
                <div>
                  <a href="https://wa.me/963992524874" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1c1b1b] hover:text-[#25D366]" dir="ltr">
                    +963 992 524 874
                  </a>
                  <p className="text-xs text-[#514532]">محادثة واتساب سريعة</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#7e5700] text-2xl">schedule</span>
                <div>
                  <p className="font-bold text-[#1c1b1b]">ساعات العمل</p>
                  <p className="text-xs text-[#514532]">السبت - الخميس: 9:00 صباحاً - 7:00 مساءً</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="bg-[#ffb300] text-[#281900] hover:bg-[#fb7800] hover:text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                إرسال استفسار فوري
              </button>
            </div>
          </div>

          {/* Map Image preview with Google Maps link */}
          <div className="relative min-h-[360px] bg-[#e5e2e1]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGOgO1J8k9VLknaTnz9lLtmwET2q7O3qDFFXOMO1jtqA_0emjaPjC7fcWBcp-B2SQMzfZ77KGUnVlsLD4RqYu52MvHlY1RpGnDAW8FmxcTk5bMZ2EVA6Eg1IRVA-fYAI8TFPQeEZ_XpX1p_zkXeBazCZ4F5UYN2MR_Weka722wLJMQclQnSzoVviINjwA42Sb7UfFKJ579Ay8Fg8wdMJxc5ErqLQDnIprHhUSGY_T6nEg7BHM5NGrnm6NpDr382zLCxwc_z8vB7Pr4"
              alt="موقع مكتب سكاي لاند في طرطوس"
              className="w-full h-full object-cover grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-4">
              <a
                href="https://maps.app.goo.gl/BK8AWLSK6sW2HX519"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ffb300] hover:bg-[#fb7800] text-[#281900] hover:text-white px-6 py-3.5 rounded-full font-bold text-xs flex items-center gap-2 shadow-2xl transition-all cursor-pointer border-2 border-white"
              >
                <span className="material-symbols-outlined text-base animate-bounce">location_on</span>
                <span>استعرض على خرائط GOOGLE</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-8 px-4 md:px-12 max-w-[1280px] mx-auto text-center">
        <div className="bg-[#7e5700] p-8 md:p-14 rounded-3xl text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold font-['IBM_Plex_Sans_Arabic']">
              جاهز للعثور على عقارك القادم؟
            </h2>
            <p className="text-xs md:text-sm text-white/90 leading-relaxed">
              تواصل مع وكلائنا المختصين اليوم للحصول على استشارة مجانية أو جولة مخصصة لعقاراتنا المميزة في طرطوس وسوريا.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href="tel:+963932400182"
                className="bg-white text-[#7e5700] px-6 py-3.5 rounded-xl font-bold text-xs hover:bg-[#f6f3f2] transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span className="material-symbols-outlined text-base">call</span>
                <span>اتصل الآن</span>
              </a>
              <a
                href="https://wa.me/963992524874"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-bold text-xs hover:brightness-110 transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span className="material-symbols-outlined text-base material-symbols-filled">chat</span>
                <span>واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Inquiry Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#e5e2e1] text-right space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#e5e2e1]">
              <h3 className="font-bold text-base text-[#1c1b1b]">استفسار مباشر لمكتب سكاي لاند</h3>
              <button
                onClick={() => setInquiryModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f6f3f2]"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <span className="material-symbols-outlined text-4xl text-emerald-600">check_circle</span>
                <p className="font-bold text-sm text-[#1c1b1b]">تم إرسال رسالتك بنجاح!</p>
                <p className="text-xs text-[#514532]">سيتواصل معك فريق الاستشارات الهندسية في أقرب وقت.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                  setTimeout(() => {
                    setSubmitted(false);
                    setInquiryModalOpen(false);
                  }, 2000);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block font-bold text-[#514532] mb-1">الاسم الكريم</label>
                  <input
                    required
                    type="text"
                    placeholder="الاسم الثلاثي"
                    className="w-full p-3 rounded-xl border border-[#d6c4ac] outline-none focus:ring-2 focus:ring-[#ffb300]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#514532] mb-1">رقم الهاتف</label>
                  <input
                    required
                    type="tel"
                    dir="ltr"
                    placeholder="+963 ..."
                    className="w-full p-3 rounded-xl border border-[#d6c4ac] outline-none focus:ring-2 focus:ring-[#ffb300] text-right"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#514532] mb-1">نوع الخدمة المطلوبة</label>
                  <select className="w-full p-3 rounded-xl border border-[#d6c4ac] outline-none">
                    <option>شراء عقار</option>
                    <option>بيع عقار</option>
                    <option>استشارات هندسية وإكساء</option>
                    <option>استثمار عقاري</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#514532] mb-1">رسالتك</label>
                  <textarea
                    rows={3}
                    placeholder="تفاصيل طلبك أو استفسارك..."
                    className="w-full p-3 rounded-xl border border-[#d6c4ac] outline-none focus:ring-2 focus:ring-[#ffb300]"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-[#d6c4ac] font-bold text-[#514532]"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-[#ffb300] text-[#281900] font-bold hover:bg-[#fb7800] hover:text-white transition-colors"
                  >
                    إرسال
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
