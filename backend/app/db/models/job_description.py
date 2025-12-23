from sqlalchemy import Row , Column , String , Integer , ForeignKey
from app.db.base import Base

class Jobdescription(Base):
    __tablename__ ="Job_description"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer , ForeignKey("jobs.id") , nullable=False)
    description = Column(String , nullable=True) 