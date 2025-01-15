from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Replace with your actual database URL
DATABASE_URL = "sqlite:///example.db"  # SQLite example; replace with your DB URL

# Create engine
engine = create_engine(DATABASE_URL)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for your models
Base = declarative_base()

# Dependency for getting a sessionremove 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
