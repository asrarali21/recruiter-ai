from dotenv import load_dotenv
from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware




from app.db.init_db import init_db
from app.api.job import router as job_router
from app.api.application_intake import router as application_router 
from app.api.resume_ingestion import router as ingestion_router
from app.api.resume_understanding import router as resume_understanding
from app.api.job_understanding import router as job_understanding_router

from app.api.matching import router as matching_router
from app.api.recruiter_review import router as recruiter_review_router
from app.api.admin_login import router as admin_login_router



load_dotenv()



app = FastAPI(
    title="Recruiter AI API",
    description="Multi-agent recruitment system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(job_router)
app.include_router(application_router)
app.include_router(ingestion_router)
app.include_router(resume_understanding)
app.include_router(job_understanding_router)
app.include_router(matching_router)
app.include_router(recruiter_review_router)
app.include_router(admin_login_router)


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
