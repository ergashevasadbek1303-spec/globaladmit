import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { questionsAPI } from "../api";
import { useAuth } from "../api/AuthContext";

const EXAMS = [
  { id: "SAT_MATH",    label: "SAT Matematika",    icon: "📐", desc: "Algebra, Geometriya, Statistika",   color: "#6c63ff" },
  { id: "SAT_ENGLISH", label: "SAT Ingliz tili",   icon: "📖", desc: "Grammatika, Lug'at, Matn tushunish", color: "#a78bfa" },
  { id: "IELTS",       label: "IELTS",              icon: "🌍", desc: "Reading, Writing, Vocabulary",       color: "#22c55e" },
  { id: "DTM_MATH",    label: "DTM Matematika",     icon: "🧮", desc: "Algebra, Trigonometriya, Analiz",    color: "#eab308" },
  { id: "DTM_UZB",     label: "DTM O'zbek tili",   icon: "🇺🇿", desc: "Imlo, Grammatika, Leksika",          color: "#f97316" },
];

const MODES = [
  { id: 10,  label: "Mini (10)",   desc: "~5 daqiqa" },
  { id: 20,  label: "Oddiy (20)",  desc: "~10 daqiqa" },
  { id: 40,  label: "To'liq (40)", desc: "~20 daqiqa" },
];

const DIFF_SECONDS = { 10: 420, 20: 900, 40: 1800 };

function pad(n) { return String(n).padStart(2, "0"); }
function fmtTime(s) { return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`; }

// ─── Exam selection screen ────────────────────────────────────────────────────
function ExamSelect({ onStart }) {
  const [exam, setExam] = useState("");
  const [count, setCount] = useState(20);

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1>Test tanlang</h1>
        <p>Imtihon turi va savollar sonini tanlang, boshlang!</p>
      </div>

      <h3 style={{ marginBottom: "1rem" }}>Imtihon turi</h3>
      <div className="exam-grid">
        {EXAMS.map((e) => (
          <div
            key={e.id}
            id={`exam-${e.id}`}
            className={`exam-card ${exam === e.id ? "selected" : ""}`}
            onClick={() => setExam(e.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(ev) => ev.key === "Enter" && setExam(e.id)}
          >
            <span className="exam-icon">{e.icon}</span>
            <h3>{e.label}</h3>
            <p>{e.desc}</p>
          </div>
        ))}
      </div>

      <h3 style={{ margin: "2rem 0 1rem" }}>Savollar soni</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {MODES.map((m) => (
          <div
            key={m.id}
            id={`mode-${m.id}`}
            className={`exam-card ${count === m.id ? "selected" : ""}`}
            style={{ flex: "1", minWidth: "140px", padding: "1.2rem" }}
            onClick={() => setCount(m.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(ev) => ev.key === "Enter" && setCount(m.id)}
          >
            <h3>{m.label}</h3>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <button
          id="start-test-btn"
          className="btn btn-primary btn-lg"
          disabled={!exam}
          onClick={() => onStart(exam, count)}
        >
          {exam ? `🚀 ${EXAMS.find((e) => e.id === exam)?.label} testini boshlash` : "Imtihon turini tanlang"}
        </button>
      </div>
    </div>
  );
}

// ─── Active test screen ───────────────────────────────────────────────────────
function ActiveTest({ questions, exam, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState(null);   // current result after answering
  const [checkResult, setCheckResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(DIFF_SECONDS[questions.length] || 900);
  const [finished, setFinished] = useState(false);
  const startTime = useRef(Date.now());
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const q = questions[current];
  const totalAnswered = Object.keys(answers).length;

  const selectAnswer = (letter) => {
    if (revealed) return;
    setAnswers((prev) => ({ ...prev, [q.id]: letter }));
  };

  const confirmAndNext = async () => {
    if (!answers[q.id]) return;

    // Check answer immediately via API
    try {
      const { data } = await questionsAPI.checkAnswers({ [String(q.id)]: answers[q.id] });
      setRevealed(data.results[0]);
    } catch {
      setRevealed(null);
    }
  };

  const goNext = () => {
    setRevealed(null);
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      handleSubmit(false);
    }
  };

  const handleSubmit = useCallback(async (timedOut = false) => {
    clearInterval(timerRef.current);
    if (finished) return;
    setFinished(true);

    const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);

    try {
      const { data } = await questionsAPI.checkAnswers(
        Object.fromEntries(Object.entries(answers).map(([k, v]) => [String(k), v]))
      );

      // Save attempt
      await questionsAPI.saveAttempt({
        exam_type: exam,
        total_questions: questions.length,
        correct_count: data.correct,
        time_spent_seconds: timeSpent,
        answers,
      });

      onFinish({
        total: questions.length,
        correct: data.correct,
        score: data.score_percent,
        results: data.results,
        timeSpent,
        timedOut,
      });
    } catch {
      onFinish({ total: questions.length, correct: 0, score: 0, results: [], timeSpent });
    }
  }, [answers, questions.length, exam, finished]);

  const isWarning = timeLeft < 120;

  return (
    <div className="container" style={{ paddingTop: "1.5rem", paddingBottom: "4rem" }}>
      {/* Header */}
      <div className="test-header">
        <div style={{ fontSize: "0.85rem", color: "var(--text-2)", fontWeight: 600 }}>
          {current + 1} / {questions.length}
        </div>
        <div className="progress-bar-wrap">
          <div
            className="progress-bar-fill"
            style={{ width: `${((current + (revealed ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
        <div className={`timer ${isWarning ? "warning" : ""}`}>
          ⏱ {fmtTime(timeLeft)}
        </div>
        <button
          id="submit-test-btn"
          className="btn btn-outline btn-sm"
          onClick={() => handleSubmit(false)}
          disabled={totalAnswered === 0}
        >
          Tugatish
        </button>
      </div>

      {/* Question */}
      <div className="question-card">
        <div className="question-meta">
          <span className="badge badge-sat">{exam.replace("_", " ")}</span>
          <span className={`badge badge-${q.difficulty === 1 ? "easy" : q.difficulty === 2 ? "med" : "hard"}`}>
            {q.difficulty === 1 ? "Oson" : q.difficulty === 2 ? "O'rta" : "Qiyin"}
          </span>
          <span style={{ fontSize: "0.78rem", color: "var(--text-3)" }}>{q.topic}</span>
        </div>

        <div className="question-text">{q.question_text}</div>

        <div className="options-grid">
          {Object.entries(q.options).map(([letter, text]) => {
            let cls = "";
            if (revealed) {
              if (letter === revealed.correct_answer) cls = "correct";
              else if (letter === answers[q.id] && !revealed.is_correct) cls = "wrong";
            } else if (answers[q.id] === letter) {
              cls = "selected";
            }

            return (
              <button
                key={letter}
                id={`option-${letter}`}
                className={`option-btn ${cls}`}
                onClick={() => selectAnswer(letter)}
                disabled={!!revealed}
              >
                <span className="option-letter">{letter}</span>
                <span>{text}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {revealed && (
          <div className="explanation-box">
            <strong>{revealed.is_correct ? "✅ To'g'ri!" : "❌ Noto'g'ri"}</strong>
            {" — "}
            {revealed.explanation_uz}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
        {!revealed ? (
          <button
            id="confirm-answer-btn"
            className="btn btn-primary"
            onClick={confirmAndNext}
            disabled={!answers[q.id]}
          >
            Javobni tekshirish →
          </button>
        ) : (
          <button
            id="next-question-btn"
            className="btn btn-primary"
            onClick={goNext}
          >
            {current + 1 < questions.length ? "Keyingi savol →" : "Natijalarni ko'rish 🏁"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Results screen ───────────────────────────────────────────────────────────
function Results({ result, exam, onRestart, onDash }) {
  const { updateUser } = useAuth();
  const [showAll, setShowAll] = useState(false);

  const pct = Math.round(result.score);
  const grade =
    pct >= 90 ? { label: "A'lo!", color: "var(--green)", emoji: "🏆" }
    : pct >= 70 ? { label: "Yaxshi", color: "var(--accent-2)", emoji: "🎉" }
    : pct >= 50 ? { label: "O'rtacha", color: "var(--orange)", emoji: "👍" }
    : { label: "Ko'proq mashq", color: "var(--red)", emoji: "💪" };

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem", textAlign: "center" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        {result.timedOut && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "var(--red)", borderRadius: "var(--radius-sm)", padding: "0.7rem 1rem", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
            ⏰ Vaqt tugadi. Javob berilmagan savollar noto'g'ri hisoblanadi.
          </div>
        )}

        <div className="result-circle" style={{ borderColor: grade.color }}>
          <span style={{ fontSize: "1.5rem" }}>{grade.emoji}</span>
          <span>{pct}%</span>
          <small>ball</small>
        </div>

        <h2 style={{ marginBottom: "0.5rem" }}>{grade.label}</h2>
        <p style={{ marginBottom: "2rem" }}>
          {result.correct} ta to'g'ri / {result.total} ta savol ·{" "}
          {Math.floor(result.timeSpent / 60)} daqiqa {result.timeSpent % 60} soniya
        </p>

        {/* Wrong answers breakdown */}
        {result.results.filter((r) => !r.is_correct).length > 0 && (
          <div style={{ textAlign: "left", marginBottom: "2rem" }}>
            <div className="section-header" style={{ marginBottom: "0.75rem" }}>
              <h3>Noto'g'ri javoblar ({result.results.filter((r) => !r.is_correct).length} ta)</h3>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setShowAll((p) => !p)}
              >
                {showAll ? "Yopish" : "Ko'rish"}
              </button>
            </div>

            {showAll &&
              result.results
                .filter((r) => !r.is_correct)
                .map((r, i) => (
                  <div key={i} className="explanation-box" style={{ marginBottom: "0.5rem", textAlign: "left" }}>
                    <strong>Mavzu: {r.topic}</strong>
                    <br />
                    Sizning javobingiz: <span style={{ color: "var(--red)" }}>{r.your_answer}</span> ·
                    To'g'ri javob: <span style={{ color: "var(--green)" }}>{r.correct_answer}</span>
                    <br />
                    {r.explanation_uz}
                  </div>
                ))}
          </div>
        )}

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button id="retry-btn" className="btn btn-primary btn-lg" onClick={onRestart}>
            🔄 Qaytadan
          </button>
          <button id="dashboard-btn" className="btn btn-outline btn-lg" onClick={onDash}>
            🏠 Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main TestPage ────────────────────────────────────────────────────────────
export default function TestPage() {
  const [phase, setPhase] = useState("select"); // select | loading | test | results
  const [questions, setQuestions] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleStart = async (exam, count) => {
    setPhase("loading");
    setError("");
    setSelectedExam(exam);
    try {
      const { data } = await questionsAPI.getQuestions({
        exam_type: exam,
        limit: count,
        shuffle: true,
      });
      if (!data || data.length === 0) {
        setError("Bu imtihon uchun savollar topilmadi.");
        setPhase("select");
        return;
      }
      setQuestions(data);
      setPhase("test");
    } catch (err) {
      setError(err.response?.data?.detail || "Savollar yuklanmadi");
      setPhase("select");
    }
  };

  const handleFinish = (res) => {
    setResult(res);
    setPhase("results");
  };

  if (phase === "loading") return <div className="spinner" />;

  if (phase === "results") {
    return (
      <Results
        result={result}
        exam={selectedExam}
        onRestart={() => setPhase("select")}
        onDash={() => nav("/dashboard")}
      />
    );
  }

  if (phase === "test") {
    return (
      <ActiveTest
        questions={questions}
        exam={selectedExam}
        onFinish={handleFinish}
      />
    );
  }

  return (
    <>
      {error && (
        <div className="container">
          <div className="error-box" style={{ marginTop: "1rem" }}>{error}</div>
        </div>
      )}
      <ExamSelect onStart={handleStart} />
    </>
  );
}
