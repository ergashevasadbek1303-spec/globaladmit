import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { questionsAPI } from "../api";
import { useAuth } from "../api/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";

const DIFF_SECONDS = { 10: 420, 20: 900, 40: 1800 };

function pad(n) {
  return String(n).padStart(2, "0");
}
function fmtTime(s) {
  return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
}

// ─── Exam selection screen ────────────────────────────────────────────────────
function ExamSelect({ onStart }) {
  const { t } = useLanguage();
  const [exam, setExam] = useState("");
  const [count, setCount] = useState(20);

  const exams = [
    { id: "SAT_MATH", label: t("examSatMath"), icon: "📐", desc: "Algebra, Geometry, Data", color: "#6c63ff" },
    { id: "SAT_ENGLISH", label: t("examSatEnglish"), icon: "📖", desc: "Grammar, Reading, Vocab", color: "#a78bfa" },
    { id: "IELTS", label: t("examIelts"), icon: "🌍", desc: "Reading, Writing, Vocab", color: "#22c55e" },
    { id: "DTM_MATH", label: t("examDtmMath"), icon: "🧮", desc: "Algebra, Trigonometry, Analysis", color: "#eab308" },
    { id: "DTM_UZB", label: t("examDtmUzb"), icon: "🇺🇿", desc: "Grammar, Spelling, Lexicon", color: "#f97316" },
  ];

  const modes = [
    { id: 10, label: "Mini (10)", desc: "~5 min" },
    { id: 20, label: "Standard (20)", desc: "~10 min" },
    { id: 40, label: "Full (40)", desc: "~20 min" },
  ];

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1>{t("selectExam")}</h1>
        <p>{t("selectExamDesc")}</p>
      </div>

      <h3 style={{ marginBottom: "1rem" }}>{t("colExam")}</h3>
      <div className="exam-grid">
        {exams.map((e) => (
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

      <h3 style={{ margin: "2rem 0 1rem" }}>{t("questionCount")}</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {modes.map((m) => (
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
          {exam ? `🚀 ${exams.find((e) => e.id === exam)?.label} — ${t("startTestBtn")}` : t("selectExam")}
        </button>
      </div>
    </div>
  );
}

// ─── Active test screen ───────────────────────────────────────────────────────
function ActiveTest({ questions, exam, onFinish }) {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState(null);
  const [timeLeft, setTimeLeft] = useState(DIFF_SECONDS[questions.length] || 900);
  const [finished, setFinished] = useState(false);
  const startTime = useRef(Date.now());
  const timerRef = useRef(null);

  const handleSubmit = useCallback(
    async (timedOut = false) => {
      clearInterval(timerRef.current);
      if (finished) return;
      setFinished(true);

      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);

      try {
        const { data } = await questionsAPI.checkAnswers(
          Object.fromEntries(Object.entries(answers).map(([k, v]) => [String(k), v]))
        );

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
    },
    [answers, questions.length, exam, finished, onFinish]
  );

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [handleSubmit]);

  const q = questions[current];
  const totalAnswered = Object.keys(answers).length;

  const selectAnswer = (letter) => {
    if (revealed) return;
    setAnswers((prev) => ({ ...prev, [q.id]: letter }));
  };

  const confirmAndNext = async () => {
    if (!answers[q.id]) return;

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
        <div className={`timer ${isWarning ? "warning" : ""}`}>⏱ {fmtTime(timeLeft)}</div>
        <button
          id="submit-test-btn"
          className="btn btn-outline btn-sm"
          onClick={() => handleSubmit(false)}
          disabled={totalAnswered === 0}
        >
          {t("finishBtn")}
        </button>
      </div>

      {/* Question */}
      <div className="question-card">
        <div className="question-meta">
          <span className="badge badge-sat">{exam.replace("_", " ")}</span>
          <span
            className={`badge badge-${q.difficulty === 1 ? "easy" : q.difficulty === 2 ? "med" : "hard"}`}
          >
            {q.difficulty === 1 ? "Lvl 1" : q.difficulty === 2 ? "Lvl 2" : "Lvl 3"}
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
            <strong>{revealed.is_correct ? `✅ ${t("correctLabel")}!` : `❌ ${t("wrongLabel")}`}</strong>
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
            {t("nextBtn")} →
          </button>
        ) : (
          <button id="next-question-btn" className="btn btn-primary" onClick={goNext}>
            {current + 1 < questions.length ? `${t("nextBtn")} →` : `${t("testResults")} 🏁`}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Results screen ───────────────────────────────────────────────────────────
function Results({ result, exam, onRestart, onDash }) {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const pct = Math.round(result.score);
  const grade =
    pct >= 90
      ? { label: "Excellent!", color: "var(--green)", emoji: "🏆" }
      : pct >= 70
      ? { label: "Good job!", color: "var(--accent-2)", emoji: "🎉" }
      : pct >= 50
      ? { label: "Average", color: "var(--orange)", emoji: "👍" }
      : { label: "Needs Practice", color: "var(--red)", emoji: "💪" };

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem", textAlign: "center" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        {result.timedOut && (
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "var(--red)",
              borderRadius: "var(--radius-sm)",
              padding: "0.7rem 1rem",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
            }}
          >
            ⏰ Time limit reached. Unanswered questions counted as incorrect.
          </div>
        )}

        <div className="result-circle" style={{ borderColor: grade.color }}>
          <span style={{ fontSize: "1.5rem" }}>{grade.emoji}</span>
          <div className="result-score" style={{ color: grade.color }}>
            {pct}%
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-3)", fontWeight: 600 }}>
            {result.correct} / {result.total}
          </div>
        </div>

        <h2 style={{ marginBottom: "0.5rem" }}>{grade.label}</h2>
        <p style={{ color: "var(--text-2)", marginBottom: "2rem" }}>
          {t("colTime")}: {fmtTime(result.timeSpent)}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "2.5rem" }}>
          <button className="btn btn-primary" onClick={onRestart}>
            🔄 {t("tryAgain")}
          </button>
          <button className="btn btn-outline" onClick={onDash}>
            🏠 {t("backToDashboard")}
          </button>
        </div>

        {/* Answers review */}
        {result.results && result.results.length > 0 && (
          <div style={{ textAlign: "left" }}>
            <button
              className="btn btn-outline btn-sm"
              style={{ width: "100%", justifyContent: "center", marginBottom: "1rem" }}
              onClick={() => setShowAll((s) => !s)}
            >
              {showAll ? "▲ Yopish" : `▼ ${t("reviewAnswers")} (${result.results.length})`}
            </button>

            {showAll && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {result.results.map((r, i) => (
                  <div
                    key={r.question_id}
                    className="card"
                    style={{
                      borderLeft: `4px solid ${r.is_correct ? "var(--green)" : "var(--red)"}`,
                      padding: "1rem 1.25rem",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                        #{i + 1} — {r.topic}
                      </span>
                      <span style={{ color: r.is_correct ? "var(--green)" : "var(--red)", fontWeight: 700 }}>
                        {r.is_correct ? `✅ ${t("correctLabel")}` : `❌ ${t("wrongLabel")}`}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-3)", marginTop: "0.4rem" }}>
                      <strong>{t("explanationLabel")}:</strong> {r.explanation_uz}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TestPage() {
  const nav = useNavigate();
  const [phase, setPhase] = useState("select");
  const [questions, setQuestions] = useState([]);
  const [exam, setExam] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startTest = async (chosenExam, count) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await questionsAPI.getQuestions(chosenExam, count);
      if (!data || data.length === 0) {
        setError("Bu imtihon uchun savollar topilmadi.");
        return;
      }
      setQuestions(data);
      setExam(chosenExam);
      setPhase("test");
    } catch {
      setError("Savollarni yuklashda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = (res) => {
    setResult(res);
    setPhase("results");
  };

  if (loading) return <div className="spinner" />;

  return (
    <div>
      {error && (
        <div className="container" style={{ paddingTop: "1rem" }}>
          <div className="error-box">{error}</div>
        </div>
      )}

      {phase === "select" && <ExamSelect onStart={startTest} />}
      {phase === "test" && <ActiveTest questions={questions} exam={exam} onFinish={handleFinish} />}
      {phase === "results" && (
        <Results
          result={result}
          exam={exam}
          onRestart={() => setPhase("select")}
          onDash={() => nav("/dashboard")}
        />
      )}
    </div>
  );
}
