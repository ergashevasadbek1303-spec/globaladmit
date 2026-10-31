import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_pitch_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    blank_layout = prs.slide_layouts[6]

    BG_COLOR = RGBColor(15, 23, 42)       # Slate 900
    CARD_BG = RGBColor(30, 41, 59)       # Slate 800
    TEXT_WHITE = RGBColor(248, 250, 252)  # Slate 50
    TEXT_MUTED = RGBColor(148, 163, 184)  # Slate 400
    PRIMARY = RGBColor(108, 99, 255)      # Indigo
    ACCENT_GREEN = RGBColor(34, 197, 94)  # Emerald
    ACCENT_AMBER = RGBColor(245, 158, 11) # Amber

    slides_data = [
        # Slide 1: Cover
        {
            "tag": "UZCOMBINATOR 2024 · EDTECH STARTUP",
            "title": "GlobalAdmit",
            "subtitle": "Chet el va mahalliy universitetlarga tayyorlovchi yagona milliy platforma",
            "bullets": [
                "🎯 Harvard, MIT va mahalliy oliygohlarga kirish uchun to'liq tayyorlov",
                "🇺🇿 Barcha qiyin mavzular va testlar uchun o'zbek tilida bosqichma-bosqich yechimlar",
                "⚡️ 700+ original savol, real vaqtli mock imtihonlar va sun'iy intellekt tahlili"
            ],
            "highlight": "Shior: 'Harvarddan tortib mahalliy oliygohlargacha — barchasi ona tilingizda.'"
        },
        # Slide 2: Problem
        {
            "tag": "MUAMMO",
            "title": "Abituriyentlar nima uchun qiynalmoqda?",
            "subtitle": "O'zbekistonda millionlab iqtidorli yoshlar 4 ta jiddiy to'siqqa duch keladi:",
            "bullets": [
                "💸 Qimmat kurslar: Toshkentdagi SAT/IELTS kurslari oyiga $100–$200. Viloyatlardagi 80% oilalarning bunga qurbi yetmaydi.",
                "🌐 Til to'sig'i: Mavjud xalqaro platformalar (Khan Academy, UWorld) faqat ingliz tilida tushuntiradi.",
                "🧩 Resurslar tarqoqligi: SAT uchun alohida, IELTS uchun boshqa, DTM uchun qog'oz kitoblarga yugurishadi.",
                "📉 Ko'r-ko'rona test yechish: Qog'oz testlarda qaysi aniq mavzuda oqsayotganini tahlil qilish imkonsiz."
            ],
            "highlight": "Natija: Viloyatlardagi iqtidorli yoshlar sifatli tayyorgarlikdan uzilib qolmoqda."
        },
        # Slide 3: Solution
        {
            "tag": "YECHIM",
            "title": "GlobalAdmit — Barchasi bitta joyda",
            "subtitle": "Zamonaviy, hamyonbop va to'liq o'zbek tilidagi ta'lim platformasi:",
            "bullets": [
                "💡 Ona tilidagi yechimlar: Har bir qiyin savolga o'zbek tilida batafsil tushuntirish va formulalar.",
                "🏛 Birgalikdagi ekotizim: SAT (Matematika & Ingliz tili), IELTS va DTM bitta akkauntda.",
                "⚡️ 10 barobar arzon: Har qanday oila farzandi oyiga arzon narxda mustaqil tayyorlana oladi.",
                "🤖 AI Tahlil & Diagnostika: Tizim zaif mavzularni avtomatik aniqlab, shaxsiy reja tuzadi."
            ],
            "highlight": "Biz ta'limdagi poytaxt va viloyat o'rtasidagi tengsizlikni yo'qotamiz."
        },
        # Slide 4: Market Size
        {
            "tag": "BOZOR HAJMI (MARKET SIZE)",
            "title": "Katta va jadal o'sayotgan EdTech bozori",
            "subtitle": "O'zbekistonda yoshlar demografiyasi va xalqaro ta'limga talab cho'qqida:",
            "bullets": [
                "🌍 TAM (Umumiy bozor): Har yili 1 000 000+ o'zbekistonlik abituriyent OTMlarga hujjat topshiradi.",
                "🎯 SAM (Bizning auditoriya): 150 000 – 200 000 nafar xalqaro va nufuzli mahalliy oliygohlarga tayyorlanuvchilar.",
                "💰 Bozor hajmi (pulda): Yillik ~$30M – $50M lik repetitorlik va imtihonlarga tayyorlov bozori.",
                "📈 Davlat qo'llovi: Hukumat xalqaro sertifikat olgan yoshlarning imtihon xarajatlarini to'liq qoplab bermoqda."
            ],
            "highlight": "Bozor hajmi: ~$40M yoki 1 000 000 abituriyent."
        },
        # Slide 5: Product
        {
            "tag": "MAHSULOT VA TEXNOLOGIYA (MVP)",
            "title": "Platforma allaqachon ishlab turibdi!",
            "subtitle": "FastAPI backend, React frontend va SQLite/PostgreSQL ma'lumotlar bazasi:",
            "bullets": [
                "📚 700+ Original savollar: SAT Math, SAT English, IELTS va DTM bo'yicha boyitilgan savollar banki.",
                "⏱ Haqiqiy Mock imtihon: Vaqt chegaralangan rasmiy formatdagi moslashuvchan testlar.",
                "🔒 Xavfsiz arxitektura: JWT autentifikatsiya, yashirin javoblar, Rate Limiting va HTTPS.",
                "🏆 Gamifikatsiya & Reyting: Streak (🔥), umumiy reyting peshqadami va motivatsiya beruvchi ballar."
            ],
            "highlight": "Kod tayyor, testdan o'tgan va lokal serverda ishlab turibdi."
        },
        # Slide 6: Business Model
        {
            "tag": "BIZNES MODEL (MONETIZATION)",
            "title": "Qanday daromad qilamiz? (Freemium)",
            "subtitle": "Iste'molchilar va o'quv markazlari uchun ikki bosqichli monetizatsiya:",
            "bullets": [
                "🆓 Bepul (Free tier): Diagnostik test, kunlik 10-20 ta mashq savoli va umumiy reyting.",
                "💎 Pullik obuna (B2C Premium): Oyiga 60 000 – 90 000 so'm ($5–$8). To'liq mocklar, cheksiz testlar, AI xatolar tahlili.",
                "🏫 O'quv markazlariga litsenziya (B2B): Repetitorlar va xususiy maktablarga o'quvchilarni testlash tizimini sotish.",
                "💳 Mahalliy to'lovlar: Click va Payme orqali 1 bosqichda to'lov qilish imkoniyati."
            ],
            "highlight": "Target: 5 000 ta to'lovchi obunachi = Oyiga ~$35 000 barqaror daromad."
        },
        # Slide 7: Competition
        {
            "tag": "RAQOBAT VA USTUNLIKLAR",
            "title": "Nega aynan GlobalAdmit g'alaba qozonadi?",
            "subtitle": "Raqobatchilardan farqimiz va bozordagi 'himoya devorimiz' (Moat):",
            "bullets": [
                "❌ Khan Academy / UWorld: Faqat ingliz tilida, DTM yo'q, xalqaro kartalar talab qiladi, narxi $100+.",
                "❌ Oflayn repetitorlar: Narxi juda qimmat ($100–$200/oy), viloyatlarda yo'q, vaqtga bog'liq.",
                "✅ GlobalAdmit ustunligi: O'zbek tilidagi yechimlar + SAT va DTM yagona platformada + 10 barobar arzon + Click/Payme."
            ],
            "highlight": "Biz nafaqat test beramiz, balki o'zbek tilida qadamma-qadam o'rgatamiz."
        },
        # Slide 8: Why Now?
        {
            "tag": "NEGA AYNAN HOZIR? (WHY NOW)",
            "title": "To'g'ri vaqt va strategik imkoniyat",
            "subtitle": "Uchta global va mahalliy to'lqin ayni paytda birlashdi:",
            "bullets": [
                "🏛 1. SAT yana majburiy bo'ldi: Harvard, MIT, Yale va Brown universitetlari test-optional siyosatini bekor qilib, SAT talabini qaytardi.",
                "💻 2. SAT to'liq Digital formatga o'tdi: Qog'oz kitoblar eskirib, aynan biznikidek onlayn platformalarga ehtiyoj paydo bo'ldi.",
                "🇺🇿 3. O'zbekistonda xalqaro sertifikatlar bumu: Yoshlar orasida IELTS/SAT olish har qachongidan ommalashdi, lekin mahalliy tilda yagona platforma hali yo'q."
            ],
            "highlight": "Birinchi bo'lib ushbu bo'shliqni egallashning ayni vaqti!"
        },
        # Slide 9: Go-To-Market
        {
            "tag": "MIJOZLARNI JALB QILISH (GTM)",
            "title": "Ilk 1 000 foydalanuvchini qanday jalb qilamiz?",
            "subtitle": "0 xarajat bilan organik va virusli o'sish strategiyasi:",
            "bullets": [
                "📢 Telegram hamjamiyatlari: Mavjud abituriyent va SAT kanallarida bepul diagnostik testlar e'lon qilish.",
                "🔄 Referral dasturi: '3 ta sinfdoshingni taklif qil va to'liq mock testni bepul och' mexanizmi.",
                "🏫 Maktab va litseylar: Toshkent va viloyatlardagi 10-11 sinf o'quvchilari o'rtasida bepul sinov olimpiadalari.",
                "👨‍🏫 Repetitorlar bilan sheriklik: O'qituvchilarga o'z o'quvchilarini tizimimizda bepul tekshirish vositasini berish."
            ],
            "highlight": "Maqsad: Birinchi 3 oyda 10 000 ro'yxatdan o'tgan foydalanuvchi va 500 ta pullik obunachi."
        },
        # Slide 10: Team & Vision
        {
            "tag": "JAMOA VA KELAJAK",
            "title": "GlobalAdmit — Ta'limni hammabop qilamiz",
            "subtitle": "Kuchli motivatsiyaga ega dasturchilar va SAT/IELTS ekspertlari jamoasi:",
            "bullets": [
                "🚀 Texnik salohiyat: To'liq ishlaydigan xavfsiz MVP tayyor va ishga tushirilgan.",
                "🤝 Inkubator maqsadi: UzCombinator ko'magida birinchi 5 000 faol foydalanuvchini jalb qilish va mobil ilovani chiqarish.",
                "🌐 Veb-sayt: http://localhost:5173 (demo)",
                "📞 Aloqa: Jasur Karimov · info@globaladmit.uz · +998 90 123 45 67"
            ],
            "highlight": "UzCombinator 2024 kohortiga tayyormiz!"
        }
    ]

    for index, data in enumerate(slides_data):
        slide = prs.slides.add_slide(blank_layout)

        # Background shape
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_COLOR
        bg.line.fill.background()

        # Accent header pill (Tag)
        tag_box = slide.shapes.add_textbox(Inches(1.0), Inches(0.6), Inches(11.3), Inches(0.4))
        tf_tag = tag_box.text_frame
        tf_tag.word_wrap = True
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = data["tag"]
        p_tag.font.bold = True
        p_tag.font.size = Pt(11)
        p_tag.font.color.rgb = PRIMARY

        # Title
        title_box = slide.shapes.add_textbox(Inches(1.0), Inches(1.0), Inches(11.3), Inches(0.8))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = data["title"]
        p_title.font.bold = True
        p_title.font.size = Pt(28)
        p_title.font.color.rgb = TEXT_WHITE

        # Subtitle
        sub_box = slide.shapes.add_textbox(Inches(1.0), Inches(1.85), Inches(11.3), Inches(0.5))
        tf_sub = sub_box.text_frame
        tf_sub.word_wrap = True
        p_sub = tf_sub.paragraphs[0]
        p_sub.text = data["subtitle"]
        p_sub.font.size = Pt(15)
        p_sub.font.color.rgb = TEXT_MUTED

        # Main content card
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(2.55), Inches(11.33), Inches(3.7))
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = RGBColor(51, 65, 85)

        # Bullets inside card
        content_box = slide.shapes.add_textbox(Inches(1.3), Inches(2.75), Inches(10.7), Inches(3.3))
        tf_c = content_box.text_frame
        tf_c.word_wrap = True

        for b_idx, bullet in enumerate(data["bullets"]):
            p = tf_c.paragraphs[0] if b_idx == 0 else tf_c.add_paragraph()
            p.text = bullet
            p.font.size = Pt(14)
            p.font.color.rgb = TEXT_WHITE
            p.space_after = Pt(10)

        # Bottom Highlight Pill
        hl_box = slide.shapes.add_textbox(Inches(1.0), Inches(6.4), Inches(10.0), Inches(0.5))
        tf_hl = hl_box.text_frame
        p_hl = tf_hl.paragraphs[0]
        p_hl.text = "💡 " + data["highlight"]
        p_hl.font.bold = True
        p_hl.font.size = Pt(13)
        p_hl.font.color.rgb = ACCENT_AMBER

        # Slide Number
        num_box = slide.shapes.add_textbox(Inches(11.5), Inches(6.4), Inches(0.8), Inches(0.5))
        tf_num = num_box.text_frame
        p_num = tf_num.paragraphs[0]
        p_num.alignment = PP_ALIGN.RIGHT
        p_num.text = f"{index + 1}/10"
        p_num.font.bold = True
        p_num.font.size = Pt(12)
        p_num.font.color.rgb = TEXT_MUTED

    output_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "GlobalAdmit_Pitch_Deck.pptx"))
    prs.save(output_path)
    print(f"[OK] Pitch Deck muvaffaqiyatli yaratildi: {output_path}")
    return output_path

if __name__ == "__main__":
    create_pitch_deck()
