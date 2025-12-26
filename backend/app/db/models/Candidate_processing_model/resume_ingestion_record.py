from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Text
from datetime import datetime
from app.db.base import Base


class ResumeRecord(Base):
    __tablename__ = "resume_records"

    id = Column(Integer, primary_key=True, index=True)  
    application_id = Column(Integer,ForeignKey("application_record.id", ondelete="CASCADE"),nullable=False,index=True)
    resume_link = Column(String, nullable=False)
    extracted_text = Column(Text, nullable=True)
    extraction_status = Column(String, nullable=False)
    extraction_error = Column(Text, nullable=True)
    extracted_at = Column(DateTime, default=datetime.utcnow, nullable=False)
