import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    tag: "UZCOMBINATOR 2024 · EDTECH STARTUP",
    title: "GlobalAdmit",
    subtitle: "Chet el va mahalliy universitetlarga tayyorlovchi yagona milliy platforma",
    bullets: [
      "🎯 Harvard, MIT va mahalliy oliygohlarga kirish uchun to'liq tayyorlov",
      "🇺🇿 Barcha qiyin mavzular va testlar uchun o'zbek tilida bosqichma-bosqich yechimlar",
      "⚡️ 700+ original savol, real vaqtli mock imtihonlar va sun'iy intellekt tahlili"
    ],
    highlight: "Shior: 'Harvarddan tortib mahalliy oliygohlargacha — barchasi ona tilingizda.'"
  },
  {
    tag: "MUAMMO",
    title: "Abituriyentlar nima uchun qiynalmoqda?",
    subtitle: "O'zbekistonda millionlab iqtidorli yoshlar 4 ta jiddiy to'siqqa duch keladi:",
    bullets: [
      "💸 Qimmat kurslar: Toshkentdagi SAT/IELTS kurslari oyiga $100–$200. Viloyatlardagi 80% oilalarning bunga qurbi yetmaydi.",
      "🌐 Til to'sig'i: Mavjud xalqaro platformalar (Khan Academy, UWorld) faqat ingliz tilida tushuntiradi.",
      "🧩 Resurslar tarqoqligi: SAT uchun alohida, IELTS uchun boshqa, DTM uchun qog'oz kitoblarga yugurishadi.",
      "📉 Ko'r-ko'rona test yechish: Qog'oz testlarda qaysi aniq mavzuda oqsayotganini tahlil qilish imkonsiz."
    ],
    highlight: "Natija: Viloyatlardagi iqtidorli yoshlar sifatli tayyorgarlikdan uzilib qolmoqda."
  },
  {
    tag: "YECHIM",
    title: "GlobalAdmit — Barchasi bitta joyda",
    subtitle: "Zamonaviy, hamyonbop va to'liq o'zbek tilidagi ta'lim platformasi:",
    bullets: [
      "💡 Ona tilidagi yechimlar: Har bir qiyin savolga o'zbek tilida batafsil tushuntirish va formulalar.",
      "🏛 Birgalikdagi ekotizim: SAT (Matematika & Ingliz tili), IELTS va DTM bitta akkauntda.",
      "⚡️ 10 barobar arzon: Har qanday oila farzandi oyiga arzon narxda mustaqil tayyorlana oladi.",
      "🤖 AI Tahlil & Diagnostika: Tizim zaif mavzularni avtomatik aniqlab, shaxsiy reja tuzadi."
    ],
    highlight: "Biz ta'limdagi poytaxt va viloyat o'rtasidagi tengsizlikni yo'qotamiz."
  },
  {
    tag: "BOZOR HAJMI (MARKET SIZE)",
    title: "Katta va jadal o'sayotgan EdTech bozori",
    subtitle: "O'zbekistonda yoshlar demografiyasi va xalqaro ta'limga talab cho'qqida:",
    bullets: [
      "🌍 TAM (Umumiy bozor): Har yili 1 000 000+ o'zbekistonlik abituriyent OTMlarga hujjat topshiradi.",
      "🎯 SAM (Bizning auditoriya): 150 000 – 200 000 nafar xalqaro va nufuzli mahalliy oliygohlarga tayyorlanuvchilar.",
      "💰 Bozor hajmi (pulda): Yillik ~$30M – $50M lik repetitorlik va imtihonlarga tayyorlov bozori.",
      "📈 Davlat qo'llovi: Hukumat xalqaro sertifikat olgan yoshlarning imtihon xarajatlarini to'liq qoplab bermoqda."
    ],
    highlight: "Bozor hajmi: ~$40M yoki 1 000 000 abituriyent."
  },
  {
    tag: "MAHSULOT VA TEXNOLOGIYA (MVP)",
    title: "Platforma allaqachon ishlab turibdi!",
    subtitle: "FastAPI backend, React frontend va SQLite/PostgreSQL ma'lumotlar bazasi:",
    bullets: [
      "📚 700+ Original savollar: SAT Math, SAT English, IELTS va DTM bo'yicha boyitilgan savollar banki.",
      "⏱ Haqiqiy Mock imtihon: Vaqt chegaralangan rasmiy formatdagi moslashuvchan testlar.",
      "🔒 Xavfsiz arxitektura: JWT autentifikatsiya, yashirin javoblar, Rate Limiting va HTTPS.",
      "🏆 Gamifikatsiya & Reyting: Streak (🔥), umumiy reyting peshqadami va motivatsiya beruvchi ballar."
    ],
    highlight: "Kod tayyor, testdan o'tgan va serverda ishlab turibdi."
  },
  {
    tag: "BIZNES MODEL (MONETIZATION)",
    title: "Qanday daromad qilamiz? (Freemium)",
    subtitle: "Iste'molchilar va o'quv markazlari uchun ikki bosqichli monetizatsiya:",
    bullets: [
      "🆓 Bepul (Free tier): Diagnostik test, kunlik 10-20 ta mashq savoli va umumiy reyting.",
      "💎 Pullik obuna (B2C Premium): Oyiga 60 000 – 90 000 so'm ($5–$8). To'liq mocklar, cheksiz testlar, AI xatolar tahlili.",
      "🏫 O'quv markazlariga litsenziya (B2B): Repetitorlar va xususiy maktablarga o'quvchilarni testlash tizimini sotish.",
      "💳 Mahalliy to'lovlar: Click va Payme orqali 1 bosqichda to'lov qilish imkoniyati."
    ],
    highlight: "Target: 5 000 ta to'lovchi obunachi = Oyiga ~$35 000 barqaror daromad."
  },
  {
    tag: "RAQOBAT VA USTUNLIKLAR",
    title: "Nega aynan GlobalAdmit g'alaba qozonadi?",
    subtitle: "Raqobatchilardan farqimiz va bozordagi 'himoya devorimiz' (Moat):",
    bullets: [
      "❌ Khan Academy / UWorld: Faqat ingliz tilida, DTM yo'q, xalqaro kartalar talab qiladi, narxi $100+.",
      "❌ Oflayn repetitorlar: Narxi juda qimmat ($100–$200/oy), viloyatlarda yo'q, vaqtga bog'liq.",
      "✅ GlobalAdmit ustunligi: O'zbek tilidagi yechimlar + SAT va DTM yagona platformada + 10 barobar arzon + Click/Payme."
    ],
    highlight: "Biz nafaqat test beramiz, balki o'zbek tilida qadamma-qadam o'rgatamiz."
  },
  {
    tag: "NEGA AYNAN HOZIR? (WHY NOW)",
    title: "To'g'ri vaqt va strategik imkoniyat",
    subtitle: "Uchta global va mahalliy to'lqin ayni paytda birlashdi:",
    bullets: [
      "🏛 1. SAT yana majburiy bo'ldi: Harvard, MIT, Yale va Brown universitetlari test-optional siyosatini bekor qilib, SAT talabini qaytardi.",
      "💻 2. SAT to'liq Digital formatga o'tdi: Qog'oz kitoblar eskirib, aynan biznikidek onlayn platformalarga ehtiyoj paydo bo'ldi.",
      "🇺🇿 3. O'zbekistonda xalqaro sertifikatlar bumu: Yoshlar orasida IELTS/SAT olish har qachongidan ommalashdi, lekin mahalliy tilda yagona platforma hali yo'q."
    ],
    highlight: "Birinchi bo'lib ushbu bo'shliqni egallashning ayni vaqti!"
  },
  {
    tag: "MIJOZLARNI JALB QILISH (GTM)",
    title: "Ilk 1 000 foydalanuvchini qanday jalb qilamiz?",
    subtitle: "0 xarajat bilan organik va virusli o'sish strategiyasi:",
    bullets: [
      "📢 Telegram hamjamiyatlari: Mavjud abituriyent va SAT kanallarida bepul diagnostik testlar e'lon qilish.",
      "🔄 Referral dasturi: '3 ta sinfdoshingni taklif qil va to'liq mock testni bepul och' mexanizmi.",
      "🏫 Maktab va litseylar: Toshkent va viloyatlardagi 10-11 sinf o'quvchilari o'rtasida bepul sinov olimpiadalari.",
      "👨‍🏫 Repetitorlar bilan sheriklik: O'qituvchilarga o'z o'quvchilarini tizimimizda bepul tekshirish vositasini berish."
    ],
    highlight: "Maqsad: Birinchi 3 oyda 10 000 ro'yxatdan o'tgan foydalanuvchi va 500 ta pullik obunachi."
  },
  {
    tag: "JAMOA VA KELAJAK",
    title: "GlobalAdmit — Ta'limni hammabop qilamiz",
    subtitle: "Kuchli motivatsiyaga ega dasturchilar va SAT/IELTS ekspertlari jamoasi:",
    bullets: [
      "🚀 Texnik salohiyat: To'liq ishlaydigan xavfsiz MVP tayyor va ishga tushirilgan.",
      "🤝 Inkubator maqsadi: UzCombinator ko'magida birinchi 5 000 faol foydalanuvchini jalb qilish va mobil ilovani chiqarish.",
      "🌐 Veb-sayt: http://localhost:5173",
      "📞 Aloqa: Jasur Karimov · info@globaladmit.uz · +998 90 123 45 67"
    ],
    highlight: "UzCombinator 2024 kohortiga tayyormiz!"
  }
];

export default function PitchDeckPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        setCurrent((c) => Math.min(SLIDES.length - 1, c + 1));
      } else if (e.key === "ArrowLeft") {
        setCurrent((c) => Math.max(0, c - 1));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const slide = SLIDES[current];

  return (
    <div style={{ minHeight: "92vh", display: "flex", flexDirection: "column", padding: "1.5rem 1rem" }}>
      <div className="container" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        
        {/* Navigation & Progress bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {SLIDES.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: "28px",
                  height: "6px",
                  borderRadius: "3px",
                  background: i === current ? "var(--primary)" : i < current ? "var(--accent-2)" : "rgba(255,255,255,0.15)",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              />
            ))}
          </div>

          <div style={{ color: "var(--text-3)", fontSize: "0.9rem", fontWeight: 700 }}>
            {current + 1} / {SLIDES.length}
          </div>
        </div>

        {/* Slide Card */}
        <div
          className="card"
          style={{
            minHeight: "440px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))",
            border: "1px solid rgba(108,99,255,0.25)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            padding: "2.5rem",
          }}
        >
          <div>
            <div style={{ color: "var(--primary)", fontWeight: 800, fontSize: "0.85rem", letterSpacing: "1px", marginBottom: "0.5rem" }}>
              {slide.tag}
            </div>
            <h1 style={{ fontSize: "2.3rem", marginBottom: "0.5rem", color: "#fff" }}>
              {slide.title}
            </h1>
            <p style={{ fontSize: "1.1rem", color: "var(--text-2)", marginBottom: "2rem" }}>
              {slide.subtitle}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {slide.bullets.map((b, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    fontSize: "1.05rem",
                    lineHeight: "1.6",
                    color: "var(--text-1)",
                  }}
                >
                  <span style={{ color: "var(--accent-2)", fontWeight: 700 }}>•</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: "2.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem"
            }}
          >
            <div style={{ color: "var(--orange)", fontWeight: 600, fontSize: "0.95rem" }}>
              💡 {slide.highlight}
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
              >
                ← Oldingi
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setCurrent((c) => Math.min(SLIDES.length - 1, c + 1))}
                disabled={current === SLIDES.length - 1}
              >
                Keyingi →
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
