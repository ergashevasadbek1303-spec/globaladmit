import os
import uvicorn
from ssl_setup import generate_self_signed_cert

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    cert_path = os.path.join(base_dir, "cert.pem")
    key_path = os.path.join(base_dir, "key.pem")

    if not (os.path.exists(cert_path) and os.path.exists(key_path)):
        cert_path, key_path = generate_self_signed_cert(base_dir)

    print("=" * 60)
    print("🔒 GlobalAdmit HTTPS Xavfsiz Server ishga tushmoqda")
    print(f"🌐 Manzil: https://localhost:8000")
    print(f"📖 Hujjatlar: https://localhost:8000/api/docs")
    print(f"🔑 SSL Cert: {cert_path}")
    print("=" * 60)

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        ssl_keyfile=key_path,
        ssl_certfile=cert_path,
        reload=True
    )

if __name__ == "__main__":
    main()
