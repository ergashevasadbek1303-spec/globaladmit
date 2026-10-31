"""
GlobalAdmit - Lokal HTTPS uchun SSL Sertifikat yaratuvchi skript.
Ushbu skript development muhitida localhost uchun o'z-o'zidan imzolangan (self-signed)
SSL sertifikat va maxfiy kalit (cert.pem va key.pem) yaratadi.
"""

import os
from datetime import datetime, timedelta
import ipaddress
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

def generate_self_signed_cert(cert_dir="."):
    key_path = os.path.join(cert_dir, "key.pem")
    cert_path = os.path.join(cert_dir, "cert.pem")

    if os.path.exists(key_path) and os.path.exists(cert_path):
        print(f"[INFO] Sertifikatlar mavjud: {cert_path}, {key_path}")
        return cert_path, key_path

    print("[1/2] RSA 2048-bit maxfiy kalit yaratilmoqda...")
    key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )

    print("[2/2] X.509 SSL sertifikati yaratilmoqda...")
    subject = issuer = x509.Name([
        x509.NameAttribute(NameOID.COUNTRY_NAME, "UZ"),
        x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, "Tashkent"),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, "GlobalAdmit Dev"),
        x509.NameAttribute(NameOID.COMMON_NAME, "localhost"),
    ])

    cert = (
        x509.CertificateBuilder()
        .subject_name(subject)
        .issuer_name(issuer)
        .public_key(key.public_key())
        .serial_number(x509.random_serial_number())
        .not_valid_before(datetime.utcnow())
        .not_valid_after(datetime.utcnow() + timedelta(days=365))
        .add_extension(
            x509.SubjectAlternativeName([
                x509.DNSName("localhost"),
                x509.IPAddress(ipaddress.IPv4Address("127.0.0.1")),
            ]),
            critical=False,
        )
        .sign(key, hashes.SHA256())
    )

    # Kalitni saqlash
    with open(key_path, "wb") as f:
        f.write(
            key.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.TraditionalOpenSSL,
                encryption_algorithm=serialization.NoEncryption(),
            )
        )

    # Sertifikatni saqlash
    with open(cert_path, "wb") as f:
        f.write(cert.public_bytes(serialization.Encoding.PEM))

    print(f"[OK] SSL Sertifikat muvaffaqiyatli yaratildi:")
    print(f"     Sertifikat: {os.path.abspath(cert_path)}")
    print(f"     Maxfiy kalit: {os.path.abspath(key_path)}")
    return cert_path, key_path

if __name__ == "__main__":
    generate_self_signed_cert()
