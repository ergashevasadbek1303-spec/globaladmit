import os
import sys

# Set UTF-8 encoding for standard outputs
if sys.platform.startswith("win"):
    sys.stdout.reconfigure(encoding="utf-8")

os.environ["DATABASE_URL"] = "sqlite:///./test_api.db"
os.environ["SECRET_KEY"] = "super-secret-test-key-minimum-32-chars-long"

from main import app
from models import Base, engine
from fastapi.testclient import TestClient

def run_tests():
    print("[1/7] Initializing test database...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    with TestClient(app) as client:
        print("[2/7] Testing User Registration...")
        reg_payload = {
            "full_name": "Ulug'bek Mirzo",
            "username": "ulugbek_m",
            "email": "ulugbek@example.com",
            "password": "StrongPassword123!"
        }
        res = client.post("/api/auth/register", json=reg_payload)
        assert res.status_code == 200, f"Register failed: {res.text}"
        data = res.json()
        assert "access_token" in data
        assert "refresh_token" in data
        assert data["user"]["username"] == "ulugbek_m"
        token = data["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        print("  -> Registration passed.")

        print("[3/7] Testing Duplicate Registration...")
        res = client.post("/api/auth/register", json=reg_payload)
        assert res.status_code == 400, "Should reject duplicate email"
        print("  -> Duplicate rejection passed.")

        print("[4/7] Testing Login...")
        login_res = client.post("/api/auth/login", json={
            "email": "ulugbek@example.com",
            "password": "StrongPassword123!"
        })
        assert login_res.status_code == 200, f"Login failed: {login_res.text}"
        assert "access_token" in login_res.json()
        print("  -> Login passed.")

        print("[5/7] Testing Question Bank Security (Hidden answers)...")
        q_res = client.get("/api/questions?exam_type=SAT_MATH&limit=5", headers=headers)
        assert q_res.status_code == 200, f"Get questions failed: {q_res.text}"
        questions = q_res.json()
        assert len(questions) > 0, "No questions returned"
        for q in questions:
            assert "correct_answer" not in q, f"CRITICAL: correct_answer exposed in question {q['id']}"
            assert "question_text" in q
            assert "options" in q
        print(f"  -> Fetched {len(questions)} questions securely. Zero answers leaked.")

        print("[6/7] Testing Answer Verification Endpoint...")
        sample_q = questions[0]
        check_res = client.post("/api/questions/check", json={str(sample_q["id"]): "A"}, headers=headers)
        assert check_res.status_code == 200, f"Check failed: {check_res.text}"
        check_data = check_res.json()
        assert "score_percent" in check_data
        assert "results" in check_data
        assert len(check_data["results"]) == 1
        assert "explanation_uz" in check_data["results"][0]
        print("  -> Verification endpoint and Uzbek explanations work.")

        print("[7/7] Testing Attempts, Stats & Leaderboard...")
        attempt_res = client.post("/api/attempts", json={
            "exam_type": "SAT_MATH",
            "total_questions": 10,
            "correct_count": 9,
            "time_spent_seconds": 300
        }, headers=headers)
        assert attempt_res.status_code == 200, f"Save attempt failed: {attempt_res.text}"

        stats_res = client.get("/api/stats", headers=headers)
        assert stats_res.status_code == 200
        stats = stats_res.json()
        assert stats["total_points"] >= 90
        assert "SAT_MATH" in stats["stats"]

        lead_res = client.get("/api/leaderboard", headers=headers)
        assert lead_res.status_code == 200
        lead = lead_res.json()
        assert len(lead) > 0
        assert lead[0]["username"] == "ulugbek_m"
        print("  -> Stats and Leaderboard working properly.")

    # Clean up
    if os.path.exists("./test_api.db"):
        try:
            os.remove("./test_api.db")
        except Exception:
            pass

    print("\nSUCCESS: All tests passed with flying colors!\n")

if __name__ == "__main__":
    run_tests()
