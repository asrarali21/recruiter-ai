from sqlalchemy import Row ,  Column , String , Integer , ForeignKey  , Float , Text


from app.db.base import Base



class JobCandidateMatch(Base):
    __tablename__ = "job_candidate_match"


    id = Column(Integer , primary_key=True , index=True)
    application_id = Column(Integer , ForeignKey("application_record.id") , nullable=False)
    job_id = Column(Integer,ForeignKey("jobs.id"),nullable=False)
    match_score = Column(Float, nullable=False)
    match_summary = Column(Text, nullable=False)
    reasoning_json = Column(Text, nullable=False)
