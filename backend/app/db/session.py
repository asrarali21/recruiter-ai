import os
from sqlalchemy import create_engine
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
load_dotenv()


database_url = os.getenv("DATABASE_URL")

DataBase_Url = database_url



engine = create_engine(DataBase_Url)


SessionLocal = sessionmaker(
    autoflush=False,
    bind=engine,
)

def get_db():
    """
    Creates a new database session for each request.
    Automatically closes the session after the request is done.
    """
    db = SessionLocal()
    try:
        yield db  
    finally:
        db.close()


