from sqlalchemy import Row , Column , Integer , ForeignKey , String , DateTime
from datetime import datetime
from app.db.base import Base


class ApplicationRecord(Base):
    __tablename__ = "application_record"

    id = Column(Integer , primary_key=True ,index=True )
    job_id = ForeignKey("jobs.id")
    name  = Column(String , nullable=False)
    email  = Column(String, unique=True , nullable=False)
    resume_link = Column(String , nullable=False)
    github_link = Column(String , nullable=False)
    application_status = Column(String , nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)