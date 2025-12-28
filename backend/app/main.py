from dotenv import load_dotenv
from fastapi import FastAPI



from app.db.init_db import init_db
from app.api.job import router as job_router
from app.api.application_intake import router as application_router 
from app.api.resume_ingestion import router as ingestion_router
from app.api.job_understanding import router as job_understanding_router

from app.api.matching import router as matching_router

load_dotenv()




app = FastAPI(
    title="Recruiter AI API",
    description="Multi-agent recruitment system",
    version="1.0.0"
)

app.include_router(job_router)
app.include_router(application_router)
app.include_router(ingestion_router)
app.include_router(job_understanding_router)
app.include_router(matching_router)


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
