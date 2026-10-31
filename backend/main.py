import os
import sys
import json
import random
import html
from datetime import datetime, timedelta
from typing import Optional, List

if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr, field_validator
from dotenv import load_dotenv

from models import User, Question, Attempt, RefreshToken, get_db, create_tables
from auth import (
    hash_password, verify_password,
    create_access_token, create_refresh_token,
    get_current_user, get_admin_user
)
from questions import get_all_questions

load_dotenv()

ADMIN_KEY = os.getenv("ADMIN_KEY", "")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="GlobalAdmit API",
    description="O'zbek abituriyentlari uchun tayyorlov platformasi",
    version="2.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

# ─── Schemas ──────────────────────────────────────────────────────────────────

class RegisterSchema(BaseModel):
    email: EmailStr
    username: str
    full_name: str
    password: str

    @field_validator("username")
    @classmethod
    def username_alphanumeric(cls, v):
        v = v.strip()
        if len(v) < 3 or len(v) > 30:
            raise ValueError("Username 3-30 ta belgi bo'lishi kerak")
        if not v.replace("_", "").isalnum():
            raise ValueError("Username faqat harf, raqam va _ bo'lishi mumkin")
        return v

    @field_validator("password")
    @classmethod
    def password_strong(cls, v):
        if len(v) < 8:
            raise ValueError("Parol kamida 8 ta belgi bo'lishi kerak")
        return v

    @field_validator("full_name")
    @classmethod
    def full_name_valid(cls, v):
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Ism kamida 2 ta belgi bo'lishi kerak")
        return v


class LoginSchema(BaseModel):
    email: EmailStr
    password: str


class RefreshSchema(BaseModel):
    refresh_token: str


class AttemptSchema(BaseModel):
    exam_type: str
    total_questions: int
    correct_count: int
    time_spent_seconds: Optional[int] = None
    answers: Optional[dict] = None

    @field_validator("exam_type")
    @classmethod
    def valid_exam(cls, v):
        allowed = {"SAT_MATH", "SAT_ENGLISH", "IELTS", "DTM_MATH", "DTM_UZB"}
        if v not in allowed:
            raise ValueError(f"Noto'g'ri imtihon turi: {v}")
        return v

    @field_validator("total_questions")
    @classmethod
    def valid_total(cls, v):
        if v < 1 or v > 100:
            raise ValueError("Savol soni 1-100 oralig'ida bo'lishi kerak")
        return v

    @field_validator("correct_count")
    @classmethod
    def valid_correct(cls, v, info):
        if hasattr(info, 'data') and 'total_questions' in info.data:
            if v < 0 or v > info.data['total_questions']:
                raise ValueError("To'g'ri javoblar soni umumiydan ko'p bo'lishi mumkin emas")
        return v


class AddQuestionSchema(BaseModel):
    exam_type: str
    topic: str
    difficulty: int
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: str
    explanation_uz: str

    @field_validator("correct_answer")
    @classmethod
    def valid_answer(cls, v):
        if v.upper() not in ("A", "B", "C", "D"):
            raise ValueError("Javob A, B, C yoki D bo'lishi kerak")
        return v.upper()

    @field_validator("difficulty")
    @classmethod
    def valid_difficulty(cls, v):
        if v not in (1, 2, 3):
            raise ValueError("Qiyinlik 1, 2 yoki 3 bo'lishi kerak")
        return v


# ─── Startup ──────────────────────────────────────────────────────────────────

@app.on_event("startup")
async def startup_event():
    create_tables()
    db = next(get_db())
    try:
        # Savollar bazaga faqat bo'sh bo'lsa yuklanadi
        if db.query(Question).count() == 0:
            questions_data = get_all_questions()
            q_objs = [
                Question(
                    exam_type=html.escape(q["exam_type"]),
                    topic=html.escape(q["topic"]),
                    difficulty=int(q["difficulty"]),
                    question_text=q["question_text"],
                    option_a=q["option_a"],
                    option_b=q["option_b"],
                    option_c=q["option_c"],
                    option_d=q["option_d"],
                    correct_answer=q["correct_answer"].upper(),
                    explanation_uz=q["explanation_uz"],
                )
                for q in questions_data
            ]
            db.add_all(q_objs)
            db.commit()
            print(f"[OK] {len(questions_data)} ta savol bazaga yuklandi.")
    finally:
        db.close()


# ─── Auth endpoints ───────────────────────────────────────────────────────────

@app.post("/api/auth/register", tags=["Auth"])
@limiter.limit("5/minute")
async def register(request: Request, body: RegisterSchema, db: Session = Depends(get_db)):
    """Yangi foydalanuvchi ro'yxatdan o'tkazish."""
    if db.query(User).filter(User.email == body.email).first():
        raise HTTPException(400, detail="Bu email allaqachon ro'yxatdan o'tgan")
    if db.query(User).filter(User.username == body.username).first():
        raise HTTPException(400, detail="Bu username band, boshqa tanlang")

    user = User(
        email=body.email,
        username=body.username,
        full_name=html.escape(body.full_name.strip()),
        hashed_password=hash_password(body.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    access = create_access_token({"sub": str(user.id)})
    refresh = create_refresh_token(db, user.id)

    return {
        "access_token": access,
        "refresh_token": refresh,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "full_name": user.full_name,
            "streak": user.streak,
            "total_points": user.total_points,
        }
    }


@app.post("/api/auth/login", tags=["Auth"])
@limiter.limit("10/minute")
async def login(request: Request, body: LoginSchema, db: Session = Depends(get_db)):
    """Email va parol bilan kirish."""
    user = db.query(User).filter(User.email == body.email, User.is_active == True).first()
    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(401, detail="Email yoki parol noto'g'ri")

    access = create_access_token({"sub": str(user.id)})
    refresh = create_refresh_token(db, user.id)

    # Streak yangilash
    today = datetime.utcnow().date()
    if user.last_activity:
        diff = (today - user.last_activity.date()).days
        if diff == 1:
            user.streak += 1
        elif diff > 1:
            user.streak = 1
    else:
        user.streak = 1
    user.last_activity = datetime.utcnow()
    db.commit()

    return {
        "access_token": access,
        "refresh_token": refresh,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "full_name": user.full_name,
            "streak": user.streak,
            "total_points": user.total_points,
        }
    }


@app.post("/api/auth/refresh", tags=["Auth"])
async def refresh_token(body: RefreshSchema, db: Session = Depends(get_db)):
    """Refresh token bilan yangi access token olish."""
    token_record = db.query(RefreshToken).filter(
        RefreshToken.token == body.refresh_token,
        RefreshToken.is_revoked == False,
        RefreshToken.expires_at > datetime.utcnow()
    ).first()

    if not token_record:
        raise HTTPException(401, detail="Refresh token yaroqsiz yoki muddati o'tgan")

    token_record.is_revoked = True
    new_access = create_access_token({"sub": str(token_record.user_id)})
    new_refresh = create_refresh_token(db, token_record.user_id)
    db.commit()

    return {"access_token": new_access, "refresh_token": new_refresh, "token_type": "bearer"}


@app.post("/api/auth/logout", tags=["Auth"])
async def logout(body: RefreshSchema, db: Session = Depends(get_db)):
    """Refresh tokenni bekor qilish (logout)."""
    token_record = db.query(RefreshToken).filter(
        RefreshToken.token == body.refresh_token
    ).first()
    if token_record:
        token_record.is_revoked = True
        db.commit()
    return {"message": "Chiqish muvaffaqiyatli"}


# ─── User profile ─────────────────────────────────────────────────────────────

@app.get("/api/me", tags=["User"])
async def get_me(current_user: User = Depends(get_current_user)):
    """Joriy foydalanuvchi ma'lumotlari."""
    return {
        "id": current_user.id,
        "email": current_user.email,
        "username": current_user.username,
        "full_name": current_user.full_name,
        "streak": current_user.streak,
        "total_points": current_user.total_points,
        "is_admin": current_user.is_admin,
        "created_at": current_user.created_at.isoformat(),
    }


@app.get("/api/me/history", tags=["User"])
async def get_my_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Foydalanuvchining test tarixi."""
    attempts = (
        db.query(Attempt)
        .filter(Attempt.user_id == current_user.id)
        .order_by(Attempt.created_at.desc())
        .limit(20)
        .all()
    )
    return [
        {
            "id": a.id,
            "exam_type": a.exam_type,
            "total_questions": a.total_questions,
            "correct_count": a.correct_count,
            "score_percent": round(a.score_percent, 1),
            "time_spent_seconds": a.time_spent_seconds,
            "created_at": a.created_at.isoformat(),
        }
        for a in attempts
    ]


# ─── Questions (public — javobsiz) ────────────────────────────────────────────

@app.get("/api/questions", tags=["Questions"])
@limiter.limit("30/minute")
async def get_questions(
    request: Request,
    exam_type: Optional[str] = None,
    topic: Optional[str] = None,
    difficulty: Optional[int] = None,
    limit: int = 20,
    shuffle: bool = True,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Test uchun savollar olish. Javoblar (correct_answer) QAYTARILMAYDI.
    Faqat autentifikatsiyalangan foydalanuvchilar uchun.
    """
    if limit < 1 or limit > 50:
        raise HTTPException(400, detail="Limit 1-50 oralig'ida bo'lishi kerak")

    allowed_exams = {"SAT_MATH", "SAT_ENGLISH", "IELTS", "DTM_MATH", "DTM_UZB"}
    if exam_type and exam_type not in allowed_exams:
        raise HTTPException(400, detail=f"Noto'g'ri imtihon turi")

    query = db.query(Question).filter(Question.is_active == True)
    if exam_type:
        query = query.filter(Question.exam_type == exam_type)
    if topic:
        query = query.filter(Question.topic == topic)
    if difficulty and difficulty in (1, 2, 3):
        query = query.filter(Question.difficulty == difficulty)

    questions = query.all()
    if shuffle:
        random.shuffle(questions)
    questions = questions[:limit]

    # ⚠️ correct_answer QAYTARILMAYDI — faqat test yakunida
    return [
        {
            "id": q.id,
            "exam_type": q.exam_type,
            "topic": q.topic,
            "difficulty": q.difficulty,
            "question_text": q.question_text,
            "options": {
                "A": q.option_a,
                "B": q.option_b,
                "C": q.option_c,
                "D": q.option_d,
            },
        }
        for q in questions
    ]


@app.post("/api/questions/check", tags=["Questions"])
@limiter.limit("60/minute")
async def check_answers(
    request: Request,
    payload: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Test yakunida javoblarni tekshirish.
    payload: {"answers": {"question_id": "A/B/C/D", ...}}
    """
    answers: dict = payload.get("answers", {})
    if not answers or not isinstance(answers, dict):
        raise HTTPException(400, detail="Javoblar bo'sh")

    results = []
    correct = 0
    for qid_str, user_ans in answers.items():
        try:
            qid = int(qid_str)
        except Exception:
            continue
        if not isinstance(user_ans, str) or user_ans.upper() not in ("A", "B", "C", "D"):
            continue

        q = db.query(Question).filter(Question.id == qid, Question.is_active == True).first()
        if not q:
            continue

        is_correct = q.correct_answer == user_ans.upper()
        if is_correct:
            correct += 1

        results.append({
            "question_id": q.id,
            "your_answer": user_ans.upper(),
            "correct_answer": q.correct_answer,
            "is_correct": is_correct,
            "explanation_uz": q.explanation_uz,
            "topic": q.topic,
        })

    return {
        "total": len(results),
        "correct": correct,
        "score_percent": round(correct / len(results) * 100, 1) if results else 0,
        "results": results,
    }


# ─── Attempts ─────────────────────────────────────────────────────────────────

@app.post("/api/attempts", tags=["Attempts"])
@limiter.limit("20/minute")
async def save_attempt(
    request: Request,
    body: AttemptSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Test natijasini saqlash va ball qo'shish."""
    score_percent = round(body.correct_count / body.total_questions * 100, 1)

    attempt = Attempt(
        user_id=current_user.id,
        exam_type=body.exam_type,
        total_questions=body.total_questions,
        correct_count=body.correct_count,
        score_percent=score_percent,
        time_spent_seconds=body.time_spent_seconds,
        answers_json=json.dumps(body.answers) if body.answers else None,
    )
    db.add(attempt)

    # Ball hisoblash: to'g'ri javob = 10 ball
    points_earned = body.correct_count * 10
    current_user.total_points += points_earned
    db.commit()

    return {
        "message": "Natija saqlandi",
        "score_percent": score_percent,
        "points_earned": points_earned,
        "total_points": current_user.total_points,
    }


# ─── Stats ────────────────────────────────────────────────────────────────────

@app.get("/api/stats", tags=["Stats"])
async def get_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Foydalanuvchining imtihon bo'yicha statistikasi."""
    attempts = db.query(Attempt).filter(Attempt.user_id == current_user.id).all()
    if not attempts:
        return {"message": "Hali test topshirilmagan", "stats": {}}

    stats = {}
    for a in attempts:
        et = a.exam_type
        if et not in stats:
            stats[et] = {"count": 0, "avg_score": 0, "best_score": 0, "scores": []}
        stats[et]["count"] += 1
        stats[et]["scores"].append(a.score_percent)

    for et, data in stats.items():
        data["avg_score"] = round(sum(data["scores"]) / len(data["scores"]), 1)
        data["best_score"] = round(max(data["scores"]), 1)
        del data["scores"]

    return {
        "total_attempts": len(attempts),
        "total_points": current_user.total_points,
        "streak": current_user.streak,
        "stats": stats
    }


@app.get("/api/leaderboard", tags=["Stats"])
async def leaderboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Top 10 foydalanuvchilar reytingi."""
    top_users = (
        db.query(User)
        .filter(User.is_active == True)
        .order_by(User.total_points.desc())
        .limit(10)
        .all()
    )
    return [
        {
            "rank": i + 1,
            "username": u.username,
            "full_name": u.full_name,
            "total_points": u.total_points,
            "streak": u.streak,
            "is_me": u.id == current_user.id,
        }
        for i, u in enumerate(top_users)
    ]


# ─── Admin endpoints ──────────────────────────────────────────────────────────

@app.get("/api/admin/questions", tags=["Admin"])
async def admin_list_questions(
    exam_type: Optional[str] = None,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user),
):
    """Admin: Barcha savollar (javoblar bilan)."""
    query = db.query(Question)
    if exam_type:
        query = query.filter(Question.exam_type == exam_type)
    questions = query.all()
    return [
        {
            "id": q.id,
            "exam_type": q.exam_type,
            "topic": q.topic,
            "difficulty": q.difficulty,
            "question_text": q.question_text,
            "options": {"A": q.option_a, "B": q.option_b, "C": q.option_c, "D": q.option_d},
            "correct_answer": q.correct_answer,
            "explanation_uz": q.explanation_uz,
            "is_active": q.is_active,
        }
        for q in questions
    ]


@app.post("/api/admin/questions", tags=["Admin"])
async def admin_add_question(
    body: AddQuestionSchema,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user),
):
    """Admin: Yangi savol qo'shish."""
    q = Question(
        exam_type=body.exam_type,
        topic=body.topic,
        difficulty=body.difficulty,
        question_text=body.question_text,
        option_a=body.option_a,
        option_b=body.option_b,
        option_c=body.option_c,
        option_d=body.option_d,
        correct_answer=body.correct_answer.upper(),
        explanation_uz=body.explanation_uz,
    )
    db.add(q)
    db.commit()
    db.refresh(q)
    return {"message": "Savol qo'shildi", "id": q.id}


@app.delete("/api/admin/questions/{question_id}", tags=["Admin"])
async def admin_delete_question(
    question_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user),
):
    """Admin: Savolni o'chirish (soft delete)."""
    q = db.query(Question).filter(Question.id == question_id).first()
    if not q:
        raise HTTPException(404, detail="Savol topilmadi")
    q.is_active = False
    db.commit()
    return {"message": "Savol o'chirildi"}


@app.post("/api/admin/make-admin", tags=["Admin"])
async def make_admin(
    payload: dict,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user),
):
    """Admin: Boshqa foydalanuvchini admin qilish."""
    username = payload.get("username")
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(404, detail="Foydalanuvchi topilmadi")
    user.is_admin = True
    db.commit()
    return {"message": f"{username} admin qilindi"}


# ─── Make first admin via secret key ─────────────────────────────────────────

@app.post("/api/init-admin", tags=["Auth"])
async def init_admin(
    payload: dict,
    db: Session = Depends(get_db),
):
    """Birinchi admin yaratish (maxsus kalit bilan, faqat bir marta)."""
    if not ADMIN_KEY:
        raise HTTPException(403, detail="Admin kalit sozlanmagan")
    if payload.get("admin_key") != ADMIN_KEY:
        raise HTTPException(403, detail="Admin kalit noto'g'ri")

    email = payload.get("email")
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(404, detail="Avval ro'yxatdan o'ting, keyin admin qiling")
    user.is_admin = True
    db.commit()
    return {"message": f"{email} admin qilindi"}


# ─── Health ───────────────────────────────────────────────────────────────────

@app.get("/api/health", tags=["System"])
async def health(db: Session = Depends(get_db)):
    question_count = db.query(Question).filter(Question.is_active == True).count()
    user_count = db.query(User).filter(User.is_active == True).count()
    return {
        "status": "ok",
        "questions": question_count,
        "users": user_count,
        "version": "2.0.0"
    }
