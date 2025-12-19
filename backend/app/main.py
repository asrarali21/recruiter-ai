from dotenv import load_dotenv
from app.db.session import SessionLocal
from app.db.models.job_model import Job
from fastapi import FastAPI
from app.db.init_db import init_db
from app.api.job import router as job_router

load_dotenv()




app = FastAPI(
    title="Recruiter AI API",
    description="Multi-agent recruitment system",
    version="1.0.0"
)

app.include_router(job_router)

@app.on_event("startup")
def startup_event():
    print("Creating database tables...")
    init_db()
    print("Database initialized!")





# db = SessionLocal()

# job = Job(
#     company_id=1,
#     title="Junior React Developer",
#     status="draft"
# )

# db.add(job)
# db.commit()
# db.refresh(job)


# jobs = db.query(Job).all()

# for job in jobs:
#     print(job.title, job.status)
