# GlobalAdmit v2.0 — Xavfsiz Tayyorlov Platformasi

O'zbek abituriyentlari uchun SAT, IELTS, DTM va boshqa imtihonlarga to'liq tayyorlov platformasi.

## Xavfsizlik (v2.0 yangiliklari)

| Xavf | Yechim |
|------|--------|
| Javoblar API orqali ochiq edi | Savollar javobsiz qaytariladi, `/check` endpointda tekshiriladi |
| Foydalanuvchi tizimi yo'q edi | JWT (access + refresh token), bcrypt parol |
| Rate limiting yo'q edi | slowapi: login 10/min, savol olish 30/min |
| XSS xavfi bor edi | Barcha foydalanuvchi ma'lumotlari `html.escape()` bilan tozalanadi |
| CORS ochiq edi | Faqat `FRONTEND_URL` ga ruxsat |
| Admin parol kodda edi | `.env` fayli orqali, Dockerfile'da yo'q |

## Ishga tushirish

### Backend

```bash
cd globaladmit/backend

# .env faylini tekshiring/o'zgartiring
# SECRET_KEY ni kamida 32 ta belgiga o'zgartiring!

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API hujjatlari: http://localhost:8000/api/docs

### Frontend

```bash
cd globaladmit/frontend
npm install
npm run dev
```

Brauzerda: http://localhost:5173

### Birinchi admin yaratish

1. `/register` sahifasida ro'yxatdan o'ting
2. Terminalda:
```bash
# ADMIN_KEY .env faylidan oling
curl -X POST http://localhost:8000/api/init-admin \
  -H "Content-Type: application/json" \
  -d '{"admin_key": "globaladmit-admin-key-2024", "email": "sizning@email.com"}'
```

## Savollar

- Hozir: ~80 ta original savol (SAT Math, SAT English, IELTS, DTM Math, DTM Uzbek)
- Mualliflik huquqi: Barcha savollar original yozilgan, hech biri rasmiy imtihondan nusxa emas
- Yangi savol qo'shish: Admin hisobidan `/api/docs` → `POST /api/admin/questions`

## Fayl strukturasi

```
globaladmit/
├── backend/
│   ├── main.py          # FastAPI app, barcha endpointlar
│   ├── auth.py          # JWT, bcrypt
│   ├── models.py        # SQLAlchemy modellari
│   ├── questions.py     # Savollar banki
│   ├── requirements.txt
│   ├── .env             # ← Bu faylni gitga qo'shmang!
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── App.jsx           # Router, auth guard
    │   ├── api/
    │   │   ├── index.js      # Axios + interceptors
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── LandingPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── TestPage.jsx
    │   │   └── LeaderboardPage.jsx
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── Toast.jsx
    │   └── index.css
    └── .env

```

## Keyingi bosqichlar

- [ ] 500+ ta savol (hozir ~80)
- [ ] DTM bo'limlarini kengaytirish
- [ ] IELTS Speaking uchun ovoz yozib yuborish
- [ ] Telegram bot (kunlik eslatma, mini-test)
- [ ] Click/Payme to'lov tizimi
- [ ] HTTPS/nginx sozlamalari
- [ ] Email tasdiqlash
