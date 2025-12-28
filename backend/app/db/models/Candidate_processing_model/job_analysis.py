from sqlalchemy import Column, Integer, ForeignKey, Text
from app.db.base import Base

class JobAnalysis(Base):
    __tablename__ = "job_analysis"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("job.id"), nullable=False)
    analysis_json = Column(Text, nullable=False)
