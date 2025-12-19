from sqlalchemy import Column, Integer, ForeignKey, JSON
from app.db.base import Base

class JobDraft(Base):
    __tablename__ = "job_drafts"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id"), nullable=False)
    raw_input = Column(JSON, nullable=False)