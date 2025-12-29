from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from datetime import datetime
from app.db.base import Base

class RecruiterDecision(Base):
    __tablename__ = "recruiter_decisions"

    id = Column(Integer, primary_key=True, index=True)

    application_id = Column(
        Integer,
        ForeignKey("application_record.id"),
        nullable=False,
        index=True
    )

    job_id = Column(
        Integer,
        ForeignKey("jobs.id"),
        nullable=False,
        index=True
    )

    decision = Column(String, nullable=False)  
    # approved | rejected

    decided_by = Column(String, nullable=False)  
    # recruiter / hiring_manager / admin

    notes = Column(Text, nullable=True)

    decided_at = Column(DateTime, default=datetime.utcnow, nullable=False)