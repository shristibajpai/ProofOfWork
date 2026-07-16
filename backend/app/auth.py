from datetime import datetime, timedelta

from jose import jwt
from passlib.context import CryptContext

SECRET_KEY = "your-secret-key-change-this"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str):
    print("=" * 50)
    print("PASSWORD:", repr(password))
    print("TYPE:", type(password))
    print("LENGTH:", len(password))
    print("=" * 50)
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str):
    print("=" * 50)
    print("PLAIN PASSWORD:", repr(plain_password))
    print("HASHED PASSWORD:", repr(hashed_password))
    print("=" * 50)
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )