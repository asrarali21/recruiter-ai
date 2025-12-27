from app.db.base import Base
from app.db.session import engine

# Job-related models
from app.db.models.Job_model.job_model import Job
from app.db.models.Job_model.job_draft_model import JobDraft
from app.db.models.Job_model.job_description import Jobdescription

# Application models
from app.db.models.Application_model.application_record import ApplicationRecord

# ✅ Candidate processing models (NEW)
from app.db.models.Candidate_processing_model.resume_analysis import ResumeAnalysis


def init_db():
    """Initialize database tables"""
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created!")