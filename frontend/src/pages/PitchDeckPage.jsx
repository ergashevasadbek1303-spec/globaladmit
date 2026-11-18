import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../i18n/LanguageContext";

/* ─── Slide data for all 3 languages ──────────────────────────── */
const SLIDES_DATA = {
  uz: [
    {
      tag: "UZCOMBINATOR 2024 · EDTECH STARTUP",
      title: "GlobalAdmit",
      subtitle: "Chet el va mahalliy universitetlarga tayyorlovchi yagona milliy platforma",
      bullets: [
        "🎯 Harvard, MIT va mahalliy oliygohlarga kirish uchun to'liq tayyorlov",
        "🌐 Barcha qiyin mavzular uchun o'zbek, rus va ingliz tillarida yechimlar",
        "⚡️ 700+ original savol, real vaqtli mock imtihonlar va AI tahlili",
      ],
      highlight: "Shior: 'Harvarddan tortib mahalliy oliygohlargacha — barchasi 3 tilda.'",
    },
    {
      tag: "MUAMMO",
      title: "Abituriyentlar nima uchun qiynalmoqda?",
      subtitle: "O'zbekistonda millionlab iqtidorli yoshlar 4 ta jiddiy to'siqqa duch keladi:",
      bullets: [
        "💸 Qimmat kurslar: Toshkentdagi SAT/IELTS kurslari oyiga $100–$200. Viloyatlardagi 80% oilalarning bunga qurbi yetmaydi.",
        "🌐 Til to'sig'i: Mavjud xalqaro platformalar (Khan Academy, UWorld) faqat ingliz tilida tushuntiradi.",
        "🧩 Resurslar tarqoqligi: SAT uchun alohida, IELTS uchun boshqa, DTM uchun qog'oz kitoblarga yugurishadi.",
        "📉 Ko'r-ko'rona test yechish: Qog'oz testlarda qaysi mavzuda zaif ekanini tahlil qilish imkonsiz.",
      ],
      highlight: "Natija: Viloyatlardagi iqtidorli yoshlar sifatli tayyorgarlikdan uzilib qolmoqda.",
    },
    {
      tag: "YECHIM",
      title: "GlobalAdmit — Barchasi bitta joyda",
      subtitle: "Zamonaviy, hamyonbop va ko'p tillidagi ta'lim platformasi:",
      bullets: [
        "💡 3 tilda yechimlar: Har bir qiyin savolga o'zbek, rus yoki ingliz tilida batafsil tushuntirish.",
        "🏛 Birgalikdagi ekotizim: SAT, IELTS va DTM bitta akkauntda.",
        "⚡️ 10 barobar arzon: Har qanday oila farzandi oyiga arzon narxda mustaqil tayyorlana oladi.",
        "🤖 AI Tahlil & Diagnostika: Tizim zaif mavzularni avtomatik aniqlab, shaxsiy reja tuzadi.",
      ],
      highlight: "Biz ta'limdagi poytaxt va viloyat o'rtasidagi tengsizlikni yo'qotamiz.",
    },
    {
      tag: "BOZOR HAJMI",
      title: "Katta va jadal o'sayotgan EdTech bozori",
      subtitle: "O'zbekistonda yoshlar demografiyasi va xalqaro ta'limga talab cho'qqida:",
      bullets: [
        "🌍 TAM: Har yili 1 000 000+ o'zbekistonlik abituriyent OTMlarga hujjat topshiradi.",
        "🎯 SAM: 150 000–200 000 nafar xalqaro va nufuzli mahalliy oliygohlarga tayyorlanuvchilar.",
        "💰 Bozor hajmi: Yillik ~$30M–$50M lik repetitorlik va imtihonlarga tayyorlov bozori.",
        "📈 Davlat qo'llovi: Hukumat xalqaro sertifikat olgan yoshlarning xarajatlarini qoplab bermoqda.",
      ],
      highlight: "Bozor hajmi: ~$40M yoki 1 000 000 abituriyent.",
    },
    {
      tag: "MAHSULOT VA TEXNOLOGIYA (MVP)",
      title: "Platforma allaqachon ishlab turibdi!",
      subtitle: "FastAPI backend, React frontend va SQLite/PostgreSQL ma'lumotlar bazasi:",
      bullets: [
        "📚 700+ Original savollar: SAT Math, SAT English, IELTS va DTM bo'yicha boyitilgan savollar banki.",
        "⏱ Haqiqiy Mock imtihon: Vaqt chegaralangan rasmiy formatdagi moslashuvchan testlar.",
        "🔒 Xavfsiz arxitektura: JWT autentifikatsiya, yashirin javoblar, Rate Limiting va HTTPS.",
        "🏆 Gamifikatsiya & Reyting: Streak (🔥), umumiy reyting peshqadami va motivatsiya beruvchi ballar.",
      ],
      highlight: "Kod tayyor, testdan o'tgan va serverda ishlab turibdi.",
    },
    {
      tag: "BIZNES MODEL",
      title: "Qanday daromad qilamiz? (Freemium)",
      subtitle: "Iste'molchilar va o'quv markazlari uchun ikki bosqichli monetizatsiya:",
      bullets: [
        "🆓 Bepul (Free tier): Diagnostik test, kunlik 10–20 ta mashq savoli va umumiy reyting.",
        "💎 Pullik obuna (B2C): Oyiga 60 000–90 000 so'm ($5–$8). To'liq mocklar, cheksiz testlar, AI tahlil.",
        "🏫 O'quv markazlariga litsenziya (B2B): Repetitorlar va xususiy maktablarga testlash tizimini sotish.",
        "💳 Mahalliy to'lovlar: Click va Payme orqali 1 bosqichda to'lov qilish imkoniyati.",
      ],
      highlight: "Target: 5 000 ta to'lovchi obunachi = Oyiga ~$35 000 barqaror daromad.",
    },
    {
      tag: "RAQOBAT VA USTUNLIKLAR",
      title: "Nega aynan GlobalAdmit g'alaba qozonadi?",
      subtitle: "Raqobatchilardan farqimiz va bozordagi 'himoya devorimiz':",
      bullets: [
        "❌ Khan Academy / UWorld: Faqat ingliz tilida, DTM yo'q, narxi $100+.",
        "❌ Oflayn repetitorlar: Narxi juda qimmat ($100–$200/oy), viloyatlarda yo'q.",
        "✅ GlobalAdmit: 3 tilda yechimlar + SAT va DTM yagona platformada + 10 barobar arzon + Click/Payme.",
      ],
      highlight: "Biz nafaqat test beramiz, balki 3 tilda qadamma-qadam o'rgatamiz.",
    },
    {
      tag: "NEGA AYNAN HOZIR?",
      title: "To'g'ri vaqt va strategik imkoniyat",
      subtitle: "Uchta global va mahalliy to'lqin ayni paytda birlashdi:",
      bullets: [
        "🏛 SAT yana majburiy bo'ldi: Harvard, MIT, Yale SAT talabini qaytardi.",
        "💻 SAT to'liq Digital formatga o'tdi: Aynan biznikidek onlayn platformalarga ehtiyoj paydo bo'ldi.",
        "🇺🇿 O'zbekistonda xalqaro sertifikatlar bumi: IELTS/SAT ommalashdi, lekin mahalliy tilda yagona platforma yo'q.",
      ],
      highlight: "Birinchi bo'lib ushbu bo'shliqni egallashning ayni vaqti!",
    },
    {
      tag: "MIJOZLARNI JALB QILISH (GTM)",
      title: "Ilk 1 000 foydalanuvchini qanday jalb qilamiz?",
      subtitle: "0 xarajat bilan organik va virusli o'sish strategiyasi:",
      bullets: [
        "📢 Telegram hamjamiyatlari: Mavjud abituriyent kanallarida bepul diagnostik testlar e'lon qilish.",
        "🔄 Referral dasturi: '3 ta sinfdoshingni taklif qil va to'liq mock testni bepul och' mexanizmi.",
        "🏫 Maktab va litseylar: Toshkent va viloyatlardagi 10–11 sinf o'quvchilari orasida bepul olimpiada.",
        "👨‍🏫 Repetitorlar bilan sheriklik: O'qituvchilarga o'z o'quvchilarini bepul tekshirish vositasini berish.",
      ],
      highlight: "Maqsad: Birinchi 3 oyda 10 000 foydalanuvchi va 500 ta pullik obunachi.",
    },
    {
      tag: "JAMOA VA KELAJAK",
      title: "GlobalAdmit — Ta'limni hammabop qilamiz",
      subtitle: "Kuchli motivatsiyaga ega dasturchilar va SAT/IELTS ekspertlari jamoasi:",
      bullets: [
        "🚀 Texnik salohiyat: To'liq ishlaydigan xavfsiz MVP tayyor va ishga tushirilgan.",
        "🤝 Inkubator maqsadi: UzCombinator ko'magida birinchi 5 000 faol foydalanuvchini jalb qilish.",
        "🌐 Platforma: globaladmit.uz",
        "📞 Aloqa: info@globaladmit.uz · +998 90 123 45 67",
      ],
      highlight: "UzCombinator 2024 kohortiga tayyormiz!",
    },
  ],

  ru: [
    {
      tag: "UZCOMBINATOR 2024 · EDTECH СТАРТАП",
      title: "GlobalAdmit",
      subtitle: "Единая национальная платформа подготовки к зарубежным и местным вузам",
      bullets: [
        "🎯 Полная подготовка для поступления в Harvard, MIT и местные университеты",
        "🌐 Объяснения по всем сложным темам на узбекском, русском и английском языках",
        "⚡️ 700+ оригинальных вопросов, пробные экзамены в реальном времени и AI-аналитика",
      ],
      highlight: "Слоган: 'От Гарварда до местных вузов — всё на вашем языке.'",
    },
    {
      tag: "ПРОБЛЕМА",
      title: "Почему абитуриенты испытывают трудности?",
      subtitle: "Миллионы талантливых молодых людей в Узбекистане сталкиваются с 4 серьёзными барьерами:",
      bullets: [
        "💸 Дорогие курсы: Курсы SAT/IELTS в Ташкенте стоят $100–$200 в месяц. 80% семей в регионах не могут себе этого позволить.",
        "🌐 Языковой барьер: Международные платформы (Khan Academy, UWorld) дают объяснения только на английском.",
        "🧩 Разрозненность ресурсов: Для SAT — одно место, для IELTS — другое, для DTM — бумажные учебники.",
        "📉 Слепое решение тестов: По бумажным тестам невозможно проанализировать, по каким темам есть слабые места.",
      ],
      highlight: "Итог: Талантливая молодёжь регионов лишена качественной подготовки.",
    },
    {
      tag: "РЕШЕНИЕ",
      title: "GlobalAdmit — Всё в одном месте",
      subtitle: "Современная, доступная и многоязычная образовательная платформа:",
      bullets: [
        "💡 Объяснения на 3 языках: Подробный разбор каждого сложного вопроса на узбекском, русском или английском.",
        "🏛 Единая экосистема: SAT, IELTS и DTM — в одном аккаунте.",
        "⚡️ В 10 раз дешевле: Любой студент может готовиться самостоятельно по доступной цене.",
        "🤖 AI-аналитика и диагностика: Система автоматически выявляет слабые темы и составляет личный план.",
      ],
      highlight: "Мы устраняем разрыв в качестве образования между столицей и регионами.",
    },
    {
      tag: "ОБЪЁМ РЫНКА",
      title: "Крупный и быстрорастущий рынок EdTech",
      subtitle: "Демография молодёжи и спрос на международное образование в Узбекистане на пике:",
      bullets: [
        "🌍 TAM: Ежегодно более 1 000 000 абитуриентов Узбекистана подают документы в вузы.",
        "🎯 SAM: 150 000–200 000 студентов, готовящихся к международным и престижным местным вузам.",
        "💰 Объём рынка: ~$30M–$50M в год — рынок репетиторства и подготовки к экзаменам.",
        "📈 Государственная поддержка: Правительство компенсирует расходы на международные сертификаты.",
      ],
      highlight: "Объём рынка: ~$40M или 1 000 000 абитуриентов.",
    },
    {
      tag: "ПРОДУКТ И ТЕХНОЛОГИИ (MVP)",
      title: "Платформа уже работает!",
      subtitle: "Backend FastAPI, Frontend React и база данных SQLite/PostgreSQL:",
      bullets: [
        "📚 700+ оригинальных вопросов: Обширный банк вопросов по SAT Math, SAT English, IELTS и DTM.",
        "⏱ Реальные пробные экзамены: Гибкие тесты в официальном формате с таймером.",
        "🔒 Безопасная архитектура: JWT-аутентификация, скрытые ответы, Rate Limiting и HTTPS.",
        "🏆 Геймификация и рейтинг: Streak (🔥), общий лидерборд и мотивирующие очки.",
      ],
      highlight: "Код готов, протестирован и работает на сервере.",
    },
    {
      tag: "БИЗНЕС-МОДЕЛЬ",
      title: "Как мы зарабатываем? (Freemium)",
      subtitle: "Двухуровневая монетизация для потребителей и учебных центров:",
      bullets: [
        "🆓 Бесплатно (Free tier): Диагностический тест, 10–20 ежедневных упражнений и общий рейтинг.",
        "💎 Платная подписка (B2C): $5–$8 в месяц. Полные пробники, безлимитные тесты, AI-разбор ошибок.",
        "🏫 Лицензия для учебных центров (B2B): Продажа системы тестирования репетиторам и частным школам.",
        "💳 Местные платёжные системы: Оплата в один клик через Click и Payme.",
      ],
      highlight: "Цель: 5 000 платных подписчиков = ~$35 000 ежемесячного стабильного дохода.",
    },
    {
      tag: "КОНКУРЕНЦИЯ И ПРЕИМУЩЕСТВА",
      title: "Почему GlobalAdmit победит?",
      subtitle: "Наши отличия от конкурентов и 'защитный ров' на рынке:",
      bullets: [
        "❌ Khan Academy / UWorld: Только на английском, нет DTM, стоит $100+.",
        "❌ Офлайн-репетиторы: Очень дорого ($100–$200/мес.), недоступны в регионах.",
        "✅ GlobalAdmit: Объяснения на 3 языках + SAT и DTM на одной платформе + в 10 раз дешевле + Click/Payme.",
      ],
      highlight: "Мы не просто даём тесты — мы обучаем пошагово на трёх языках.",
    },
    {
      tag: "ПОЧЕМУ СЕЙЧАС?",
      title: "Правильный момент и стратегическая возможность",
      subtitle: "Три глобальных и местных волны совпали в одно время:",
      bullets: [
        "🏛 SAT снова стал обязательным: Harvard, MIT, Yale вернули требование SAT.",
        "💻 SAT перешёл в цифровой формат: Именно такие онлайн-платформы, как наша, стали необходимы.",
        "🇺🇿 Бум международных сертификатов в Узбекистане: IELTS/SAT стали популярны, но единой платформы на местных языках нет.",
      ],
      highlight: "Самое время занять эту нишу первыми!",
    },
    {
      tag: "ПРИВЛЕЧЕНИЕ КЛИЕНТОВ (GTM)",
      title: "Как мы привлечём первых 1 000 пользователей?",
      subtitle: "Стратегия органического и вирусного роста с нулевыми расходами:",
      bullets: [
        "📢 Telegram-сообщества: Публикация бесплатных диагностических тестов в существующих каналах абитуриентов.",
        "🔄 Реферальная программа: 'Пригласи 3 одноклассников и получи полный пробный экзамен бесплатно'.",
        "🏫 Школы и лицеи: Бесплатные пробные олимпиады для учеников 10–11 классов в Ташкенте и регионах.",
        "👨‍🏫 Партнёрство с репетиторами: Инструмент бесплатного тестирования учеников для учителей.",
      ],
      highlight: "Цель: 10 000 зарегистрированных пользователей и 500 платных подписчиков за первые 3 месяца.",
    },
    {
      tag: "КОМАНДА И БУДУЩЕЕ",
      title: "GlobalAdmit — Делаем образование доступным для всех",
      subtitle: "Команда мотивированных разработчиков и экспертов SAT/IELTS:",
      bullets: [
        "🚀 Технический потенциал: Полностью рабочий и защищённый MVP готов и запущен.",
        "🤝 Цель инкубатора: С поддержкой UzCombinator привлечь первых 5 000 активных пользователей.",
        "🌐 Платформа: globaladmit.uz",
        "📞 Контакт: info@globaladmit.uz · +998 90 123 45 67",
      ],
      highlight: "Готовы к когорте UzCombinator 2024!",
    },
  ],

  en: [
    {
      tag: "UZCOMBINATOR 2024 · EDTECH STARTUP",
      title: "GlobalAdmit",
      subtitle: "The single national platform for university admissions preparation — local & international",
      bullets: [
        "🎯 Complete preparation for Harvard, MIT and top local universities",
        "🌐 Step-by-step explanations in Uzbek, Russian & English for every tough topic",
        "⚡️ 700+ original questions, real-time mock exams and AI-powered analytics",
      ],
      highlight: "Mission: 'From Harvard to local universities — in your language.'",
    },
    {
      tag: "PROBLEM",
      title: "Why are students struggling?",
      subtitle: "Millions of talented young people in Uzbekistan face 4 critical barriers:",
      bullets: [
        "💸 Expensive courses: SAT/IELTS prep in Tashkent costs $100–$200/month. 80% of regional families cannot afford it.",
        "🌐 Language barrier: Major international platforms (Khan Academy, UWorld) explain only in English.",
        "🧩 Fragmented resources: Students juggle separate platforms for SAT, IELTS and paper books for DTM.",
        "📉 Blind test-taking: Paper tests give zero insight into which specific topics need improvement.",
      ],
      highlight: "Result: Talented students outside the capital are cut off from quality preparation.",
    },
    {
      tag: "SOLUTION",
      title: "GlobalAdmit — Everything in one place",
      subtitle: "A modern, affordable and multilingual educational platform:",
      bullets: [
        "💡 3-language explanations: Detailed breakdown of every question in Uzbek, Russian or English.",
        "🏛 Unified ecosystem: SAT, IELTS and DTM — all in one account.",
        "⚡️ 10× cheaper: Any student anywhere can study independently at a fraction of the cost.",
        "🤖 AI Analytics & Diagnostics: The system automatically pinpoints weak topics and builds a personal study plan.",
      ],
      highlight: "We eliminate the education gap between the capital and the regions.",
    },
    {
      tag: "MARKET SIZE",
      title: "A large and fast-growing EdTech market",
      subtitle: "Youth demographics and demand for international education in Uzbekistan are at a peak:",
      bullets: [
        "🌍 TAM: 1,000,000+ Uzbekistani applicants submit university applications every year.",
        "🎯 SAM: 150,000–200,000 students targeting international and top local universities.",
        "💰 Market size: ~$30M–$50M/year tutoring and exam prep market.",
        "📈 Government support: The government reimburses exam expenses for students who earn international certificates.",
      ],
      highlight: "Market size: ~$40M or 1,000,000 applicants.",
    },
    {
      tag: "PRODUCT & TECHNOLOGY (MVP)",
      title: "The platform is already live!",
      subtitle: "FastAPI backend, React frontend and SQLite/PostgreSQL database:",
      bullets: [
        "📚 700+ original questions: Rich question bank covering SAT Math, SAT English, IELTS and DTM.",
        "⏱ Real mock exams: Flexible timed tests in the official exam format.",
        "🔒 Secure architecture: JWT authentication, hidden answers, Rate Limiting and HTTPS.",
        "🏆 Gamification & leaderboard: Streak (🔥), global rankings and motivating point system.",
      ],
      highlight: "Code is ready, tested and running on a live server.",
    },
    {
      tag: "BUSINESS MODEL",
      title: "How do we make money? (Freemium)",
      subtitle: "Two-tier monetisation for consumers and study centres:",
      bullets: [
        "🆓 Free tier: Diagnostic test, 10–20 daily practice questions and public leaderboard.",
        "💎 Paid subscription (B2C): $5–$8/month. Full mock exams, unlimited tests, AI error analysis.",
        "🏫 Study centre licence (B2B): Selling the testing system to tutors and private schools.",
        "💳 Local payment methods: One-click payments via Click and Payme.",
      ],
      highlight: "Target: 5,000 paying subscribers = ~$35,000 stable monthly revenue.",
    },
    {
      tag: "COMPETITION & ADVANTAGES",
      title: "Why GlobalAdmit will win?",
      subtitle: "Our differentiators and market 'moat':",
      bullets: [
        "❌ Khan Academy / UWorld: English only, no DTM coverage, requires international cards, costs $100+.",
        "❌ Offline tutors: Very expensive ($100–$200/month), unavailable in regions.",
        "✅ GlobalAdmit: 3-language explanations + SAT & DTM on one platform + 10× cheaper + local payments.",
      ],
      highlight: "We don't just give tests — we teach step-by-step in three languages.",
    },
    {
      tag: "WHY NOW?",
      title: "Perfect timing and strategic opportunity",
      subtitle: "Three global and local waves converged at exactly the right moment:",
      bullets: [
        "🏛 SAT is mandatory again: Harvard, MIT, Yale and Brown reinstated their SAT requirements.",
        "💻 SAT went fully digital: Demand for exactly this kind of online platform exploded overnight.",
        "🇺🇿 International certificate boom in Uzbekistan: IELTS/SAT went mainstream, yet no single local-language platform exists.",
      ],
      highlight: "The time to claim this space — before anyone else — is now!",
    },
    {
      tag: "GO-TO-MARKET (GTM)",
      title: "How do we acquire the first 1,000 users?",
      subtitle: "Zero-cost organic and viral growth strategy:",
      bullets: [
        "📢 Telegram communities: Post free diagnostic tests in existing student and SAT channels.",
        "🔄 Referral programme: 'Invite 3 classmates and unlock the full mock exam for free'.",
        "🏫 Schools and lyceums: Free trial olympiads for grade 10–11 students across Tashkent and the regions.",
        "👨‍🏫 Tutor partnerships: Give teachers a free tool to test their own students.",
      ],
      highlight: "Goal: 10,000 registered users and 500 paying subscribers in the first 3 months.",
    },
    {
      tag: "TEAM & VISION",
      title: "GlobalAdmit — Education for Everyone",
      subtitle: "A team of motivated engineers and SAT/IELTS experts with a clear mission:",
      bullets: [
        "🚀 Technical capability: A fully functional, secure MVP is built and running.",
        "🤝 Accelerator goal: With UzCombinator's support — attract the first 5,000 active users.",
        "🌐 Platform: globaladmit.uz",
        "📞 Contact: info@globaladmit.uz · +998 90 123 45 67",
      ],
      highlight: "Ready for the UzCombinator 2024 cohort!",
    },
  ],
};

/* ─── Touch/swipe hook ─────────────────────────────────────────── */
function useSwipe(onLeft, onRight) {
  const startX = useRef(null);
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? onLeft() : onRight(); }
    startX.current = null;
  };
  return { onTouchStart, onTouchEnd };
}

export default function PitchDeckPage() {
  const { lang, t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const slides = SLIDES_DATA[lang] ?? SLIDES_DATA.uz;

  // Reset to slide 0 when language changes
  useEffect(() => { setCurrent(0); }, [lang]);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1));

  // Keyboard navigation
  useEffect(() => {
    const handle = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [slides.length]);

  // Swipe on mobile
  const swipe = useSwipe(next, prev);

  const slide = slides[current];

  const prevLabel = lang === "ru" ? "← Назад" : lang === "en" ? "← Prev" : "← Oldingi";
  const nextLabel = lang === "ru" ? "Далее →" : lang === "en" ? "Next →" : "Keyingi →";

  return (
    <div
      style={{ minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column", padding: "1rem" }}
      {...swipe}
    >
      <div className="container" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 860 }}>

        {/* Progress dots */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                title={`Slide ${i + 1}`}
                style={{
                  width: i === current ? 32 : 22,
                  height: 6,
                  borderRadius: 3,
                  background: i === current
                    ? "var(--accent)"
                    : i < current
                    ? "var(--accent-2)"
                    : "rgba(255,255,255,0.15)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
          <div style={{ color: "var(--text-3)", fontSize: "0.9rem", fontWeight: 700, flexShrink: 0 }}>
            {current + 1} / {slides.length}
          </div>
        </div>

        {/* Slide card */}
        <div
          key={`${lang}-${current}`}
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.98))",
            border: "1px solid rgba(108,99,255,0.3)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            padding: "clamp(1.25rem, 4vw, 2.5rem)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div>
            {/* Tag */}
            <div style={{
              color: "var(--accent-2)",
              fontWeight: 800,
              fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
              letterSpacing: "1.5px",
              marginBottom: "0.6rem",
              textTransform: "uppercase",
              opacity: 0.85,
            }}>
              {slide.tag}
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: "clamp(1.5rem, 5vw, 2.3rem)",
              marginBottom: "0.5rem",
              color: "#fff",
              lineHeight: 1.2,
            }}>
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: "clamp(0.88rem, 2.5vw, 1.05rem)", color: "var(--text-2)", marginBottom: "1.75rem", lineHeight: 1.6 }}>
              {slide.subtitle}
            </p>

            {/* Bullets */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {slide.bullets.map((b, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    fontSize: "clamp(0.85rem, 2.2vw, 1rem)",
                    lineHeight: 1.6,
                    color: "var(--text-1)",
                    padding: "0.6rem 0.75rem",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span style={{ color: "var(--accent-2)", fontWeight: 700, flexShrink: 0 }}>•</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: "1.75rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}>
            <div style={{
              color: "var(--orange)",
              fontWeight: 600,
              fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
              maxWidth: "65%",
              lineHeight: 1.5,
            }}>
              💡 {slide.highlight}
            </div>

            <div style={{ display: "flex", gap: "0.6rem", flexShrink: 0 }}>
              <button className="btn btn-outline btn-sm" onClick={prev} disabled={current === 0}>
                {prevLabel}
              </button>
              <button className="btn btn-primary btn-sm" onClick={next} disabled={current === slides.length - 1}>
                {nextLabel}
              </button>
            </div>
          </div>
        </div>

        {/* Keyboard hint — desktop only */}
        <p style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--text-3)" }}>
          {lang === "ru"
            ? "⌨️ Клавиши ← → или пробел для навигации · 📱 Свайп на телефоне"
            : lang === "en"
            ? "⌨️ Arrow keys ← → or Space to navigate · 📱 Swipe on mobile"
            : "⌨️ ← → tugmalar yoki Space bilan o'tish · 📱 Telefonda suring"}
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
