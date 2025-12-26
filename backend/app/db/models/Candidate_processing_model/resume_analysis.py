
from sqlalchemy import Column, Integer, ForeignKey, Text
from app.db.base import Base

class ResumeAnalysis(Base):
    __tablename__ = "resume_analysis"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("application_record.id"), nullable=False)
    analysis_json = Column(Text, nullable=False)
