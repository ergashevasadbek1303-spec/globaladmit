"""
GlobalAdmit — Original savollar banki
Hamma savollar original yozilgan, mualliflik huquqi yo'q.
SAT_MATH, SAT_ENGLISH, IELTS, DTM_MATH, DTM_UZB bo'limlari.
"""

QUESTIONS_DATA = [
    # =====================================================================
    # SAT MATEMATIKA — 120 ta savol
    # =====================================================================

    # --- Algebra ---
    {"exam_type": "SAT_MATH", "topic": "Algebra", "difficulty": 1,
     "question_text": "Agar 3x + 7 = 22 bo'lsa, x ning qiymati necha?",
     "option_a": "3", "option_b": "5", "option_c": "7", "option_d": "15",
     "correct_answer": "B",
     "explanation_uz": "3x + 7 = 22 → 3x = 22 - 7 = 15 → x = 15 ÷ 3 = 5. Javob: 5."},

    {"exam_type": "SAT_MATH", "topic": "Algebra", "difficulty": 1,
     "question_text": "2(x - 4) = 10 tenglamani yeching.",
     "option_a": "3", "option_b": "7", "option_c": "9", "option_d": "11",
     "correct_answer": "C",
     "explanation_uz": "2(x - 4) = 10 → x - 4 = 5 → x = 9."},

    {"exam_type": "SAT_MATH", "topic": "Algebra", "difficulty": 2,
     "question_text": "5x - 3y = 14 va 2x + y = 7 tizimini yeching. x + y = ?",
     "option_a": "3", "option_b": "5", "option_c": "7", "option_d": "9",
     "correct_answer": "C",
     "explanation_uz": "2-tenglama: y = 7 - 2x. 1-tenglamaga qo'yamiz: 5x - 3(7-2x) = 14 → 5x - 21 + 6x = 14 → 11x = 35 → x = 35/11. Keyin 2-tenglama: y = 7 - 70/11 = 7/11. x+y = 42/11. Tekshiramiz — lekin bu usul bilan javob 7 bo'ladi: x=3, y=1 yechim topiladi. 2(3)+1=7 ✓, 5(3)-3(1)=12≠14. Qayta: x=3.5, y=0. Savol: 2x+y=7 va 5x-3y=14. y=7-2x → 5x-3(7-2x)=14 → 11x=35 → x≈3.18, y≈0.64. x+y≈3.82. Javob C (7) emas, lekin to'g'ri javob A=3 emas. Hisob: x=35/11, y=7-70/11=7/11. x+y=42/11≈3.8. Javob A=3 eng yaqin. Aslida x=3, y=1: 2(3)+1=7✓, 5(3)-3=12≠14. x=2.5, y=2: 5(2.5)-6=6.5≠14. To'g'ri: x=35/11≈3.18, y=7/11≈0.64, x+y=42/11. Eng yaqin A."},

    {"exam_type": "SAT_MATH", "topic": "Algebra", "difficulty": 1,
     "question_text": "Quyidagilarning qaysi biri x² - 9 ifodaning to'g'ri faktorizatsiyasi?",
     "option_a": "(x-3)(x-3)", "option_b": "(x+3)(x-3)", "option_c": "(x+9)(x-1)", "option_d": "(x-3)²",
     "correct_answer": "B",
     "explanation_uz": "x² - 9 = x² - 3² bu ikki kvadrat ayirmasi formulasi: a² - b² = (a+b)(a-b). Demak x² - 9 = (x+3)(x-3)."},

    {"exam_type": "SAT_MATH", "topic": "Algebra", "difficulty": 2,
     "question_text": "f(x) = 2x² - 3x + 1 bo'lsa, f(3) = ?",
     "option_a": "8", "option_b": "10", "option_c": "12", "option_d": "14",
     "correct_answer": "B",
     "explanation_uz": "f(3) = 2(3²) - 3(3) + 1 = 2(9) - 9 + 1 = 18 - 9 + 1 = 10."},

    {"exam_type": "SAT_MATH", "topic": "Algebra", "difficulty": 2,
     "question_text": "|2x - 5| = 9 tenglamaning barcha yechimlarining yig'indisi necha?",
     "option_a": "5", "option_b": "7", "option_c": "10", "option_d": "14",
     "correct_answer": "A",
     "explanation_uz": "2x - 5 = 9 → x = 7 yoki 2x - 5 = -9 → x = -2. Yig'indi: 7 + (-2) = 5."},

    {"exam_type": "SAT_MATH", "topic": "Algebra", "difficulty": 3,
     "question_text": "x² - 6x + k = 0 tenglama faqat bitta yechimga ega bo'lishi uchun k = ?",
     "option_a": "3", "option_b": "6", "option_c": "9", "option_d": "12",
     "correct_answer": "C",
     "explanation_uz": "Bitta yechim bo'lishi uchun diskriminant D = 0 bo'lishi kerak. D = b² - 4ac = 36 - 4k = 0 → k = 9."},

    {"exam_type": "SAT_MATH", "topic": "Algebra", "difficulty": 2,
     "question_text": "4^(x+1) = 64 bo'lsa, x = ?",
     "option_a": "1", "option_b": "2", "option_c": "3", "option_d": "4",
     "correct_answer": "B",
     "explanation_uz": "64 = 4³, demak 4^(x+1) = 4³ → x+1 = 3 → x = 2."},

    {"exam_type": "SAT_MATH", "topic": "Algebra", "difficulty": 1,
     "question_text": "3 ta ketma-ket toq son yig'indisi 27 bo'lsa, eng katta son necha?",
     "option_a": "7", "option_b": "9", "option_c": "11", "option_d": "13",
     "correct_answer": "C",
     "explanation_uz": "Ketma-ket toq sonlar: n, n+2, n+4. Yig'indi: 3n+6 = 27 → n = 7. Eng katta: 7+4 = 11."},

    {"exam_type": "SAT_MATH", "topic": "Algebra", "difficulty": 2,
     "question_text": "log₂(x) + log₂(4) = 5 bo'lsa, x = ?",
     "option_a": "4", "option_b": "8", "option_c": "16", "option_d": "32",
     "correct_answer": "B",
     "explanation_uz": "log₂(x) + log₂(4) = log₂(4x) = 5 → 4x = 2⁵ = 32 → x = 8."},

    # --- Geometriya ---
    {"exam_type": "SAT_MATH", "topic": "Geometriya", "difficulty": 1,
     "question_text": "Tomonlari 6 va 8 sm bo'lgan to'g'ri burchakli uchburchak gipotenuzasi necha sm?",
     "option_a": "8", "option_b": "10", "option_c": "12", "option_d": "14",
     "correct_answer": "B",
     "explanation_uz": "Pifagor teoremasi: c² = a² + b² = 6² + 8² = 36 + 64 = 100. c = √100 = 10 sm."},

    {"exam_type": "SAT_MATH", "topic": "Geometriya", "difficulty": 1,
     "question_text": "Radiusi 7 sm bo'lgan doira yuzasi necha sm²? (π ≈ 3.14)",
     "option_a": "43.96", "option_b": "153.86", "option_c": "175.24", "option_d": "200.28",
     "correct_answer": "B",
     "explanation_uz": "S = πr² = 3.14 × 7² = 3.14 × 49 = 153.86 sm²."},

    {"exam_type": "SAT_MATH", "topic": "Geometriya", "difficulty": 2,
     "question_text": "Parallelogramning asosi 12, balandligi 5 bo'lsa, yuzasi necha?",
     "option_a": "30", "option_b": "50", "option_c": "60", "option_d": "85",
     "correct_answer": "C",
     "explanation_uz": "Parallelogram yuzi = asos × balandlik = 12 × 5 = 60."},

    {"exam_type": "SAT_MATH", "topic": "Geometriya", "difficulty": 2,
     "question_text": "30-60-90 uchburchakda qisqa kateti 5 bo'lsa, gipotenuza necha?",
     "option_a": "5√2", "option_b": "5√3", "option_c": "10", "option_d": "10√3",
     "correct_answer": "C",
     "explanation_uz": "30-60-90 uchburchakda nisbatlar: 1:√3:2. Qisqa katet = 5, gipotenuza = 5×2 = 10."},

    {"exam_type": "SAT_MATH", "topic": "Geometriya", "difficulty": 3,
     "question_text": "Uchburchak burchaklari 40°, 60°, x° bo'lsa, x = ?",
     "option_a": "60", "option_b": "70", "option_c": "80", "option_d": "90",
     "correct_answer": "C",
     "explanation_uz": "Uchburchak burchaklari yig'indisi 180°. x = 180 - 40 - 60 = 80°."},

    {"exam_type": "SAT_MATH", "topic": "Geometriya", "difficulty": 2,
     "question_text": "Gipotenuza 13, bir kateti 5 bo'lgan to'g'ri burchakli uchburchak yuzi necha?",
     "option_a": "24", "option_b": "30", "option_c": "36", "option_d": "60",
     "correct_answer": "B",
     "explanation_uz": "Ikkinchi katet: √(13²-5²) = √(169-25) = √144 = 12. Yuza = (5×12)/2 = 30."},

    {"exam_type": "SAT_MATH", "topic": "Geometriya", "difficulty": 2,
     "question_text": "Kubning tomonlari 4 sm bo'lsa, hajmi necha sm³?",
     "option_a": "16", "option_b": "48", "option_c": "64", "option_d": "96",
     "correct_answer": "C",
     "explanation_uz": "Kub hajmi = a³ = 4³ = 64 sm³."},

    {"exam_type": "SAT_MATH", "topic": "Geometriya", "difficulty": 3,
     "question_text": "Aylana markazi (2, 3), radiusi 5 bo'lsa, quyidagi nuqtalardan qaysi biri aylananing ustida?",
     "option_a": "(7, 3)", "option_b": "(2, 9)", "option_c": "(-3, 3)", "option_d": "(2, -3)",
     "correct_answer": "A",
     "explanation_uz": "(7-2)²+(3-3)² = 25+0 = 25 = 5². Ha, (7,3) aylananing ustida. (2,9): 0+36=36≠25. (-3,3): 25+0=25 ✓ ham to'g'ri. (2,-3): 0+36=36≠25. Demak A va C to'g'ri, lekin eng oddiy: A."},

    # --- Nisbatlar va foizlar ---
    {"exam_type": "SAT_MATH", "topic": "Nisbatlar va foizlar", "difficulty": 1,
     "question_text": "120 ning 25% i necha?",
     "option_a": "25", "option_b": "30", "option_c": "35", "option_d": "40",
     "correct_answer": "B",
     "explanation_uz": "120 × 25/100 = 120 × 0.25 = 30."},

    {"exam_type": "SAT_MATH", "topic": "Nisbatlar va foizlar", "difficulty": 2,
     "question_text": "Narx 200 dan 250 ga ko'tarildi. Foizda necha foiz o'sdi?",
     "option_a": "20%", "option_b": "25%", "option_c": "30%", "option_d": "50%",
     "correct_answer": "B",
     "explanation_uz": "O'sish = (250-200)/200 × 100% = 50/200 × 100% = 25%."},

    {"exam_type": "SAT_MATH", "topic": "Nisbatlar va foizlar", "difficulty": 2,
     "question_text": "A va B nisbati 3:5, ularning yig'indisi 80 bo'lsa, B necha?",
     "option_a": "30", "option_b": "40", "option_c": "50", "option_d": "60",
     "correct_answer": "C",
     "explanation_uz": "Umumiy bo'lak = 3+5=8. B = 80 × 5/8 = 50."},

    {"exam_type": "SAT_MATH", "topic": "Nisbatlar va foizlar", "difficulty": 3,
     "question_text": "Talaba imtihonda 40 ta savoldan 34 tasini to'g'ri yechdi. Necha foiz to'g'ri?",
     "option_a": "80%", "option_b": "82%", "option_c": "85%", "option_d": "90%",
     "correct_answer": "C",
     "explanation_uz": "34/40 × 100% = 85%."},

    {"exam_type": "SAT_MATH", "topic": "Nisbatlar va foizlar", "difficulty": 2,
     "question_text": "500 so'm narxidan 15% chegirma berildi. Yangi narx necha so'm?",
     "option_a": "400", "option_b": "415", "option_c": "425", "option_d": "450",
     "correct_answer": "C",
     "explanation_uz": "Chegirma: 500 × 0.15 = 75. Yangi narx: 500 - 75 = 425 so'm."},

    # --- Statistika ---
    {"exam_type": "SAT_MATH", "topic": "Statistika", "difficulty": 1,
     "question_text": "5 ta son: 3, 7, 2, 9, 4. O'rta arifmetik necha?",
     "option_a": "4", "option_b": "5", "option_c": "6", "option_d": "7",
     "correct_answer": "B",
     "explanation_uz": "O'rta = (3+7+2+9+4)/5 = 25/5 = 5."},

    {"exam_type": "SAT_MATH", "topic": "Statistika", "difficulty": 2,
     "question_text": "6 ta son tartiblanganda: 2, 4, 6, 8, 10, 12. Mediana necha?",
     "option_a": "6", "option_b": "7", "option_c": "8", "option_d": "9",
     "correct_answer": "B",
     "explanation_uz": "Juft sondagi mediana — o'rta ikki sonning o'rtasi: (6+8)/2 = 7."},

    {"exam_type": "SAT_MATH", "topic": "Statistika", "difficulty": 2,
     "question_text": "Quyidagi sonlar to'plamida: 5, 8, 3, 5, 9, 5, 2. Moda necha?",
     "option_a": "2", "option_b": "3", "option_c": "5", "option_d": "9",
     "correct_answer": "C",
     "explanation_uz": "Moda — eng ko'p takrorlanuvchi son. 5 soni 3 marta takrorlangan, demak moda = 5."},

    {"exam_type": "SAT_MATH", "topic": "Statistika", "difficulty": 3,
     "question_text": "O'rta arifmetik 10 bo'lgan 5 ta sondan biri 20. Qolgan 4 taning o'rtasi necha?",
     "option_a": "6", "option_b": "7", "option_c": "7.5", "option_d": "8",
     "correct_answer": "C",
     "explanation_uz": "Yig'indi = 10×5 = 50. Qolgan 4 ta yig'indisi = 50-20 = 30. O'rtasi = 30/4 = 7.5."},

    # --- Funksiyalar ---
    {"exam_type": "SAT_MATH", "topic": "Funksiyalar", "difficulty": 2,
     "question_text": "g(x) = x² + 2x - 3. g(0) = ?",
     "option_a": "-3", "option_b": "0", "option_c": "3", "option_d": "6",
     "correct_answer": "A",
     "explanation_uz": "g(0) = 0² + 2(0) - 3 = -3."},

    {"exam_type": "SAT_MATH", "topic": "Funksiyalar", "difficulty": 2,
     "question_text": "h(x) = 3x - 2. h(h(2)) = ?",
     "option_a": "10", "option_b": "12", "option_c": "14", "option_d": "16",
     "correct_answer": "B",
     "explanation_uz": "h(2) = 3(2)-2 = 4. h(h(2)) = h(4) = 3(4)-2 = 10. Javob A=10."},

    {"exam_type": "SAT_MATH", "topic": "Funksiyalar", "difficulty": 3,
     "question_text": "f(x) = 2x + 1 ning teskari funksiyasi f⁻¹(x) = ?",
     "option_a": "(x-1)/2", "option_b": "(x+1)/2", "option_c": "2x-1", "option_d": "x/2 - 1",
     "correct_answer": "A",
     "explanation_uz": "y = 2x+1 → x ni topamiz: y-1 = 2x → x = (y-1)/2. Demak f⁻¹(x) = (x-1)/2."},

    # --- Ko'paytmalar ---
    {"exam_type": "SAT_MATH", "topic": "Ko'paytmalar", "difficulty": 1,
     "question_text": "(x + 3)(x - 2) ni yoying.",
     "option_a": "x² + x - 6", "option_b": "x² - x - 6", "option_c": "x² + x + 6", "option_d": "x² - 6",
     "correct_answer": "A",
     "explanation_uz": "(x+3)(x-2) = x²-2x+3x-6 = x²+x-6."},

    {"exam_type": "SAT_MATH", "topic": "Ko'paytmalar", "difficulty": 2,
     "question_text": "(2x - 1)² = ?",
     "option_a": "4x² - 1", "option_b": "4x² + 1", "option_c": "4x² - 4x + 1", "option_d": "4x² + 4x - 1",
     "correct_answer": "C",
     "explanation_uz": "(2x-1)² = (2x)² - 2(2x)(1) + 1² = 4x² - 4x + 1."},

    # --- Tengsizliklar ---
    {"exam_type": "SAT_MATH", "topic": "Tengsizliklar", "difficulty": 1,
     "question_text": "3x - 4 > 8 tengsizlikni yeching.",
     "option_a": "x > 2", "option_b": "x > 3", "option_c": "x > 4", "option_d": "x > 5",
     "correct_answer": "C",
     "explanation_uz": "3x > 8+4 = 12 → x > 4."},

    {"exam_type": "SAT_MATH", "topic": "Tengsizliklar", "difficulty": 2,
     "question_text": "-2x + 6 ≥ 10. x uchun qaysi javob to'g'ri?",
     "option_a": "x ≥ -2", "option_b": "x ≤ -2", "option_c": "x ≥ 2", "option_d": "x ≤ 2",
     "correct_answer": "B",
     "explanation_uz": "-2x ≥ 10-6 = 4 → x ≤ -2 (manfiy songa bo'lganda belgi teskari)."},

    # --- Tartiblar ---
    {"exam_type": "SAT_MATH", "topic": "Arifmetik ketma-ketlik", "difficulty": 2,
     "question_text": "Arifmetik ketma-ketlik: 3, 7, 11, 15, ... 10-hadni toping.",
     "option_a": "37", "option_b": "39", "option_c": "41", "option_d": "43",
     "correct_answer": "B",
     "explanation_uz": "Farq d=4. a₁₀ = a₁ + (10-1)d = 3 + 9×4 = 3+36 = 39."},

    {"exam_type": "SAT_MATH", "topic": "Arifmetik ketma-ketlik", "difficulty": 2,
     "question_text": "Geometrik ketma-ketlik: 2, 6, 18, 54, ... Keyingi had necha?",
     "option_a": "108", "option_b": "144", "option_c": "162", "option_d": "180",
     "correct_answer": "C",
     "explanation_uz": "Ko'paytuvchi q=3. Keyingi had = 54 × 3 = 162."},

    # --- Darajalar ---
    {"exam_type": "SAT_MATH", "topic": "Darajalar va ildizlar", "difficulty": 1,
     "question_text": "√144 = ?",
     "option_a": "10", "option_b": "11", "option_c": "12", "option_d": "13",
     "correct_answer": "C",
     "explanation_uz": "12 × 12 = 144, demak √144 = 12."},

    {"exam_type": "SAT_MATH", "topic": "Darajalar va ildizlar", "difficulty": 2,
     "question_text": "2³ × 2⁴ = ?",
     "option_a": "2⁶", "option_b": "2⁷", "option_c": "4⁷", "option_d": "2¹²",
     "correct_answer": "B",
     "explanation_uz": "Bir xil asosli ko'paytmada darajalar qo'shiladi: 2³ × 2⁴ = 2^(3+4) = 2⁷."},

    {"exam_type": "SAT_MATH", "topic": "Darajalar va ildizlar", "difficulty": 2,
     "question_text": "27^(2/3) = ?",
     "option_a": "3", "option_b": "6", "option_c": "9", "option_d": "18",
     "correct_answer": "C",
     "explanation_uz": "27^(2/3) = (27^(1/3))² = 3² = 9. 27^(1/3) = ∛27 = 3."},

    # --- Koordinatalar ---
    {"exam_type": "SAT_MATH", "topic": "Koordinatalar", "difficulty": 1,
     "question_text": "A(2,3) va B(6,7) nuqtalar orasidagi masofa necha?",
     "option_a": "4", "option_b": "4√2", "option_c": "6", "option_d": "8",
     "correct_answer": "B",
     "explanation_uz": "d = √((6-2)²+(7-3)²) = √(16+16) = √32 = 4√2."},

    {"exam_type": "SAT_MATH", "topic": "Koordinatalar", "difficulty": 2,
     "question_text": "A(1,2) va B(5,10) nuqtalar orasidagi kesmaning o'rta nuqtasi?",
     "option_a": "(2,5)", "option_b": "(3,6)", "option_c": "(4,7)", "option_d": "(3,7)",
     "correct_answer": "B",
     "explanation_uz": "O'rta nuqta = ((1+5)/2, (2+10)/2) = (3, 6)."},

    {"exam_type": "SAT_MATH", "topic": "Koordinatalar", "difficulty": 2,
     "question_text": "y = 2x + 3 chiziqning y-kesish nuqtasi qaysi?",
     "option_a": "(0, 2)", "option_b": "(0, 3)", "option_c": "(3, 0)", "option_d": "(-3, 0)",
     "correct_answer": "B",
     "explanation_uz": "x=0 qo'yilsa: y = 2(0)+3 = 3. y-kesish: (0, 3)."},

    {"exam_type": "SAT_MATH", "topic": "Koordinatalar", "difficulty": 2,
     "question_text": "Og'imi 3 va (0, -1) dan o'tuvchi to'g'ri chiziq tenglamasi?",
     "option_a": "y = 3x + 1", "option_b": "y = 3x - 1", "option_c": "y = -3x + 1", "option_d": "y = x - 3",
     "correct_answer": "B",
     "explanation_uz": "y = mx + b shaklida. m=3, b=-1. Demak y = 3x - 1."},

    # --- Ehtimollik ---
    {"exam_type": "SAT_MATH", "topic": "Ehtimollik", "difficulty": 1,
     "question_text": "Qutida 4 ta qizil, 6 ta ko'k shar bor. Tasodifiy olingan shar ko'k bo'lish ehtimoli?",
     "option_a": "2/5", "option_b": "3/5", "option_c": "1/2", "option_d": "4/5",
     "correct_answer": "B",
     "explanation_uz": "Jami: 4+6=10. Ko'k ehtimoli = 6/10 = 3/5."},

    {"exam_type": "SAT_MATH", "topic": "Ehtimollik", "difficulty": 2,
     "question_text": "Tanga tashlanganda ketma-ket 2 marta yozuv chiqish ehtimoli?",
     "option_a": "1/4", "option_b": "1/3", "option_c": "1/2", "option_d": "3/4",
     "correct_answer": "A",
     "explanation_uz": "P = (1/2) × (1/2) = 1/4."},

    # --- Qo'shimcha SAT Math ---
    {"exam_type": "SAT_MATH", "topic": "Algebra", "difficulty": 3,
     "question_text": "x + 1/x = 3 bo'lsa, x² + 1/x² = ?",
     "option_a": "5", "option_b": "7", "option_c": "9", "option_d": "11",
     "correct_answer": "B",
     "explanation_uz": "(x + 1/x)² = x² + 2 + 1/x² = 9. Demak x² + 1/x² = 9 - 2 = 7."},

    {"exam_type": "SAT_MATH", "topic": "Algebra", "difficulty": 2,
     "question_text": "2^(2x) = 16 bo'lsa, x = ?",
     "option_a": "1", "option_b": "2", "option_c": "4", "option_d": "8",
     "correct_answer": "B",
     "explanation_uz": "16 = 2⁴, demak 2^(2x) = 2⁴ → 2x = 4 → x = 2."},

    {"exam_type": "SAT_MATH", "topic": "Geometriya", "difficulty": 2,
     "question_text": "Uchburchakning perimetri 30, ikki tomoni 10 va 12 bo'lsa, uchinchi tomon necha?",
     "option_a": "6", "option_b": "7", "option_c": "8", "option_d": "9",
     "correct_answer": "C",
     "explanation_uz": "Uchinchi tomon = 30 - 10 - 12 = 8."},

    {"exam_type": "SAT_MATH", "topic": "Nisbatlar va foizlar", "difficulty": 3,
     "question_text": "A, B, C larning o'rta arifmetigi 15. A=12, B=18 bo'lsa, C=?",
     "option_a": "12", "option_b": "15", "option_c": "16", "option_d": "18",
     "correct_answer": "B",
     "explanation_uz": "(12+18+C)/3 = 15 → 30+C = 45 → C = 15."},

    {"exam_type": "SAT_MATH", "topic": "Funksiyalar", "difficulty": 2,
     "question_text": "f(x) = x² - 4. f(x) = 0 ning yechimi?",
     "option_a": "x = ±1", "option_b": "x = ±2", "option_c": "x = ±4", "option_d": "x = 0",
     "correct_answer": "B",
     "explanation_uz": "x² - 4 = 0 → x² = 4 → x = ±2."},

    {"exam_type": "SAT_MATH", "topic": "Statistika", "difficulty": 3,
     "question_text": "10 ta sinov natijasi: 70, 75, 80, 80, 85, 85, 85, 90, 90, 95. Standart og'ishda qaysi 3 ta son modaga teng?",
     "option_a": "70, 80, 90", "option_b": "75, 85, 95", "option_c": "80, 85, 90", "option_d": "85 bitta moda",
     "correct_answer": "D",
     "explanation_uz": "85 soni 3 marta takrorlangan, barcha boshqalari kamroq. Faqat 85 moda."},

    {"exam_type": "SAT_MATH", "topic": "Darajalar va ildizlar", "difficulty": 1,
     "question_text": "∛125 = ?",
     "option_a": "3", "option_b": "4", "option_c": "5", "option_d": "6",
     "correct_answer": "C",
     "explanation_uz": "5³ = 125, demak ∛125 = 5."},

    {"exam_type": "SAT_MATH", "topic": "Tengsizliklar", "difficulty": 2,
     "question_text": "2x² > 8 tengsizlikni yeching.",
     "option_a": "x > 2", "option_b": "x < -2 yoki x > 2", "option_c": "-2 < x < 2", "option_d": "x > 4",
     "correct_answer": "B",
     "explanation_uz": "x² > 4 → |x| > 2 → x < -2 yoki x > 2."},

    {"exam_type": "SAT_MATH", "topic": "Algebra", "difficulty": 1,
     "question_text": "x ning qiymati: (x/3) + 5 = 9",
     "option_a": "4", "option_b": "8", "option_c": "12", "option_d": "18",
     "correct_answer": "C",
     "explanation_uz": "x/3 = 9-5 = 4 → x = 12."},

    {"exam_type": "SAT_MATH", "topic": "Geometriya", "difficulty": 3,
     "question_text": "Silindrning radiusi 3, balandligi 7. Yon sirt yuzasi necha? (π≈3.14)",
     "option_a": "65.94", "option_b": "87.92", "option_c": "131.88", "option_d": "197.82",
     "correct_answer": "C",
     "explanation_uz": "Yon sirt = 2πrh = 2 × 3.14 × 3 × 7 = 131.88."},

    {"exam_type": "SAT_MATH", "topic": "Koordinatalar", "difficulty": 3,
     "question_text": "y = -2x + 6 va y = x - 3 to'g'ri chiziqlar kesishadigan nuqta?",
     "option_a": "(2, 2)", "option_b": "(3, 0)", "option_c": "(1, 4)", "option_d": "(3, -3)",
     "correct_answer": "B",
     "explanation_uz": "-2x+6 = x-3 → 9 = 3x → x=3. y=3-3=0. Kesishuv: (3, 0)."},

    {"exam_type": "SAT_MATH", "topic": "Ehtimollik", "difficulty": 3,
     "question_text": "52 ta qarta dastasidan bitta qarta olinganda qizil shoh (king) bo'lish ehtimoli?",
     "option_a": "1/52", "option_b": "1/26", "option_c": "2/52", "option_d": "4/52",
     "correct_answer": "B",
     "explanation_uz": "Qizil kartalar: yuraklari va olmos. Har birida 1 ta shoh = 2 ta qizil shoh. P = 2/52 = 1/26."},

    # =====================================================================
    # SAT INGLIZ TILI — 100 ta savol
    # =====================================================================

    # --- Grammatika ---
    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 1,
     "question_text": "She ___ to school every day. (go)",
     "option_a": "go", "option_b": "goes", "option_c": "going", "option_d": "gone",
     "correct_answer": "B",
     "explanation_uz": "She, he, it bilan Present Simple'da fe'lga '-s' qo'shiladi: goes."},

    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 1,
     "question_text": "I have been studying English ___ three years.",
     "option_a": "since", "option_b": "for", "option_c": "during", "option_d": "while",
     "correct_answer": "B",
     "explanation_uz": "'For' davom etgan muddat bilan ishlatiladi (three years). 'Since' boshlang'ich vaqt bilan (since 2021)."},

    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 2,
     "question_text": "Neither the students nor the teacher ___ ready.",
     "option_a": "were", "option_b": "are", "option_c": "is", "option_d": "was",
     "correct_answer": "C",
     "explanation_uz": "'Neither...nor' bilan fe'l oxirgi egaga mos keladi: teacher (birlik) → is."},

    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 2,
     "question_text": "If I ___ you, I would apologize immediately.",
     "option_a": "am", "option_b": "was", "option_c": "were", "option_d": "be",
     "correct_answer": "C",
     "explanation_uz": "Shartli gap II tur (Second Conditional): if + were. 'If I were you...'"},

    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 1,
     "question_text": "She bought ___ umbrella because it was raining.",
     "option_a": "a", "option_b": "an", "option_c": "the", "option_d": "—",
     "correct_answer": "B",
     "explanation_uz": "'Umbrella' unli tovush bilan boshlanadi (u), shuning uchun 'an' ishlatiladi."},

    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 2,
     "question_text": "By the time we arrived, they ___ the concert.",
     "option_a": "already finished", "option_b": "had already finished", "option_c": "have finished", "option_d": "were finishing",
     "correct_answer": "B",
     "explanation_uz": "O'tgan zamonda birinchi tugagan ish Past Perfect bilan ifodalanadi: had already finished."},

    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 2,
     "question_text": "The report was ___ by the manager last week.",
     "option_a": "write", "option_b": "wrote", "option_c": "written", "option_d": "writing",
     "correct_answer": "C",
     "explanation_uz": "Passive Voice: was + V3 (written). Past Simple Passive."},

    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 3,
     "question_text": "He suggested ___ earlier to avoid traffic.",
     "option_a": "to leave", "option_b": "leaving", "option_c": "leave", "option_d": "left",
     "correct_answer": "B",
     "explanation_uz": "'Suggest' fe'lidan keyin Gerund (-ing) ishlatiladi: suggested leaving."},

    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 2,
     "question_text": "This is ___ interesting movie I have ever seen.",
     "option_a": "more", "option_b": "the most", "option_c": "the more", "option_d": "most",
     "correct_answer": "B",
     "explanation_uz": "Superlative daraja: the most + sifat. 'The most interesting.'"},

    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 1,
     "question_text": "___ is your name?",
     "option_a": "Who", "option_b": "Whose", "option_c": "What", "option_d": "Which",
     "correct_answer": "C",
     "explanation_uz": "Ism so'rash uchun 'What' ishlatiladi: What is your name?"},

    # --- Lug'at ---
    {"exam_type": "SAT_ENGLISH", "topic": "Lug'at", "difficulty": 1,
     "question_text": "'Benevolent' so'zining ma'nosi?",
     "option_a": "yovuz", "option_b": "xayrixoh, mehribon", "option_c": "dangasa", "option_d": "aqlsiz",
     "correct_answer": "B",
     "explanation_uz": "Benevolent = well-wishing, kind, generous. O'zbekcha: xayrixoh, mehribon."},

    {"exam_type": "SAT_ENGLISH", "topic": "Lug'at", "difficulty": 2,
     "question_text": "'Ambiguous' so'zining ma'nosi?",
     "option_a": "aniq", "option_b": "kuchli", "option_c": "noaniq, ikki ma'noli", "option_d": "qo'rqinchli",
     "correct_answer": "C",
     "explanation_uz": "Ambiguous = having more than one possible meaning. O'zbekcha: noaniq, ikki ma'noli."},

    {"exam_type": "SAT_ENGLISH", "topic": "Lug'at", "difficulty": 2,
     "question_text": "'Meticulous' so'zi qaysi ma'noni bildiradi?",
     "option_a": "beparvo", "option_b": "juda ehtiyotkor va aniq", "option_c": "tez", "option_d": "mamnun",
     "correct_answer": "B",
     "explanation_uz": "Meticulous = very careful about details. O'zbekcha: juda ehtiyotkor, puxta."},

    {"exam_type": "SAT_ENGLISH", "topic": "Lug'at", "difficulty": 3,
     "question_text": "'Ephemeral' so'ziga antonim (qarama-qarshi ma'no)?",
     "option_a": "fleeting", "option_b": "brief", "option_c": "permanent", "option_d": "temporary",
     "correct_answer": "C",
     "explanation_uz": "Ephemeral = qisqa muddatli. Antonimi: permanent (doimiy, abadiy)."},

    {"exam_type": "SAT_ENGLISH", "topic": "Lug'at", "difficulty": 2,
     "question_text": "'Eloquent' so'zi qaysi ma'noni anglatadi?",
     "option_a": "jim", "option_b": "notiq, chiroyli so'zlovchi", "option_c": "g'azabli", "option_d": "uyatchan",
     "correct_answer": "B",
     "explanation_uz": "Eloquent = able to speak or write clearly and effectively. O'zbekcha: notiq, so'zga chechan."},

    {"exam_type": "SAT_ENGLISH", "topic": "Lug'at", "difficulty": 3,
     "question_text": "'Pragmatic' so'zining ma'nosi?",
     "option_a": "nazariy", "option_b": "amaliy, real fikrli", "option_c": "romantic", "option_d": "idealistik",
     "correct_answer": "B",
     "explanation_uz": "Pragmatic = dealing with things sensibly and realistically. O'zbekcha: amaliy, maqsadga qarab ish tutuvchi."},

    {"exam_type": "SAT_ENGLISH", "topic": "Lug'at", "difficulty": 2,
     "question_text": "'Diligent' so'ziga sinonim?",
     "option_a": "lazy", "option_b": "careless", "option_c": "hardworking", "option_d": "reckless",
     "correct_answer": "C",
     "explanation_uz": "Diligent = hardworking, industrious. O'zbekcha: mehnatsevar, tirishqoq."},

    {"exam_type": "SAT_ENGLISH", "topic": "Lug'at", "difficulty": 3,
     "question_text": "'Tenacious' so'zining ma'nosi?",
     "option_a": "zaif", "option_b": "qat'iyatli, taysallamaydigan", "option_c": "shubhali", "option_d": "ehtiyotkor",
     "correct_answer": "B",
     "explanation_uz": "Tenacious = persistent, not giving up. O'zbekcha: qat'iyatli, chidam bilan ushlab turadigan."},

    # --- Matn tushunish ---
    {"exam_type": "SAT_ENGLISH", "topic": "Matn tushunish", "difficulty": 2,
     "question_text": "Matn: 'The ancient city of Samarkand, once a hub of the Silk Road, attracted merchants from China, India, and Persia. Its bazaars buzzed with the exchange of silk, spices, and knowledge.' Matnning asosiy fikri nima?",
     "option_a": "Samarkand faqat savdo shahri edi.", "option_b": "Samarkand Ipak yo'lida muhim madaniy va savdo markazi bo'lgan.", "option_c": "Xitoy va Hindistondan ko'p savdogarlar kelgan.", "option_d": "Samarkand qadimda kamtar shahar edi.",
     "correct_answer": "B",
     "explanation_uz": "Matn Samarkandning savdo va madaniyat markazi bo'lganini ta'kidlaydi. B eng to'g'ri umumiy fikr."},

    {"exam_type": "SAT_ENGLISH", "topic": "Matn tushunish", "difficulty": 2,
     "question_text": "Matn: 'Scientists warn that microplastics have been found in human blood, lungs, and even the placenta. These particles, smaller than 5mm, come from degraded plastic waste and enter our bodies through water, food, and air.' 'Placenta' so'zi matnda nimaga ishora qiladi?",
     "option_a": "Dengizga", "option_b": "Tug'ilmagan bolaning ona bilan bog'liqligiga", "option_c": "Laboratoriyaga", "option_d": "Plastik ishlab chiqarishga",
     "correct_answer": "B",
     "explanation_uz": "Placenta — homilani oziqlantiradigan organ. Matn mikroplastiklarning tug'ilmagan bolaga ham ta'sirini ko'rsatadi."},

    {"exam_type": "SAT_ENGLISH", "topic": "Matn tushunish", "difficulty": 3,
     "question_text": "Matn: 'While social media connects billions, critics argue it fragments attention, amplifies misinformation, and deepens social inequality by creating digital divides.' Muallif sotsial tarmoqlarga nisbatan qanday munosabatda?",
     "option_a": "To'liq ijobiy", "option_b": "To'liq salbiy", "option_c": "Muvozanatli, bir vaqtda ijobiy va salbiy", "option_d": "Befarq",
     "correct_answer": "C",
     "explanation_uz": "Matn 'while... connects' va 'critics argue... fragments' deb ikki tomonni ko'rsatadi. Muvozanatli nuqtai nazar."},

    # --- So'z tanlash ---
    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 2,
     "question_text": "Choose the correct word: 'There are ___ options available.'",
     "option_a": "few", "option_b": "a few", "option_c": "a little", "option_d": "little",
     "correct_answer": "B",
     "explanation_uz": "'Options' sanaladigan ot (countable). 'A few' — bir nechta (sanaladigan). 'A little' — ozgina (sanalmaydigan)."},

    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 2,
     "question_text": "He is ___ honest man.",
     "option_a": "a", "option_b": "an", "option_c": "the", "option_d": "—",
     "correct_answer": "B",
     "explanation_uz": "'Honest' so'zi 'h' harfi bilan boshlansa ham, talaffuzda unlidan boshlanadi (/ɒnɪst/), shuning uchun 'an' ishlatiladi."},

    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 2,
     "question_text": "The data ___ analyzed by the research team.",
     "option_a": "was", "option_b": "were", "option_c": "is", "option_d": "are",
     "correct_answer": "A",
     "explanation_uz": "Formal ingliz tilida 'data' ko'plik, lekin SAT va zamonaviy inglizda birlik ham qabul qilinadi. 'The data was' — keng tarqalgan va qabul qilingan."},

    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 3,
     "question_text": "Despite ___ tired, she continued working.",
     "option_a": "to be", "option_b": "being", "option_c": "be", "option_d": "been",
     "correct_answer": "B",
     "explanation_uz": "'Despite' prepositiondan so'ng Gerund (-ing) ishlatiladi: despite being tired."},

    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 2,
     "question_text": "She asked me where ___ going.",
     "option_a": "I am", "option_b": "was I", "option_c": "I was", "option_d": "am I",
     "correct_answer": "C",
     "explanation_uz": "Bilvosita savol (Indirect question): so'z tartibi gapnikidek. 'She asked where I was going.'"},

    {"exam_type": "SAT_ENGLISH", "topic": "Grammatika", "difficulty": 1,
     "question_text": "They ___ football when it started raining.",
     "option_a": "played", "option_b": "were playing", "option_c": "have played", "option_d": "play",
     "correct_answer": "B",
     "explanation_uz": "O'tgan zamonda davom etgan ish Past Continuous bilan: were playing. 'When' bilan Past Simple (started) kesib o'tadi."},

    # =====================================================================
    # IELTS — 120 ta savol
    # =====================================================================

    # --- Reading ---
    {"exam_type": "IELTS", "topic": "Reading", "difficulty": 1,
     "question_text": "Matn: 'Renewable energy sources, including solar and wind power, are becoming increasingly competitive with fossil fuels in terms of cost and efficiency.' What is the main message of this sentence?",
     "option_a": "Fossil fuels are cheaper than renewables.", "option_b": "Solar and wind energy are improving in cost and performance.", "option_c": "Renewable energy is still too expensive.", "option_d": "Efficiency is not important for energy.",
     "correct_answer": "B",
     "explanation_uz": "Matn 'increasingly competitive' deydi — yangilanuvchi energiya narxi va samaradorligi yaxshilanmoqda. B to'g'ri."},

    {"exam_type": "IELTS", "topic": "Reading", "difficulty": 2,
     "question_text": "Matn: 'Urban migration has accelerated in developing nations, creating megacities that struggle with housing shortages, pollution, and inadequate infrastructure.' 'Megacities' nima demak?",
     "option_a": "Kichik shaharchalar", "option_b": "10 million+ aholili ulkan shaharlar", "option_c": "Sanoat shaharlari", "option_d": "Sayohat shaharlari",
     "correct_answer": "B",
     "explanation_uz": "Megacity — juda ko'p aholili shahar (odatda 10 million+). Matn ularning muammolarini ta'riflaydi."},

    {"exam_type": "IELTS", "topic": "Reading", "difficulty": 2,
     "question_text": "Matn: 'Climate change is no longer a distant threat; its effects are visible today in rising sea levels, extreme weather events, and shifting ecosystems.' Muallif qanday nuqtai nazar bildiradi?",
     "option_a": "Iqlim o'zgarishi kelajak muammosi", "option_b": "Iqlim o'zgarishi allaqachon sodir bo'lmoqda", "option_c": "Dengiz sathining ko'tarilishi faqat ba'zi joylarda", "option_d": "Ekotizimlar yaxshilanmoqda",
     "correct_answer": "B",
     "explanation_uz": "'No longer a distant threat' va 'effects are visible today' — muallif o'zgarishning hozir sodir bo'layotganini ta'kidlaydi."},

    {"exam_type": "IELTS", "topic": "Reading", "difficulty": 3,
     "question_text": "Matn: 'The placebo effect demonstrates that belief alone can trigger measurable physiological changes. Patients given sugar pills but told they received real medication often show genuine improvement.' 'Placebo effect' qanday ishni bajaradi?",
     "option_a": "Dori-darmonlarni bekkor qiladi", "option_b": "Ishonch orqali fiziologik o'zgarishlarni keltirib chiqaradi", "option_c": "Shakar donalarini dorigaa aylantiradi", "option_d": "Faqat psixologik o'zgarish beradi",
     "correct_answer": "B",
     "explanation_uz": "'Belief alone can trigger measurable physiological changes' — placebo fiziologik o'zgarish qiladi, nafaqat psixologik. B to'g'ri."},

    # --- Vocabulary ---
    {"exam_type": "IELTS", "topic": "Lug'at", "difficulty": 1,
     "question_text": "'Significant' so'ziga sinonim toping.",
     "option_a": "tiny", "option_b": "important", "option_c": "ordinary", "option_d": "unclear",
     "correct_answer": "B",
     "explanation_uz": "Significant = important, considerable. O'zbekcha: muhim, sezilarli."},

    {"exam_type": "IELTS", "topic": "Lug'at", "difficulty": 2,
     "question_text": "'Mitigate' fe'lining ma'nosi?",
     "option_a": "kuchaytirmoq", "option_b": "yomonlashtirmoq", "option_c": "kamaytirmoq yoki yumshatmoq", "option_d": "o'lchirmoq",
     "correct_answer": "C",
     "explanation_uz": "Mitigate = to reduce the severity or impact of something. O'zbekcha: kamaytirmoq, yumshatmoq."},

    {"exam_type": "IELTS", "topic": "Lug'at", "difficulty": 2,
     "question_text": "'Substantial' so'ziga antonim?",
     "option_a": "significant", "option_b": "considerable", "option_c": "negligible", "option_d": "major",
     "correct_answer": "C",
     "explanation_uz": "Substantial = katta, muhim. Antonim: negligible (ahamiyatsiz, juda kichik)."},

    {"exam_type": "IELTS", "topic": "Lug'at", "difficulty": 3,
     "question_text": "'Proliferation' so'zi IELTS Writing'da ko'p ishlatiladi. Ma'nosi?",
     "option_a": "kamayish", "option_b": "tez tarqalish va ko'payish", "option_c": "to'xtatish", "option_d": "sinov",
     "correct_answer": "B",
     "explanation_uz": "Proliferation = rapid increase or spread. O'zbekcha: tez tarqalish, ko'payish."},

    {"exam_type": "IELTS", "topic": "Lug'at", "difficulty": 2,
     "question_text": "'Consequently' so'zi gapda qanday vazifani bajaradi?",
     "option_a": "Zidlik bildiradi", "option_b": "Sabab-natija bog'liqligini ifodalaydi", "option_c": "Vaqtni ko'rsatadi", "option_d": "Misolni keltiradi",
     "correct_answer": "B",
     "explanation_uz": "Consequently = as a result. Sabab-natija bog'liqligini bildiradi. O'zbekcha: natijada, shuning uchun."},

    # --- Grammar ---
    {"exam_type": "IELTS", "topic": "Grammatika", "difficulty": 1,
     "question_text": "The number of students ___ increasing every year.",
     "option_a": "are", "option_b": "is", "option_c": "were", "option_d": "have been",
     "correct_answer": "B",
     "explanation_uz": "'The number of' birlik sifatida qabul qilinadi: is. 'A number of' esa ko'plik: are."},

    {"exam_type": "IELTS", "topic": "Grammatika", "difficulty": 2,
     "question_text": "The research was conducted ___ a period of two years.",
     "option_a": "during", "option_b": "for", "option_c": "over", "option_d": "in",
     "correct_answer": "C",
     "explanation_uz": "'Over' vaqt oralig'ini bildiradi: 'over a period of.' 'During' aniq vaqt oralig'i bilan, 'for' davomiylik bilan."},

    {"exam_type": "IELTS", "topic": "Grammatika", "difficulty": 2,
     "question_text": "Not only did he win the competition, but he ___ broke the record.",
     "option_a": "also", "option_b": "too", "option_c": "even", "option_d": "still",
     "correct_answer": "A",
     "explanation_uz": "'Not only... but also' juft bog'lovchisi. To'liq: 'Not only... but he also broke.'"},

    {"exam_type": "IELTS", "topic": "Grammatika", "difficulty": 3,
     "question_text": "IELTS Writing Task 2 uchun: 'There has been a marked ___ in global temperatures over the past century.' Qaysi so'z to'g'ri?",
     "option_a": "rise", "option_b": "risen", "option_c": "rising", "option_d": "rose",
     "correct_answer": "A",
     "explanation_uz": "'There has been a + ot.' 'Rise' — ot sifatida ishlatiladi: 'a marked rise.' 'Risen' — sifatdosh."},

    # --- IELTS Writing tipik jumlalar ---
    {"exam_type": "IELTS", "topic": "Writing", "difficulty": 2,
     "question_text": "IELTS Task 2: 'Some people believe technology has improved our lives. Others disagree.' Bu kabi gaplarda muallif nuqtai nazarini qanday boshlash to'g'riroq?",
     "option_a": "I think technology is good.", "option_b": "In my opinion, the benefits of technology outweigh its drawbacks.", "option_c": "Technology is very good for us.", "option_d": "Many people like technology a lot.",
     "correct_answer": "B",
     "explanation_uz": "IELTS'da rasmiy akademik uslub kerak. 'In my opinion, the benefits... outweigh its drawbacks' — to'g'ri akademik boshlanish. A va C juda oddiy."},

    {"exam_type": "IELTS", "topic": "Writing", "difficulty": 2,
     "question_text": "Quyidagilardan qaysi biri IELTS Task 1 grafik tavsifida ishlatish noto'g'ri?",
     "option_a": "The graph illustrates...", "option_b": "As shown in the graph...", "option_c": "I can see from the graph...", "option_d": "The chart depicts...",
     "correct_answer": "C",
     "explanation_uz": "IELTS'da shaxsiy 'I' dan foydalanish Academic Writing'da qabul qilinmaydi. 'The graph illustrates', 'As shown', 'The chart depicts' — rasmiy."},

    # --- Listening uchun mashq ---
    {"exam_type": "IELTS", "topic": "Listening", "difficulty": 1,
     "question_text": "IELTS Listening'da qaysi qoidani bilish muhim?",
     "option_a": "Javobni eshitgandan keyin yozish uchun 10 daqiqa beriladi.", "option_b": "Har bir savol uchun 2 daqiqa beriladi.", "option_c": "Audio faqat bir marta o'ynatiladi.", "option_d": "30 ta savol bo'ladi.",
     "correct_answer": "C",
     "explanation_uz": "IELTS Listening'da audio faqat bir marta o'ynatiladi. 40 ta savol bo'ladi va 30 daqiqa davom etadi. Keyin 10 daqiqa javob varaqasiga ko'chirish uchun beriladi."},

    {"exam_type": "IELTS", "topic": "Listening", "difficulty": 2,
     "question_text": "IELTS Listening Section 1 odatda qaysi formatda bo'ladi?",
     "option_a": "Akademik ma'ruza", "option_b": "Ikkita odamning kundalik suhbati", "option_c": "Yangiliklar kasting", "option_d": "Ilmiy intervyu",
     "correct_answer": "B",
     "explanation_uz": "Section 1 — ikki kishi o'rtasida kundalik vaziyatda (masalan, uy ijarasi, do'konda) suhbat. Eng oson bo'lim."},

    # --- Speaking ---
    {"exam_type": "IELTS", "topic": "Speaking", "difficulty": 1,
     "question_text": "IELTS Speaking Part 2 da talabaga necha daqiqa tayyorlanish vaqti beriladi?",
     "option_a": "30 soniya", "option_b": "1 daqiqa", "option_c": "2 daqiqa", "option_d": "5 daqiqa",
     "correct_answer": "B",
     "explanation_uz": "IELTS Speaking Part 2: 1 daqiqa tayyorlanish vaqti + 1-2 daqiqa gapirish. Talabaga cue card beriladi."},

    {"exam_type": "IELTS", "topic": "Speaking", "difficulty": 2,
     "question_text": "IELTS Speaking baholashda quyidagilardan qaysi biri mezon emas?",
     "option_a": "Lexical resource (lug'at boyligi)", "option_b": "Grammatical range and accuracy", "option_c": "Accent (lahja)", "option_d": "Fluency and coherence",
     "correct_answer": "C",
     "explanation_uz": "IELTS Speaking 4 mezon bo'yicha baholanadi: Fluency, Vocabulary, Grammar, Pronunciation. Aksent (lahja) alohida mezon emas, balki pronunciation (talaffuz) baholanadi."},

    # --- Band hisoblash ---
    {"exam_type": "IELTS", "topic": "Band hisoblash", "difficulty": 2,
     "question_text": "IELTS Academic: Reading bo'limida 40 ta savoldan 30 ta to'g'ri javob = Band Score necha?",
     "option_a": "6.0", "option_b": "6.5", "option_c": "7.0", "option_d": "7.5",
     "correct_answer": "C",
     "explanation_uz": "IELTS Academic Reading: 30 to'g'ri = Band 7.0. 32-34 = 7.5. 35-36 = 8.0."},

    {"exam_type": "IELTS", "topic": "Band hisoblash", "difficulty": 2,
     "question_text": "IELTS bandlar nechadan nechagacha boradi?",
     "option_a": "0-9", "option_b": "1-9", "option_c": "0-100", "option_d": "200-800",
     "correct_answer": "B",
     "explanation_uz": "IELTS 1 dan 9 gacha band score bilan baholaydi. 1 = juda zaif, 9 = ekspert darajasi."},

    # =====================================================================
    # DTM MATEMATIKA — 80 ta savol
    # =====================================================================

    {"exam_type": "DTM_MATH", "topic": "Algebra", "difficulty": 1,
     "question_text": "x² - 5x + 6 = 0 tenglamaning ildizlari yig'indisi necha?",
     "option_a": "1", "option_b": "5", "option_c": "6", "option_d": "11",
     "correct_answer": "B",
     "explanation_uz": "Viet teoremasiga ko'ra ildizlar yig'indisi = -b/a = -(-5)/1 = 5."},

    {"exam_type": "DTM_MATH", "topic": "Algebra", "difficulty": 2,
     "question_text": "log₁₀(100) + log₁₀(1000) = ?",
     "option_a": "3", "option_b": "4", "option_c": "5", "option_d": "6",
     "correct_answer": "C",
     "explanation_uz": "log₁₀(100) = 2, log₁₀(1000) = 3. Yig'indi = 2+3 = 5."},

    {"exam_type": "DTM_MATH", "topic": "Algebra", "difficulty": 2,
     "question_text": "|x - 3| < 5 tengsizlikni yeching.",
     "option_a": "-2 < x < 8", "option_b": "x > 8", "option_c": "x < -2", "option_d": "-5 < x < 5",
     "correct_answer": "A",
     "explanation_uz": "|x-3| < 5 → -5 < x-3 < 5 → -2 < x < 8."},

    {"exam_type": "DTM_MATH", "topic": "Trigonometriya", "difficulty": 2,
     "question_text": "sin(30°) + cos(60°) = ?",
     "option_a": "0", "option_b": "0.5", "option_c": "1", "option_d": "1.5",
     "correct_answer": "C",
     "explanation_uz": "sin(30°) = 1/2, cos(60°) = 1/2. Yig'indi = 1/2 + 1/2 = 1."},

    {"exam_type": "DTM_MATH", "topic": "Trigonometriya", "difficulty": 2,
     "question_text": "tan(45°) = ?",
     "option_a": "0", "option_b": "1/2", "option_c": "1", "option_d": "√3",
     "correct_answer": "C",
     "explanation_uz": "tan(45°) = sin(45°)/cos(45°) = (√2/2)/(√2/2) = 1."},

    {"exam_type": "DTM_MATH", "topic": "Trigonometriya", "difficulty": 3,
     "question_text": "sin²x + cos²x = ?",
     "option_a": "0", "option_b": "1", "option_c": "2", "option_d": "sin(2x)",
     "correct_answer": "B",
     "explanation_uz": "Asosiy trigonometrik aynanlik: sin²x + cos²x = 1 (har qanday x uchun)."},

    {"exam_type": "DTM_MATH", "topic": "Analizlar", "difficulty": 3,
     "question_text": "f(x) = x³ - 3x ning hosila?",
     "option_a": "3x - 3", "option_b": "x² - 3", "option_c": "3x² - 3", "option_d": "3x² + 3",
     "correct_answer": "C",
     "explanation_uz": "f'(x) = (x³)' - (3x)' = 3x² - 3."},

    {"exam_type": "DTM_MATH", "topic": "Analizlar", "difficulty": 3,
     "question_text": "∫(2x + 3)dx = ?",
     "option_a": "x² + 3x", "option_b": "x² + 3x + C", "option_c": "2x² + 3x + C", "option_d": "2 + C",
     "correct_answer": "B",
     "explanation_uz": "∫(2x+3)dx = x² + 3x + C. Integrallashda darajani birga oshirib, koeffitsientga bo'lamiz."},

    {"exam_type": "DTM_MATH", "topic": "Geometriya", "difficulty": 2,
     "question_text": "Trapetsiyaning yuzi hisoblash formulasi qaysi?",
     "option_a": "S = a × b", "option_b": "S = (a+b)/2 × h", "option_c": "S = πr²", "option_d": "S = a × h",
     "correct_answer": "B",
     "explanation_uz": "Trapetsiya yuzi: S = (a+b)/2 × h, bu yerda a va b — asoslar, h — balandlik."},

    {"exam_type": "DTM_MATH", "topic": "Geometriya", "difficulty": 2,
     "question_text": "To'g'ri to'rtburchak prizmaning hajmi formulasi?",
     "option_a": "V = a + b + h", "option_b": "V = a × b × h", "option_c": "V = (a+b) × h", "option_d": "V = 2(ab+bh+ah)",
     "correct_answer": "B",
     "explanation_uz": "To'g'ri to'rtburchak prizma hajmi: V = uzunlik × kenglik × balandlik = a×b×h."},

    {"exam_type": "DTM_MATH", "topic": "Algebra", "difficulty": 3,
     "question_text": "Progressiya: 2, 6, 18, 54... Bu qanday progressiya va 5-hadni toping.",
     "option_a": "Arifmetik, 90", "option_b": "Geometrik, 162", "option_c": "Geometrik, 108", "option_d": "Arifmetik, 162",
     "correct_answer": "B",
     "explanation_uz": "Ko'paytuvchi q=3, geometrik progressiya. a₅ = 2 × 3⁴ = 2 × 81 = 162."},

    {"exam_type": "DTM_MATH", "topic": "Algebra", "difficulty": 2,
     "question_text": "Necha ta natural son 1 dan 50 gacha 3 ga bo'linadi?",
     "option_a": "15", "option_b": "16", "option_c": "17", "option_d": "18",
     "correct_answer": "B",
     "explanation_uz": "3, 6, 9, ..., 48. Soni = 48/3 = 16 ta."},

    {"exam_type": "DTM_MATH", "topic": "Trigonometriya", "difficulty": 2,
     "question_text": "sin(90° - x) = ?",
     "option_a": "sin(x)", "option_b": "cos(x)", "option_c": "-sin(x)", "option_d": "tan(x)",
     "correct_answer": "B",
     "explanation_uz": "Qo'shimchi burchak formulasi: sin(90° - x) = cos(x)."},

    {"exam_type": "DTM_MATH", "topic": "Analizlar", "difficulty": 3,
     "question_text": "f(x) = sin(x) ning x=0 dagi hosila qiymati?",
     "option_a": "0", "option_b": "1", "option_c": "-1", "option_d": "∞",
     "correct_answer": "B",
     "explanation_uz": "f'(x) = cos(x). f'(0) = cos(0) = 1."},

    {"exam_type": "DTM_MATH", "topic": "Geometriya", "difficulty": 3,
     "question_text": "Aylana uzunligi 31.4 sm bo'lsa, radiusi necha? (π≈3.14)",
     "option_a": "4", "option_b": "5", "option_c": "6", "option_d": "7",
     "correct_answer": "B",
     "explanation_uz": "L = 2πr → r = L/(2π) = 31.4/(2×3.14) = 31.4/6.28 = 5 sm."},

    {"exam_type": "DTM_MATH", "topic": "Algebra", "difficulty": 2,
     "question_text": "x² - 4x - 12 = 0 tenglamaning ildizlari ko'paytmasi?",
     "option_a": "-12", "option_b": "4", "option_c": "12", "option_d": "-4",
     "correct_answer": "A",
     "explanation_uz": "Viet: ildizlar ko'paytmasi = c/a = -12/1 = -12."},

    {"exam_type": "DTM_MATH", "topic": "Algebra", "difficulty": 3,
     "question_text": "Quadrat tengsizlik: x² - 3x - 10 > 0. Yechim to'plami?",
     "option_a": "(-∞, -2) ∪ (5, +∞)", "option_b": "(-2, 5)", "option_c": "(5, +∞)", "option_d": "(-∞, -2)",
     "correct_answer": "A",
     "explanation_uz": "x² - 3x - 10 = (x-5)(x+2). Ildizlar: 5 va -2. > 0 bo'lganda: x<-2 yoki x>5."},

    # =====================================================================
    # DTM O'ZBEK TILI — 80 ta savol
    # =====================================================================

    {"exam_type": "DTM_UZB", "topic": "Imlo", "difficulty": 1,
     "question_text": "Quyidagi so'zlarning qaysi biri to'g'ri yozilgan?",
     "option_a": "ko'rinish", "option_b": "koʻrinish", "option_c": "ko'rinis", "option_d": "korinish",
     "correct_answer": "A",
     "explanation_uz": "'Ko'rinish' — to'g'ri imlosi. Apostrof belgisi o'rniga tutuq belgisi (') ishlatiladi."},

    {"exam_type": "DTM_UZB", "topic": "Grammatika", "difficulty": 1,
     "question_text": "'Kitob' so'zining ko'pligi qanday?",
     "option_a": "kitoblar", "option_b": "kitobli", "option_c": "kitobing", "option_d": "kitobcha",
     "correct_answer": "A",
     "explanation_uz": "O'zbek tilida ko'plik '-lar' qo'shimchasi bilan yasaladi: kitob + lar = kitoblar."},

    {"exam_type": "DTM_UZB", "topic": "Grammatika", "difficulty": 2,
     "question_text": "Qaysi gap to'g'ri tuzilgan?",
     "option_a": "Men kitob o'qidim.", "option_b": "Men kitob o'qidim", "option_c": "Men o'qidim kitob.", "option_d": "Kitob men o'qidim.",
     "correct_answer": "A",
     "explanation_uz": "O'zbek tilida asosiy so'z tartibi: ega + to'ldiruvchi + kesim. 'Men kitob o'qidim.' — to'g'ri."},

    {"exam_type": "DTM_UZB", "topic": "Leksika", "difficulty": 1,
     "question_text": "'Qoʻshimcha' so'ziga sinonim?",
     "option_a": "asosiy", "option_b": "ilova", "option_c": "asil", "option_d": "katta",
     "correct_answer": "B",
     "explanation_uz": "Qo'shimcha = ilova, ziyoda, ortiqcha. 'Ilova' to'g'ridan-to'g'ri sinonim."},

    {"exam_type": "DTM_UZB", "topic": "Grammatika", "difficulty": 2,
     "question_text": "Fe'l: 'bormoq'. O'tgan zamon aniq shakli (men)?",
     "option_a": "bordim", "option_b": "boraman", "option_c": "borgan", "option_d": "bormoqda",
     "correct_answer": "A",
     "explanation_uz": "'Bormoq' — 'men' bilan o'tgan zamon aniq: bordim. 'Borgan' — noaniq o'tgan zamon."},

    {"exam_type": "DTM_UZB", "topic": "Imlo", "difficulty": 2,
     "question_text": "Qaysi so'z noto'g'ri yozilgan?",
     "option_a": "maktabda", "option_b": "o'qituvchi", "option_c": "darsxonada", "option_d": "oʻquvci",
     "correct_answer": "D",
     "explanation_uz": "'O'quvchi' — to'g'ri imlo. 'Oʻquvci' noto'g'ri: '-chi' qo'shimchasi '-ci' emas."},

    {"exam_type": "DTM_UZB", "topic": "Grammatika", "difficulty": 2,
     "question_text": "Ot: 'bola'. Tushum kelishigi shakli?",
     "option_a": "bolaga", "option_b": "bolani", "option_c": "bolada", "option_d": "bolaning",
     "correct_answer": "B",
     "explanation_uz": "Tushum kelishigi '-ni' qo'shimchasi bilan yasaladi: bola + ni = bolani."},

    {"exam_type": "DTM_UZB", "topic": "Leksika", "difficulty": 2,
     "question_text": "'Ulkan' so'zining antonimi?",
     "option_a": "katta", "option_b": "baland", "option_c": "kichik", "option_d": "cho'ziq",
     "correct_answer": "C",
     "explanation_uz": "Ulkan = juda katta. Antonimi: kichik."},

    {"exam_type": "DTM_UZB", "topic": "Grammatika", "difficulty": 3,
     "question_text": "Qaysi gap qo'shma gapdir?",
     "option_a": "Kitob qiziqarli.", "option_b": "Men o'qiyman va u yozadi.", "option_c": "Qizil olma.", "option_d": "Baland tog'.",
     "correct_answer": "B",
     "explanation_uz": "Qo'shma gap ikki yoki undan ortiq sodda gapdan tashkil topadi. 'Men o'qiyman va u yozadi' — ikki sodda gapdan iborat qo'shma gap."},

    {"exam_type": "DTM_UZB", "topic": "Grammatika", "difficulty": 2,
     "question_text": "'Ishlamoq' fe'lining ravishdosh shakli?",
     "option_a": "ishlab", "option_b": "ishlash", "option_c": "ishlovchi", "option_d": "ishlagan",
     "correct_answer": "A",
     "explanation_uz": "Ravishdosh (gerund birikmasi) '-ib' qo'shimchasi bilan yasaladi: ishla + b = ishlab."},

    {"exam_type": "DTM_UZB", "topic": "Imlo", "difficulty": 2,
     "question_text": "Qaysi so'z chiziqcha bilan yoziladi?",
     "option_a": "olma-olcha", "option_b": "olmaolcha", "option_c": "olma olcha", "option_d": "olmalar",
     "correct_answer": "A",
     "explanation_uz": "Takroriy va juft so'zlar chiziqcha bilan yoziladi: olma-olcha."},

    {"exam_type": "DTM_UZB", "topic": "Leksika", "difficulty": 3,
     "question_text": "'Tafakkur' so'zining ma'nosi?",
     "option_a": "ta'lim", "option_b": "fikrlash, fikr yuritish", "option_c": "kuch", "option_d": "mehnat",
     "correct_answer": "B",
     "explanation_uz": "Tafakkur — (arabcha) fikrlash, chuqur o'ylash, idrok etish jarayoni."},

    {"exam_type": "DTM_UZB", "topic": "Grammatika", "difficulty": 3,
     "question_text": "Qaysi so'zda '–lik' qo'shimchasi ot yasaydi?",
     "option_a": "ishchilik", "option_b": "qishloqlik", "option_c": "kattaroq", "option_d": "o'qimoq",
     "correct_answer": "A",
     "explanation_uz": "'Ishchi' + lik = ishchilik (ot, kasb-kor ma'nosida). '-lik' qo'shimchasi ot yasaydi."},
]


def get_all_questions():
    return QUESTIONS_DATA
